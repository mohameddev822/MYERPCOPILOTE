import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function Barchartcomponent({statistics ,module}){
   
  let barData = [];
  switch (module){
  
  case "account" :
  barData = [
  { name: 'Accounts from US', value: statistics[8] },  
  { name: "Accounts not from US", value: statistics[9] }  
];
 break;
 case "crm" :
  barData = [
  { name: 'Active leads', value: statistics[1] },
  { name : 'No active leads', value: statistics[9] }
  ];
  break;
  case "product":
  barData = [
    {name : "No Tracking service" , value : statistics[5]},
    {name : "Tracking service" , value : statistics[6]}
  ];
  break;
  }

  switch(module){
    case "sale" :
    return(
        <ResponsiveContainer width={700} height={300} >
                <BarChart data={statistics[10].map(item => ({ name: item[0], revenue: item[1] }))} className="ml-10">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" tick={{ fill: 'black' }} />
                  <YAxis 
                    domain={[0, 'dataMax + 1000']} 
                    tickFormatter={(value) => `$${value.toLocaleString()}`}
                    tick={{ fill: 'black' }}
                  />
                  <Legend />
                  <Tooltip/>
                  <Bar dataKey="revenue" fill="#8884d8" name="Revenue of sale orders by partner" barSize={50} />
                </BarChart>
              </ResponsiveContainer>
    )
    case "account" :
      return(
        <ResponsiveContainer width={700} height={300} >
          <BarChart data={barData} className="ml-10">
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" tick={{ fill: 'black' }} />
            <YAxis 
              domain={[0, 'dataMax + 1000']} 
              tickFormatter={(value) => `$${value.toLocaleString()}`}
              tick={{ fill: 'black' }}
            />
            <Legend />
            <Tooltip/>
            <Bar dataKey="value" fill="#8884d8" name="Number of Accounts from US and not from US" barSize={50} />
          </BarChart>
        </ResponsiveContainer>
      )
    case "crm" :
      return(
        <ResponsiveContainer width={700} height={300} >
          <BarChart data={barData} className="ml-10">
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" tick={{ fill: 'black' }} />
            <YAxis 
              domain={[0, 'dataMax + 10']} 
              tickFormatter={(value) => `$${value.toLocaleString()}`}
              tick={{ fill: 'black' }}
            />
            <Legend />
            <Tooltip/>
            <Bar dataKey="value" fill="#8884d8" name="Number of Active Leads and No Active Leads " barSize={50} />
          </BarChart>
        </ResponsiveContainer>
      )
      case "product" :
        return (
          <ResponsiveContainer width={700} height={300} >
          <BarChart data={barData} className="ml-10">
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" tick={{ fill: 'black' }} />
            <YAxis 
              domain={[0, 'dataMax + 10']} 
              tickFormatter={(value) => `$${value.toLocaleString()}`}
              tick={{ fill: 'black' }}
            />
            <Legend />
            <Tooltip/>
            <Bar dataKey="value" fill="#8884d8" name="Tracking service vs No Tracking service " barSize={50} />
          </BarChart>
        </ResponsiveContainer>
        )
    }
    }
    