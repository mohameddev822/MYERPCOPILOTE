
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
export default function Linechartcomponent({statistics}){
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
         
            tick={{ fill: 'yellow' }}
          />
          <YAxis  tickFormatter={(value) => value === 0 ? '' : value}
           tick={{ fill: 'yellow' }}/>
          <Legend />
          <Tooltip/>
          <Line 
            type="monotone" 
            dataKey="revenue" 
            stroke="#8884d8" 
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 8 }}
            name="Daily Sales from March to April"
          />
        </LineChart>
      </ResponsiveContainer>
</>
)}