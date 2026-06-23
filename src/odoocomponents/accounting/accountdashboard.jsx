import {gettotalnumberof , gettotalof, gettotalnumberofcondition } from "../dashboardstatistics" ;


export default function AccountDashboard({ data }) {
  
 
  const totalaccounts = gettotalnumberof(data,null);
  const totalactiveaccounts = gettotalnumberofcondition(data,"active",true ,'=' );
  const totalpositivecurrentbalance = gettotalnumberofcondition(data,"current_balance",0, '>');
  const totalnegativecurrentbalance = gettotalnumberofcondition(data,"current_balance",0, '<');
  const totalopeningbalance = gettotalof(data,"opening_balance"); 
  const numberofaccountswithmessagenotneedaction = gettotalnumberofcondition(data,"message_needaction",false,'=');
  const numberofaccountswithmessageneedaction = gettotalnumberofcondition(data,"message_needaction",true,'=');
  const totalopeningcredit = gettotalof(data,"opening_credit"); 
  const numberofaccountsfromus = gettotalnumberofcondition(data,"company_fiscal_country_code",'US' ,'=');
  const numberofaccountsnotfromus = gettotalnumberofcondition(data,"company_fiscal_country_code",'US' ,'!=');
  const numberofactiveaccounts = gettotalnumberofcondition(data,"active", true , '=')
  const numberofinactiveaccounts = gettotalnumberofcondition(data,"active", false , '=')
  
  return [totalactiveaccounts ,  totalaccounts, totalpositivecurrentbalance, totalnegativecurrentbalance , totalopeningbalance , numberofaccountswithmessagenotneedaction , numberofaccountswithmessageneedaction,totalopeningcredit, numberofaccountsfromus ,numberofaccountsnotfromus, numberofactiveaccounts, numberofinactiveaccounts,   null , null , null , null ];
};