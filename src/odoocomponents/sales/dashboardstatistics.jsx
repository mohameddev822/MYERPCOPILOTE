export function getall(data, field) {
    if (!Array.isArray(data)) return [];

let elements = new Set();
    let total = 0 ;
    data.map(element => {
        if (element[field] && Array.isArray(element[field]) ){ {
            const elementarray = element[field]
            elements.add(elementarray[1]);
            total += element[field];
        }
}});
   const result = {elements :elements ,total : total}; 
    return result;   
}
export function gettotalnumberof(data, field) {
    if (!Array.isArray(data)) return 0;

    let number = 0;

    if (field != null && field != undefined) {
        const result = getall(data, field);
        const elements = Array.from(result.elements);

        elements.forEach(() => {
            number++;
        });

        return number;
    }

    return data.length;
}
export function gettotalofcondition(data, field,conditionfield ,  value) {
  if (!Array.isArray(data)) return 0;
  let total = 0 ; 
  data.forEach(element => {
    if (element[field] && element[conditionfield] && element[conditionfield] === value ) {
       total += element[field];
    }
  });
  
  return total;
}

export function gettotalnumberofcondition (data, conditionfield ,  value) {
  if (!Array.isArray(data)) return 0;
  let elements = [] ; 
  data.forEach(element => {
    if ( element[conditionfield] && element[conditionfield] === value ) {
       elements.push(element);
    }
  });
  
  return elements.length;
}

  

  export function gettotalof(data, field) {
    if (!Array.isArray(data)) return 0;

    return data.reduce((total, element) => {
        return total + (element[field] || 0);
    }, 0);
}
  
function getbyperson(data ,id, person , field , condition  , value){

    
const result = gettotalofcondition(data.filter(element => element[id][1] === person) , field , condition ,value);

console.group(result)
   return result;
}


  
  

  export function getData(data , id , field , condition , value) {
    if (!Array.isArray(data)) return [];
      const Mapmap =new Map();
    const persons = getall(data , id).elements;
    console.log(persons) 
    for(const person of persons){
        console.log(person)
    Mapmap.set(person , getbyperson(data , id , person , field , condition , value));
    }      
    
    const result = Array.from(Mapmap , ([key , value]) => ([key , value]));
    
    const finalresult = result.filter(element => element[1] > 0);

    return finalresult; 
      
  }


  

export function average(data , firstfield , secondfield) {
    if (!Array.isArray(data)) return 0;

    const firsttotal = typeof(firstfield) === 'string' ? gettotalof(data , firstfield) : firstfield;
   console.log(firsttotal)
    const secondtotal = typeof(secondfield) === 'string' ? gettotalnumberof(data , secondfield) : secondfield
    console.log(secondtotal)
    const average = firsttotal / secondtotal;
    return average;
  }

  export const getprogression = (data, xaxis, yaxis) => {
  if (!data || !Array.isArray(data)) {
    return [];
  }

  const Mapmap = new Map();

  data.forEach((item) => {
    let xaxisValue = item[xaxis];
    if (!xaxisValue) return;

    if (Array.isArray(xaxisValue)) {
      xaxisValue = xaxisValue[0];
    }

    if (typeof xaxisValue === 'string' && xaxisValue.includes(' ')) {
      xaxisValue = xaxisValue.split(' ')[0];
    }

    let yaxisValue = item[yaxis];
    if (Array.isArray(yaxisValue)) {
      yaxisValue = yaxisValue[0];
    }

    const currentTotal = Mapmap.get(xaxisValue) || 0;
    Mapmap.set(xaxisValue, currentTotal + (yaxisValue || 0));
  });

  const result = Array.from(Mapmap, ([xaxisValue, yaxisValue]) => ([xaxisValue, yaxisValue]));
  
  return result.sort((a, b) => new Date(a[0]) - new Date(b[0]));
};


