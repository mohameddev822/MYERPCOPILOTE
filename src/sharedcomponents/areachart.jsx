import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function Areachartcomponent({statistics}){
    return(
         <ResponsiveContainer width={500} height={300} >
                <AreaChart data={statistics[9].map(item => ({ name: item[0], revenue: item[1] }))} className=" mt-6  ml-40" >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" tick={{ fill: 'yellow' }}/>
                  <YAxis tick={{ fill: 'yellow' }} tickFormatter={(value) => value === 0 ? '' : value}/>
                  <Legend />
                  <Tooltip/>
                  <Area 
                    type="monotone" 
                    dataKey="revenue" 
                    stroke="#82ca9d" 
                    fill="#82ca9d" 
                    name="Revenue of sale orders by user"
                  />
                </AreaChart>
              </ResponsiveContainer>
    )
}