import logo from "../assets/logo.png";
import Keycloak from 'keycloak-js';
import { useKeycloak } from "@react-keycloak/web";

export default function Navbar({ connected = false }) {

  const { keycloak, initialized } = useKeycloak();

  const firstName = keycloak.tokenParsed?.given_name;
  const lastName = keycloak.tokenParsed?.family_name;

  
const handleLogout = () => {
    if (!initialized) return;

    keycloak.logout({
      redirectUri: window.location.origin,
    });
  };
  return (
    <div className="w-full ">
      <div className="w-full h-24 flex items-center justify-between px-8">
        <h1 className="text-white text-3xl font-bold tracking-tight drop-shadow-md">
       <img src={logo} alt="Logo" className="h-36 W-36 inline-block mr-2" /> MyERPCopilote
        </h1>
        <div className="flex gap-3">
          {!connected && (
            <>
              <span className="text-white text-sm font-medium px-5 py-2.5">
         👤 {firstName} {lastName}
              </span>
              <button onClick={handleLogout} className="px-5 py-2.5 rounded-full font-semibold text-sm transition-all duration-300 
                               bg-white/10 text-white border border-white/20 
                               hover:bg-white/20 hover:border-white/40 hover:scale-105 
                               backdrop-blur-sm">
                Logout
              </button>
              
            </>
          )}
          {connected && (
            <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-white text-sm font-medium">Connected</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
  