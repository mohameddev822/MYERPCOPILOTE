# MYERPCOPILOTE BY MOHAMED SANBI (PFE INTERNSHIP AT DEVOTEAM SALE FROM 9-06-2026 to 19-06-2026)

First clone the project using : git clone https://github.com/mohameddev822/MYERPCOPILOTE.git.

Execute npm install .

Execute the following commands :  

- docker run -v odoo-db:/var/lib/postgresql/data --name postgres-db -d mohamed121111/postgresqldb 
- docker run -d --name odoodb  --link postgres-db:db  -v odoo-data:/var/lib/odoo  -p 8069:8069   mohamed121111/odoodatabase
- docker run   -p 8080:8080   mohamed121111/keycloak

Get GROQ API key from : https://console.groq.com/keys , go to .env and assign the GROQ API key to the .env variable GROQ_API_KEY .

IF you want to use your own odoo database assign your database name , email and password to the .env variables : db , email , password .

To execute the project : 

- npm run dev
- node backend.js


=======
Développement d'un copilote IA erp-agnostique
>>>>>>> 3518a201d3044663701c2749a71603e6c3fbc120
