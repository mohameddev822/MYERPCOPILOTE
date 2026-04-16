
import SalesDashboard from "./salesdashboard";
import Dashboardtemplate from "./dashboardtemplate";

export default function Dashboard({data , module}) {
   let statistics = [];
   switch(module){
   case "sale.order" :
           statistics = SalesDashboard({ salesdata: data });  
           break;  
   case "account.move":
           statistics = AccountMoveDashboard({ accountmovedata: data }); 
           break;
   }

    return (
        <Dashboardtemplate data={data} statistics={statistics} />
    );

}