import express from 'express'
import Groq from 'groq-sdk';
import dotenv from 'dotenv';
import process from 'process';
import cors from 'cors'
import sqlite3 from 'sqlite3';
import { open } from 'sqlite'
import KcAdminClient from "@keycloak/keycloak-admin-client";
import axios from 'axios';

dotenv.config();

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

async function getKeycloakClient() {
  const client = new KcAdminClient({
    baseUrl: "http://localhost:8080",
    realmName: "master",
  });

  await client.auth({
    username: process.env.KeycloakAdminUsername,
    password: process.env.KeycloakAdminPassword,
    grantType: "password",
    clientId: "admin-cli",
  });
  
  client.setConfig({
    realmName: "myerp",
  });
  
  return client;
}

const db = await open({
  filename: './database.db',
  driver: sqlite3.Database
});

// Create tables
await db.exec('DROP TABLE IF EXISTS interactions');
await db.exec(`CREATE TABLE IF NOT EXISTS interactions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_firstname TEXT,
  user_lastname TEXT,
  message TEXT,
  response TEXT,
  timestamp DATETIME
)`);

await db.exec('DROP TABLE IF EXISTS sales');
await db.exec(`CREATE TABLE IF NOT EXISTS sales (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  amount_total FLOAT,
  state TEXT,
  date_order TEXT,
  partner_id TEXT,
  user_id TEXT,
  team_id TEXT
)`);

await db.exec('DROP TABLE IF EXISTS accounts');
await db.exec(`CREATE TABLE IF NOT EXISTS accounts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  current_balance FLOAT,
  opening_balance FLOAT,
  opening_credit FLOAT,
  message_needaction BOOLEAN,
  company_fiscal_country_code TEXT,
  active BOOLEAN
)`);


await db.exec('DROP TABLE IF EXISTS crms');
await db.exec(`CREATE TABLE IF NOT EXISTS crms (
  id INTEGER PRIMARY KEY ,
  active_leads BOOLEAN,
  expected_revenue FLOAT,
  active_users TEXT,
  won_status TEXT,
  planified_meeting TEXT
)`);



await db.exec('DROP TABLE IF EXISTS products');
await db.exec(`CREATE TABLE IF NOT EXISTS products (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  sales_count FLOAT,
  standard_price FLOAT,
  service_type TEXT,
  service_tracking TEXT,
  is_favorite BOOLEAN
)`);

const dbName = process.env.db;
const email = process.env.email;
const password = process.env.password;
const uid = process.env.uid;

const insert = async (data, module, userfirstname = null, userlastname = null, message = null, response = null, timestamp = null) => {
  
  if (userfirstname && userlastname && message && response && timestamp) {
    await db.run(
      'INSERT INTO interactions (user_firstname, user_lastname, message, response, timestamp) VALUES (?, ?, ?, ?, ?)',
      userfirstname, userlastname, message, response, timestamp
    );
  }
  
  if (data && module && Array.isArray(data) && data.length > 0) {
        

    for(const row of data) {
      switch(module) {
        case "sale":
          await db.run(
            'INSERT INTO sales (name, amount_total, state, date_order, partner_id, user_id, team_id) VALUES (?, ?, ?, ?, ?, ?, ?)',
            row.name, 
            row.amount_total, 
            row.state, 
            row.date_order, 
            row.partner_id[1], 
            row.user_id[1], 
            row.team_id[1]
          );
          break;
          
        case "account":
          await db.run(
            'INSERT INTO accounts (current_balance, opening_balance, opening_credit, message_needaction, company_fiscal_country_code, active) VALUES (?, ?, ?, ?, ?, ?)',
            row.current_balance, 
            row.opening_balance, 
            row.opening_credit, 
            row.message_needaction, 
            row.company_fiscal_country_code, 
            row.active
          );
          break;
        case "crm":
          (row.planified_meeting)
          await db.run(
            'INSERT INTO crms (active_leads, expected_revenue, active_users,  won_status, planified_meeting) VALUES (?, ?, ?,? , ?)',
            row.active, 
            row.expected_revenue, 
            row.activity_user_id[1],
            row.won_status, 
            row.meeting_display_label 
            );
            break;
          
        case "product":
          await db.run(
            'INSERT INTO products (sales_count, standard_price, service_type, service_tracking, is_favorite) VALUES (?, ?, ?, ?, ?)',
            row.sales_count, 
            row.standard_price, 
            row.service_type, 
            row.service_tracking, 
            row.is_favorite
          );
          break;
      }
      
    }
  }
};

async function generateSQLQuery(userQuery, tableSchema) {
  const completion = await groq.chat.completions.create({
    model: "openai/gpt-oss-120b",
    messages: [
      {
        role: "system",
        content: `You are a SQLite expert. Generate ONLY a valid SQLite SELECT query.
        
RULES:

- Always generate a valid query
- Use the exact table names and column names from the schema below
- For COUNT/grouping, use appropriate GROUP BY clauses
- Return ONLY the SQL query, no explanations, no backticks, no markdown
- Name the output column the appropriate name
- End with a semicolon

${tableSchema}`
      },
      {
        role: "user",
        content: `Question: "${userQuery}"

Generate SQLite query:`
      }
    ],
    temperature: 0.1,
    max_tokens: 3000
  });
  
  let sqlQuery = completion.choices[0].message.content;

  sqlQuery = sqlQuery.replace(/;$/g, '');
  return sqlQuery;
}

async function generateResponseWithGroq(userQuery, sqlQuery, sqlResult) {
  const completion = await groq.chat.completions.create({
    model: "openai/gpt-oss-120b",
    messages: [
      {
        role: "system",
        content: `Answer naturally based on SQL results. Format numbers.`
      },
      {
        role: "user",
        content: `Q: "${userQuery}"\nSQL: ${sqlQuery}\nResults: ${sqlResult}\nA:`
      }
    ],
    temperature: 0.1,
    max_tokens: 3000
  });
  return completion.choices[0].message.content;
}

async function executeSQLWithFallback(sqlQuery) {
  try {
    const resultarray = await db.all(sqlQuery);
    const formattedResults = resultarray.map(row => {
      const cleanRow = {};
      for (const [key, value] of Object.entries(row)) {
        cleanRow[key] = value;
      }
      return cleanRow;
    });
    return JSON.stringify(formattedResults);
  } catch (error) {
    console.error('SQL Execution Error:', error);
    return JSON.stringify({ error: error.message });
  }
}

const app = express();
app.use(express.json());
app.use(cors({
  origin: ["http://localhost:8069", "http://localhost:8080"],
  credentials: true
}));

let tableSchema = ``;



app.get('/api/connect', async (req, res) => {
  const response = await axios.post(`http://localhost:8069/jsonrpc`, {
            jsonrpc: '2.0',
            method: 'call',
            params: {
                service: 'common',
                method: 'login',
                args: [dbName, email, password]
            },
          
            id: 1
        });
        console.log(response.data.result);
          console.log(response.data);
        
          if (response.data.result == 2) {
            console.log('Connected to Odoo successfully');
            res.send(true)
        }
      })

app.get('/api/fetchaccounting' , async(req,res)=> {
  const accounting = await axios.post('http://localhost:8069/jsonrpc', {
            jsonrpc: '2.0',
            method: 'call',
            params: {
                service: 'object',
                method: 'execute_kw',
                args: [
                    dbName, uid, password,
                    'account.account',
                    'search_read',
                    [[]],
                    {
                        fields : [
                             'current_balance',
                             'opening_balance',
                             'opening_credit',
                             'message_needaction',
                             'company_fiscal_country_code',
                             'active',
                               

                        ],
                        limit: 1000



                    }
                ]
            }
        });
        res.send(accounting.data.result)
})
app.get('/api/fetchsaleorders' , async(req,res)=> {
  const saleorders = await axios.post('http://localhost:8069/jsonrpc', {
            jsonrpc: '2.0',
            method: 'call',
            params: {
                service: 'object',
                method: 'execute_kw',
                args: [
                    dbName, uid, password,
                    'sale.order',
                    'search_read',
                    [[]],
                    {
                        fields : [
                             'name',
                             'amount_total',
                             'state',
                             'date_order',
                             'partner_id',
                             'user_id',
                              'team_id',
                        ],
                        limit: 1000
                    }
                ]
            }
        });
        console.log(saleorders.data.result);
        res.send(saleorders.data.result)
})
app.get('/api/fetchcrmleads' , async(req,res)=> {
  const crmleads = await axios.post('http://localhost:8069/jsonrpc', {
            jsonrpc: '2.0',
            method: 'call',
            params: {
                service: 'object',
                method: 'execute_kw',
                args: [
                    dbName, uid, password,
                    'crm.lead',
                    'search_read',
                    [[]],
                    {
                        fields : [
                            'active',
                            'expected_revenue',
                            'activity_user_id',
                            'won_status',
                            'meeting_display_label'
                        ],
                        limit: 1000
                    }
                ]
            }
        });
        res.send(crmleads.data.result)
}
)
app.get('/api/fetchproduct' , async(req,res)=> {
  const products = await axios.post('http://localhost:8069/jsonrpc', {
            jsonrpc: '2.0',
            method: 'call',
            params: {
                service: 'object',
                method: 'execute_kw',
                args: [
                    dbName, uid, password,
                    'product.product',
                    'search_read',
                    [[]],
                    {
                        fields : [
                            'sales_count',
                            'standard_price',
                            'service_type',
                            'service_tracking',
                            'is_favorite'
                        ],
                        limit: 1000
                    }
                ]
            }
        });
        res.send(products.data.result)
}
)

app.post('/api/chat', async (req, res) => {
  try {
    const message = req.body.message;
    const data = req.body.data;
    const module = req.body.module;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    (`Processing ${module} module with message: ${message}`);

    switch(module) {
      case "sale":
        await db.exec('DELETE FROM sales');
        if (data && data.length > 0) {
          await insert(data, module);
        }
        tableSchema = `sales (
          id INTEGER,
          name TEXT,
          amount_total REAL,
          state TEXT,
          date_order TEXT,
          partner_id TEXT,
          user_id TEXT,
          team_id TEXT
        );`;
        break;
        
      case "account":
        await db.exec('DELETE FROM accounts');
  
        if (data && data.length > 0) {
          await insert(data, module);
        }
        tableSchema = `accounts (
          id INTEGER,
          current_balance REAL,
          opening_balance REAL,
          opening_credit REAL,
          message_needaction INTEGER,
          company_fiscal_country_code TEXT,
          active INTEGER
        );`;
        break;
        
      case "crm":
        await db.exec('DELETE FROM crms');
        if (data && data.length > 0 ) {
          await insert(data, module);

          const crms_users_status = await db.all('SELECT * FROM crms');
          ('Fetched crms:', crms_users_status);

        }
        tableSchema = `crms (
          id INTEGER,
          active_leads INTEGER,
          expected_revenue REAL,
          active_users TEXT (the name of the user) ,
          won_status TEXT,
          planified_meeting TEXT (No Meeting) 
        );`;
        break;
        
      case "product":
        await db.exec('DELETE FROM products');
        if (data && data.length > 0) {
          await insert(data, module);
        }
        tableSchema = `products (
          id INTEGER,
          sales_count REAL,
          standard_price REAL,
          service_type TEXT,
          service_tracking TEXT,
          is_favorite INTEGER
        );`;
        break;
        
      default:
        return res.status(400).send({ error: `Unknown module: ${module}` });
    }
  const getCurrentTimestamp = () => {
  const now = new Date();
  return now.toLocaleDateString('en-GB') + ' ' + now.toLocaleTimeString('en-GB');
};

    const sqlQuery = await generateSQLQuery(message, tableSchema);
    ('SQL Query:', sqlQuery);
    (sqlQuery);
    const sqlResult = await executeSQLWithFallback(sqlQuery);
    ('SQL Result:', sqlResult);
    
    const response = await generateResponseWithGroq(message, sqlQuery, sqlResult);
    
    if (firstName && lastName) {
      await insert(null, null, firstName, lastName, message, response, getCurrentTimestamp());
    }
    (firstName)
    res.send(response);
    
  } catch (error) {
    console.error('Error in /api/chat:', error);
    res.status(500).send({ error: error.message });
  }
});

app.post('/api/admin', async (req, res) => {
  const userid = req.body.userid;
  const toverifyuserid = process.env.UserID;
  res.send(userid === toverifyuserid);
});

app.get("/viewers", async (req, res) => {
  try {
    const kcAdminClient = await getKeycloakClient();
    const users = await kcAdminClient.users.find();
    const viewerUsers = [];

    for (const user of users) {
      const roles = await kcAdminClient.users.listRealmRoleMappings({
        id: user.id,
      });

      const hasViewerRole = roles.some(role => role.name === "viewer");
      if (hasViewerRole) {
        viewerUsers.push(user);
      }
    }
    res.send(viewerUsers);
  } catch (error) {
    console.error('Error fetching viewers:', error);
    res.status(500).send({ error: error.message });
  }
});

app.post('/assignrole', async (req, res) => {
  try {
    const userid = req.body.userid;
    const userrole = req.body.userrole;
    
    const kcAdminClient = await getKeycloakClient();
    const role = await kcAdminClient.roles.findOneByName({ name: userrole });
    
    await kcAdminClient.users.addRealmRoleMappings({
      id: userid,
      roles: [role]
    });
    
    res.sendStatus(200);
  } catch (error) {
    console.error('Error assigning role:', error);
    res.status(500).send({ error: error.message });
  }
});

app.get('/interactions', async (req, res) => {
  try {
    const interactions = await db.all('SELECT * FROM interactions ORDER BY timestamp DESC');
    res.send(interactions);
  } catch (error) {
    console.error('Error fetching interactions:', error);
    res.status(500).send({ error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  (`Server running on port ${PORT}`);
});