import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function Areachartcomponent({statistics , module}){
  let areaData = [] 
  switch (module){
   case "account" :
   areaData = [
  { name: "Not need action", value: statistics[5] },  
  { name: "Need action", value: statistics[6] } ,
];
break;
case "crm" :
  areaData = [
  { name: "No meeting", value: statistics[6] },
  { name : "Meeting", value: statistics[7] }
  ];
  break;
case "product" :
  areaData = [
    {name : "Non Favorite" , value : statistics[8]},
    {name : "Favorite" , value : statistics[7]}
  ];
  break;
}

  switch(module){
    case "sale" :
    return(
         <ResponsiveContainer width={500} height={300} >
                <AreaChart data={statistics[9].map(item => ({ name: item[0], revenue: item[1] }))} className=" mt-6  ml-40" >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" tick={{ fill: 'black' }}/>
                  <YAxis tick={{ fill: 'black' }} tickFormatter={(value) => value === 0 ? '' : value}/>
                  <Legend />
                  <Tooltip/>
                  <Area 
                    type="monotone" 
                    dataKey="revenue" 
                    stroke="black" 
                    fill="#8884d8"
                    name="Revenue of sale orders by user"
                  />
                </AreaChart>
              </ResponsiveContainer>
    )
    case "account" :
      return (
           <ResponsiveContainer width={500} height={300} >
                <AreaChart data={areaData} className=" mt-6  ml-40" >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" tick={{ fill: 'black' }}/>
                  <YAxis tick={{ fill: 'black' }} tickFormatter={(value) => value === 0 ? '' : value}/>
                  <Legend />
                  <Tooltip/>
                  <Area 
                    type="monotone" 
                    dataKey="value" 
                    stroke="black" 
                    fill="#8884d8"
                    name="Messages need action vs Messages don't need action"
                  />
                </AreaChart>
              </ResponsiveContainer>
      )
      case "crm" : 
      return (
         <ResponsiveContainer width={500} height={300} >
                <AreaChart data={areaData} className=" mt-6  ml-40" >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" tick={{ fill: 'black' }}/>
                  <YAxis tick={{ fill: 'black' }} tickFormatter={(value) => value === 0 ? '' : value}/>
                  <Legend />
                  <Tooltip/>
                  <Area 
                    type="monotone" 
                    dataKey="value" 
                    stroke="black" 
                    fill="#8884d8"
                    name="Leads with no planned meeting vs Leads with planned meeting"
                  />
                </AreaChart>
              </ResponsiveContainer>
      )
      case "product" :
        return (
          <ResponsiveContainer width={500} height={300} >
                <AreaChart data={areaData} className=" mt-6  ml-40" >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" tick={{ fill: 'black' }}/>
                  <YAxis tick={{ fill: 'black' }} tickFormatter={(value) => value === 0 ? '' : value}/>
                  <Legend />
                  <Tooltip/>
                  <Area 
                    type="monotone" 
                    dataKey="value" 
                    stroke="black" 
                    fill="#8884d8"
                    name="Non Favorite products vs Favorite products"
                  />
                </AreaChart>
              </ResponsiveContainer>
        )
}
}