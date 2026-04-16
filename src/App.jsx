import Navbar from "./sharedcomponents/navbar"
import Odoo from "./erp/odoo"
import Northwind from "./erp/northwind"
import { useState } from "react"
import Odoodashboard from "./pages/odoodashboard"
import background from "./assets/background.jpg"
export default function App () {
  const [selectedErp , setSelectedErp] = useState(null);
  
  return (
    <div>
      {selectedErp === "odoo" ? (
        <Odoodashboard />
      ) : (
        <div style={{ backgroundImage: `url(${background})`, backgroundSize: "cover" }}>
          <Navbar />
          <div className="h-screen flex flex-row justify-center items-center gap-4" >
            <Odoo onSelect={setSelectedErp}/> 
            <Northwind onSelect={setSelectedErp}/>
          </div>
        </div>
      )}
    </div>
  )
}