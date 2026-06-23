import { gettotalnumberof , gettotalof,  gettotalnumberofcondition } from "../dashboardstatistics" ;


export default function ProductDashboard({ data }) {

  const numberofproducts = gettotalnumberof(data , null);
  const totalofsalescount = gettotalnumberofcondition(data , "sales_count", 0 , '>');
  ("totalofsalescount" , totalofsalescount);
  const totalstandardprice = gettotalof(data , "standard_price");
  const manualproducts = gettotalnumberofcondition(data , "service_type" , "manual" , '=');
  const nonmanualproducts = gettotalnumberofcondition(data , "service_type" , "manual" , '!=');
  const productswithnoservicetracking = gettotalnumberofcondition(data , "service_tracking" , 'no' , '=');
  const productswithservicetracking = gettotalnumberofcondition(data , "service_tracking" , 'no' , '!=');
  const numberoffavoriteproducts = gettotalnumberofcondition(data , "is_favorite" , true , '=');
  const numberofnonfavoriteproducts = gettotalnumberofcondition(data , "is_favorite" , false , '=');
  return [numberofproducts , totalofsalescount, totalstandardprice , manualproducts , nonmanualproducts , productswithnoservicetracking , productswithservicetracking , numberoffavoriteproducts , numberofnonfavoriteproducts];
};