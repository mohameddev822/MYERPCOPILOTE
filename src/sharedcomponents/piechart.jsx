import { PieChart, Pie, Cell, Legend } from 'recharts';
export default function PieChartcomponent({statistics}){  
      
    return(
        <>
      <PieChart width={500} height={300}>
       <Pie 
          data={statistics[9].map(item => ({ name: item[0], value: item[1] }))}
          cx="50%"
          cy="50%"
          labelLine={true}
          label={({ name, percent }) => `${name} orders : ${(percent * 100).toFixed(2)}%`}
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
}