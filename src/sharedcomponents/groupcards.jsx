import Card from "./card";
export default function GroupCards({ statistics , module}) {

    switch(module){
         case "sale" :
                return(
        
                 <>
          <Card title="Number of orders" value={statistics[1]}/>
          <Card title="Total Revenue" value={statistics[2]} sign=" $"/>
          <Card title="Total Revenue of sale orders" value={statistics[3]} sign=" $"/>
          <Card title="Orders sent" value={statistics[4]}/>
          <Card title="Orders in sale" value={statistics[5]}/>
          <Card title="Orders Canceled" value={statistics[6]}/>   
          <Card title="Orders Drafted" value={statistics[7]}/>
          <Card title="Average Order Value" value={statistics[8].toFixed(2)} sign=" $"/>   
                   </>
                )
          case "account":
            return (
                <>
                <Card title="Number of accounts" value={statistics[1]}></Card>
                <Card title="Number of active accounts" value={statistics[0]}></Card>
                <Card title="Total of positive current balance" value={statistics[2]} sign=" $"></Card>
                <Card title="Total of negative current balance" value={statistics[3]} sign=" $"></Card>
                <Card title="Total opening balance" value={statistics[4]} sign=" $"></Card>
                <Card title="Number of accounts with message don't need action" value={statistics[5]}></Card>
                <Card title="Number of accounts with message need action" value={statistics[6]}></Card>
                <Card title="Total of opening credit" value={statistics[7]} sign=" $"></Card>
                <Card title="Number of accounts from US" value={statistics[8]}></Card>
                </>
            )
            case "crm" :
            return (
                <>
                <Card title="Number of leads" value={statistics[0]}></Card>
                <Card title="Number of active leads" value={statistics[1]}></Card>
                <Card title="Total expected revenue" value={statistics[2]} sign=" $"></Card>
                <Card title="Number of leads with no active users" value={statistics[3]}></Card>
                <Card title="Number of won leads" value={statistics[4]}></Card>
                <Card title="Number of pending leads" value={statistics[5]}></Card>
                <Card title="Number of leads with no planned meeting" value={statistics[6]}></Card>
                <Card title="Number of leads with planned meeting" value={statistics[7]}></Card>
                <Card title="Average expected revenue by lead" value={statistics[8].toFixed(3)} sign=" $"></Card>
                </>
            )

            case "product":
            return (
                <>
                <Card title="Number of products" value={statistics[0]}></Card>
                <Card title="Product sales count" value={statistics[1]}></Card>
                <Card title="Total standard price" value={statistics[2]} sign=" $"></Card>
                <Card title="Number of manual services" value={statistics[3]}></Card>
                <Card title="Number of non manual services" value={statistics[4]}></Card>
                <Card title="Number of products with no tracking service" value={statistics[5]}></Card>
                <Card title="Number of products with tracking service" value={statistics[6]}></Card>
                <Card title="Number of favorite products" value={statistics[7]}></Card>
                <Card title="Number of non favorite products" value={statistics[8]}></Card>
                </>
            )

        }
}