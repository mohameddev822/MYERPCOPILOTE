import {getall , gettotalnumberof , gettotalof, getData , average , getprogression , gettotalofcondition , gettotalnumberofcondition } from "./dashboardstatistics" ;


export default function SalesDashboard({ salesdata }) {
  
  const totalnumberofusers = gettotalnumberof(salesdata , "user_id") ;
  const totalnumberofpartners = gettotalnumberof(salesdata , "partner_id") ;
  const totalpartners = getall(salesdata , "partner_id");
  const totalusers = getall(salesdata,["user_id"]);
  const totalOrders = gettotalnumberof(salesdata,null);
  const totalRevenue = gettotalof(salesdata,"amount_total");
  const avgOrderValue = average(salesdata, "amount_total", totalOrders);
  const completedSalesrevenue = gettotalofcondition(salesdata,"amount_total","state" , "sale" );
  const topUsers = getData(salesdata , "user_id", "amount_total" , "state", "sale");
  const topPartners = getData(salesdata , "partner_id" , "amount_total", "state", "sale");
  const salesProgression = getprogression(salesdata ,"date_order", "amount_total");
  const numberofsaleorders = gettotalnumberofcondition(salesdata,"state", "sale");
  const numnberofsentorders = gettotalnumberofcondition(salesdata,"state", "sent");
  const numberofcancelledorders = gettotalnumberofcondition(salesdata,"state", "cancel");
  const numberofdraftorders = gettotalnumberofcondition(salesdata,"state", "draft");
  const numberofordersbysalesperson = gettotalof(salesdata, "user_id" , "amount_total");

  return [totalusers ,  totalOrders, totalRevenue, completedSalesrevenue , numnberofsentorders, numberofsaleorders,numberofcancelledorders,numberofdraftorders, avgOrderValue,  topUsers, topPartners, salesProgression ,  numberofordersbysalesperson , totalpartners , totalnumberofusers , totalnumberofpartners ];
};