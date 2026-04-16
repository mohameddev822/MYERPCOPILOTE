import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function Barchartcomponent({statistics}){

    return(
        <ResponsiveContainer width={700} height={300} >
                <BarChart data={statistics[10].map(item => ({ name: item[0], revenue: item[1] }))} className="ml-10">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" tick={{ fill: 'yellow' }} />
                  <YAxis 
                    domain={[0, 'dataMax + 1000']} 
                    tickFormatter={(value) => `$${value.toLocaleString()}`}
                    tick={{ fill: 'yellow' }}
                  />
                  <Legend />
                  <Tooltip/>
                  <Bar dataKey="revenue" fill="#8884d8" name="Revenue of sale orders by partner" barSize={50} />
                </BarChart>
              </ResponsiveContainer>
    )}
    