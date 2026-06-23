import axios from "axios";
import { useEffect, useState } from "react";
import Odooappselectiontext from "../sharedcomponents/odooappselectiontext";
import Select from "../odoocomponents/select";
import Dashboard from "../odoocomponents/dashboard";
import Keycloak from 'keycloak-js';
import KcAdminClient from "@keycloak/keycloak-admin-client";
import Tableofusers from "../sharedcomponents/tableusers";
import Tableofinteractions from "../sharedcomponents/tableinteractions";
export default function Odoodashboard({ connected , isAdmin }) {
    const [connectedtoOdoo, setConnectedtoOdoo] = useState(false);
    const [data, setData] = useState([]);
    const [selectedModule, setSelectedModule] = useState(null);
    const [viewers, setViewers] = useState([]);
    
    
useEffect(() => {
 async function getviewers() {
    const response = await axios.get('/express/viewers');
    (response.data);
    setViewers(response.data);
 }
    getviewers();
}, []);

    async function connect() {
        const response = await axios.get('/express/api/connect');
        if (response.data) {
            console.log('Connected to Odoo successfully');
            console.log(response.data);
            setConnectedtoOdoo(true);
        }
    }


    async function fetchaccountmove() {
        const accountmove = await axios.get('/express/api/fetchaccounting');
        setData(accountmove.data);
    }

    async function fetchsaleorders() {
        const saleorders = await axios.get('/express/api/fetchsaleorders');
        console.log("saleorders" , saleorders.data.result);
        setData(saleorders.data);
    }
            


    async function fetchcrmleads() {
         const crmleads = await axios.get('/express/api/fetchcrmleads')         
         setData(crmleads.data);
    }
    async function fetchproduct(){
        const products = await axios.get('/express/api/fetchproduct') 
        setData(products.data);
}

   

    useEffect(() => {
        async function connecttoodoo() {
        await connect();
        }
        connecttoodoo();
    }, []);

    useEffect(() => {
        async function fetchData() {
            switch (selectedModule) {
                case "sale":
                    await fetchsaleorders();
                    break;
                case "account":
                    await fetchaccountmove();
                    break;
                case "crm":
                    await fetchcrmleads();
                    break;
                case "product":
                    await fetchproduct();
                    break;
                default:
                    break;
            }
        }
        fetchData();
        
    }, [selectedModule]);

    useEffect(() => {
}, [data]);
    return (
        <div className="w-full min-h-screen">
            {connectedtoOdoo && connected && !isAdmin ? (
                <div className="w-full">
                    {selectedModule === null ? (
                        <div className="w-full">
                            <div className="text-center py-8">
                                <h1 className="text-5xl font-bold text-white">Odoo Dashboard</h1>
                                <p className="text-xl font-bold mt-15">
                                    Welcome to the Odoo Dashboard! Here you can manage your Odoo ERP 
                                    system and access various features and modules.
                                </p>
                            </div>
                            <Odooappselectiontext />
                            <div className="grid grid-cols-7 gap-4 p-8">
                                <Select onClick={() => setSelectedModule("sale")} title="Sales" />
                                <Select onClick={() => setSelectedModule("account")} title="Accounting" />
                                <Select onClick={() => setSelectedModule("crm")} title="CRM" />
                                <Select onClick={() => setSelectedModule("product")} title="Product" />
                            </div>
                        </div>
                    ) : (
                        <>
                            {selectedModule === "sale" && <Dashboard data={data} module="sale" />}
                            {selectedModule === "account" && <Dashboard data={data} module="account" />}
                            {selectedModule === "crm" && <Dashboard data={data} module="crm" />}
                            {selectedModule === "product" && <Dashboard data={data} module="product" />}
                        </>
                    )}
                </div>
            ) : connectedtoOdoo && connected && isAdmin  ? (
               <div className="w-full">
    <div className="text-center py-8">
        <h1 className="text-5xl font-bold text-white">Admin Dashboard</h1>
            <p className="text-xl font-bold mt-15">
            Welcome to your central command center! From here, you can monitor activity, manage users, 
            track key metrics, and configure system settings to keep everything running smoothly.
        </p>
        <div className="w-full p-4"> 
            <div className="bg-red-200">
                <Tableofusers viewers={viewers} />
            </div>
            <div className="bg-red-200 mt-10">
                <Tableofinteractions />
            </div>
        </div>
    </div>
</div>
            ) : !connectedtoOdoo ? (
                                <div>Not Connected to Odoo</div>
            ): null}
        </div>
    );
}
  

