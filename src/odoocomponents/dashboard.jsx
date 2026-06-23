
import SalesDashboard from "./sales/salesdashboard";
import Dashboardtemplate from "./dashboardtemplate";
import AccountDashboard from "./accounting/accountdashboard";
import CRMDashboard from "./crm/crmdashboard";
import ProductDashboard from "./product/productdashboard";
export default function Dashboard({data , module}) {
   let statistics = [];
   switch(module){
   case "sale" :
           statistics = SalesDashboard({ data: data });  
           break;  
   case "account":
           statistics = AccountDashboard({ data: data   }); 
           break;
   case "crm":
           statistics = CRMDashboard({ data: data   }); 
           break;
   case "product":
           statistics = ProductDashboard({ data: data   }); 
           break;
   }

    return (
        <Dashboardtemplate data={data} module={module}  statistics={statistics} />
    );

}