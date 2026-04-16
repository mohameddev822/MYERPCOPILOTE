import axios  from "axios";
import { useEffect, useState } from "react";
import Odooappselectiontext from "../sharedcomponents/odooappselectiontext";
import Select from "../odoocomponents/sales/select";
import Dashboard from "../odoocomponents/sales/dashboard";
import background from "../assets/background.jpg" ; 
export default function Odoodashboard() {
    const [connectedtoOdoo , setConnectedtoOdoo] = useState(false) ;
    const [data, setData] = useState([]) ;
    const [selectedModule , setSelectedModule] = useState(null) ;
    const db = "my-odoo-database" ; 
    const email = "sanbimohamed095@gmail.com";
    const password = "rabat2002chelsea" ; 
    const uid = 2;

     async function connect() {
     const response = await axios.post(`/odoo/jsonrpc`, {
        jsonrpc: '2.0',
        method: 'call',
        params: {
            service: 'common',
            method: 'login',
            args: [db, email, password]
        },
        id: 1
    });
    if (response.data.result == 2) {
        setConnectedtoOdoo(true) ;
    }}

    async function fetchaccountmove(){
        
   const accountmove = await axios.post('/odoo/jsonrpc', {
      jsonrpc: '2.0',
      method: 'call',
      params: {
        service: 'object',
        method: 'execute_kw',
        args: [
          db, uid, password,
          'account.move',
          'search_read',
      ]}
    });
setData(accountmove.data.result) ;
}
    async function fetchsaleorders() {
        const models = await axios.post('/odoo/jsonrpc', {
            jsonrpc: '2.0',
            method: 'call',
            params: {
                service: 'object',
                method: 'execute_kw',
                args: [
                    db, uid, password,
                    'ir.model',
                    'search_read',
                    [[]], 
                    {
                        fields: ['id', 'model', 'name'],
                        limit: 1000
                    }
        ]    }
        });

   const saleorders = await axios.post('/odoo/jsonrpc', {
      jsonrpc: '2.0',
      method: 'call',
      params: {
        service: 'object',
        method: 'execute_kw',
        args: [
          db, uid, password,
          'sale.order',
          'search_read',
          [[]], 
          {  
            fields: [
              'id',
              'name',
              'amount_total',
              'state',
              'date_order',
              'partner_id',
              'user_id',
              'team_id'
            ],
            limit: 1000
          }
        ]
      }
    });
    setData(saleorders.data.result) ;
    console.log(saleorders.data.result);
    
}
useEffect(() => {
  async function fetchData() {
    switch (selectedModule) {
      case "sales":
        await fetchsaleorders();
        break;
      case "accountmove":
        await fetchaccountmove();
        break;
      default:
        break;
    }
  }
  
  fetchData();
}, [selectedModule]);

   return (
<div style={{ backgroundImage: `url(${background})`, backgroundSize: "cover" }} >

        {!connectedtoOdoo ? (
            <>
                
                <div className="h-screen flex flex-col justify-center items-center gap-4">
                    <h1 className="text-5xl font-bold text-amber-300">Odoo Dashboard</h1>
                    <p className="text-xl text-white">Welcome to the Odoo Dashboard! Here you can manage your Odoo ERP system and access various features and modules.</p>
                    <button onClick={connect} className="bg-red-900 text-white text-xl font-bold hover:bg-red-700 px-8 py-4 rounded-full">
                        Explore Odoo
                    </button>
                </div>
            </>
        ) : (
         <>
    {selectedModule === null ? (
        <>
          <div 
            className="h-screen w-full overflow-auto flex flex-col"
        >
        
                    <Odooappselectiontext />
        <div className="grid grid-cols-7 gap-y-4 ">
            <Select onClick={() => setSelectedModule("sales")} title="Sales" />
            <Select onClick={() => setSelectedModule("accountmove")} title="Accounting" />
       </div>
       </div>
        </>
    ) : (
        <>
                {selectedModule === "sales" && <Dashboard data={data} module="sale.order" />}
                {selectedModule === "accountmove" && <Dashboard data={data} module="account.move" />}
                

        </>
    )}
</>
        )}
    </div>
)}
