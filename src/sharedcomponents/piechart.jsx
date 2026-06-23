import { PieChart, Pie, Cell, Legend } from 'recharts';
export default function PieChartcomponent({statistics , module}){  
 let pieData = [];
  
  switch (module) {
    case "account":
      pieData = [
        { name: 'Active Accounts', value: statistics[10] || 0 },  
        { name: 'Inactive Accounts', value: statistics[11] || 0 }  
      ];
      break;
      
    case "crm":
      pieData = [
        { name: 'Won Leads', value: statistics[4] || 0 },
        { name: 'Pending Leads', value: statistics[5] || 0 }
      ];
      break;
    case "product":
      pieData = [
        { name: 'Manual Services', value: statistics[3] || 0 },
        { name: 'Non Manual Services', value: statistics[4] || 0 },
      ]
  }    
  
  
const COLORS = ['#0088FE', '#00C49F'];
   switch(module){
    case "sale" :    
       return(
        <>
           <PieChart className="ml-30"width={500} height={300}>
           <Pie 
          data={statistics[9].map(item => ({ name: item[0], value: item[1] }))}
          cx="50%"
          cy="50%"
          labelLine={true}
          label={({ name, percent }) => ` ${name.split(' ')[0]} Sales : ${(percent * 100).toFixed(2)}%`}
          outerRadius={90}
          dataKey="value"
          nameKey="name"
        >
          <Cell fill="#0088FE" />
          <Cell fill="#00C49F" />
        </Pie>
        <Legend />
      </PieChart>
      </> 
)

   case "account" :
   
    return(
        <>
           <PieChart width={600} height={300}>
           <Pie 
          data={pieData}
         cx="50%"
         cy="50%"
         labelLine={true}
         label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
         outerRadius={90}
         dataKey="value"
         nameKey="name"
    >
      {pieData.map((entry, index) => (
        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
      ))}
    </Pie>
    <Legend />
  </PieChart>
      </> 
    )
    case "crm" :
    return(
        <>
           <PieChart width={600} height={300}>
           <Pie 
          data={pieData}
         cx="50%"
         cy="50%"
         labelLine={true}
         label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
         outerRadius={90}
         dataKey="value"
         nameKey="name"
    >
      {pieData.map((entry, index) => (
        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
      ))}
    </Pie>
    <Legend />
  </PieChart>
      </> 
    ) 
    case "product" :
    return(
        <>
            <PieChart width={600} height={300}>
           <Pie 
          data={pieData}
         cx="50%"
         cy="50%"
         labelLine={true}
         label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
         outerRadius={90}
         dataKey="value"
         nameKey="name"
    >
      {pieData.map((entry, index) => (
        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
      ))}
    </Pie>
    <Legend />
  </PieChart>
      </> 
    )
}}