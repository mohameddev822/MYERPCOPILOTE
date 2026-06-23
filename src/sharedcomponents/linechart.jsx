
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
export default function Linechartcomponent({statistics , module}){
  switch(module){
    case "sale" :
      return(
    <>
<ResponsiveContainer width={(500)} height={300}>
        <LineChart data={statistics[11].map(item => ({ name: item[0], revenue: item[1]}))} className=" mt-6  ml-6">
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" padding={{ left: 30 }} 
            tickFormatter={(date) => {
              const [, month, day] = date.split('-');
              return `${day}-${month}`;
            }}
            interval={2}
            tick={{ fill: '#8884d8' }}
          />
          <YAxis  tickFormatter={(value) => value === 0 ? '' : value}
           tick={{ fill: '#8884d8' }}/>
          <Legend />
          <Tooltip/>
          <Line 
            type="monotone" 
            dataKey="revenue" 
            stroke="black" 
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 8 }}
            name="Daily Sales from March to April"
          />
        </LineChart>
      </ResponsiveContainer>
</>
      )
      
    }}