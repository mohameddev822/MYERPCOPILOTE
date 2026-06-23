import { gettotalnumberof , gettotalof , average  , gettotalnumberofcondition } from "../dashboardstatistics" ;


export default function CRMDashboard({ data }) {
  
  const numberofleads = gettotalnumberof(data, null);
  const totalactiveleads = gettotalnumberofcondition(data,"active",true ,'=' );
  const totalofnoactiveleads = gettotalnumberofcondition(data,"active",false ,'=' );
  const totalexpectedrevenue = gettotalof(data,"expected_revenue");
  const numberofleadswithnoactiveusers = gettotalnumberofcondition(data,"activity_user_id",false,'=');
 const numberofwonleads = gettotalnumberofcondition(data,"won_status",'won','=');
 const numberofpendingleads = gettotalnumberofcondition(data,"won_status",'pending','=');
 const numberofleadswithnomeeting = gettotalnumberofcondition(data, "meeting_display_label",'No Meeting','=');
 const numberofleadswithmeeting = gettotalnumberofcondition(data, "meeting_display_label",'No Meeting','!=');
 const averageleadsrevenue = average(data, "expected_revenue", numberofleads)
  return [numberofleads , totalactiveleads , totalexpectedrevenue , numberofleadswithnoactiveusers , numberofwonleads , numberofpendingleads , numberofleadswithnomeeting , numberofleadswithmeeting , averageleadsrevenue , totalofnoactiveleads];
};