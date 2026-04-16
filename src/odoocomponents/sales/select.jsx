import background from "../../assets/background.jpg";
import Odooappselectiontext from "../../sharedcomponents/odooappselectiontext";
import Salesdashboard from "./dashboard";


export default function Select({ onClick ,title }) {
  
    return (
      
            <div 
                onClick={onClick}
                className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-xl font-bold w-36 h-36 flex items-center justify-center mt-6 ml-6 cursor-pointer transition-all duration-300 hover:scale-105"
            >
                {title}
            </div>

            
    )
}