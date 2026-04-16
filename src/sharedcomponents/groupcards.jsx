import Card from "./card";
export default function GroupCards({ statistics }) {


return(
    <>
          <Card title="Number of users" value={statistics[14]}/>
          <Card title="Number of partners" value={statistics[15]}/>
          <Card title="Number of orders" value={statistics[1]}/>
          <Card title="Total Revenue" value={statistics[2]} sign=" $"/>
          <Card title="Total Revenue of sale orders" value={statistics[3]} sign=" $"/>
          <Card title="Orders sent" value={statistics[4]}/>
          <Card title="Orders in sale" value={statistics[5]}/>
          <Card title="Orders Canceled" value={statistics[6]}/>   
          <Card title="Orders Drafted" value={statistics[7]}/>
          <Card title="Average Order Value" value={statistics[8]} sign=" $"/>   
</>
)



}