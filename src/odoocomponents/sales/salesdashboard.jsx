import {getall , gettotalnumberof , gettotalof, getData , average , getprogression , gettotalofcondition , gettotalnumberofcondition } from "../dashboardstatistics" ;


export default function SalesDashboard({ data }) {
  
  const totalnumberofusers = gettotalnumberof(data , "user_id") ;
  const totalnumberofpartners = gettotalnumberof(data , "partner_id") ;
  const totalpartners = getall(data , "partner_id");
  const totalusers = getall(data,["user_id"]);
  const totalOrders = gettotalnumberof(data,null);
  const totalRevenue = gettotalof(data,"amount_total");
  const avgOrderValue = average(data, "amount_total", totalOrders);
  const completedSalesrevenue = gettotalofcondition(data,"amount_total","state" , "sale" );
  const topUsers = getData(data , "user_id", "amount_total" , "state", "sale");
  const topPartners = getData(data , "partner_id" , "amount_total", "state", "sale");
  const salesProgression = getprogression(data ,"date_order", "amount_total");
  const numberofsaleorders = gettotalnumberofcondition(data,"state", "sale" ,'=');
  const numnberofsentorders = gettotalnumberofcondition(data,"state", "sent" ,'=');
  const numberofcancelledorders = gettotalnumberofcondition(data,"state", "cancel" ,'=');
  const numberofdraftorders = gettotalnumberofcondition(data,"state", "draft" ,'=');
  const numberofordersbysalesperson = gettotalof(data,"amount_total");

  return [totalusers ,  totalOrders, totalRevenue, completedSalesrevenue , numnberofsentorders, numberofsaleorders,numberofcancelledorders,numberofdraftorders, avgOrderValue,  topUsers, topPartners, salesProgression ,  numberofordersbysalesperson , totalpartners , totalnumberofusers , totalnumberofpartners ];
};