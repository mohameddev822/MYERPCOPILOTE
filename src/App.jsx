import Navbar from "./sharedcomponents/navbar";
import Odoodashboard from "./pages/odoodashboard";
import background from "./assets/background.jpg";
import Keycloak from 'keycloak-js';
import { ReactKeycloakProvider, useKeycloak } from '@react-keycloak/web';
import axios from "axios";
import { useEffect, useState } from "react";

const keycloakConfig = {
  url: 'http://localhost:8080',
  realm: 'myerp',
  clientId: 'myerp-copilote'
};

const keycloak = new Keycloak(keycloakConfig);

function AppContent() {
  const { keycloak, initialized } = useKeycloak();
const [isadmin, setIsAdmin] = useState(false);

const userid = keycloak?.tokenParsed?.sub;
const userrole =keycloak.tokenParsed?.role;
useEffect(() => {
  async function assignrole(){
    await axios.post('/express/assignrole', {
      userid: userid,
      userrole: userrole
    });
  
  }
  if(initialized && userid && userrole){
  assignrole(); 
  }
}, [userid, userrole]);

async function isAdmin() {
  if (!userid) return; 
  
  try {
    const response = await axios.post('/express/api/admin', { userid: userid });
    setIsAdmin(response.data);
  } catch (error) {
    console.error('Error checking admin status:', error);
    setIsAdmin(false);
  }
}

useEffect(() => {
}, [isadmin]);

useEffect(() => {
  if (initialized && userid) {
    isAdmin();
    
  }
}, [initialized, userid]); 

if (!initialized) {
  return (
    <div style={{
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundImage: `url(${background})`,
      backgroundSize: "100% auto",
    }}>
      <h2>Loading authentication...</h2>
    </div>
  );
}
  
  
  return (
    <div
      style={{
        height: "100vh",
        overflowY: "scroll",
        backgroundImage: `url(${background})`,
        backgroundSize: "100% auto",
      }}
    >
      <Navbar />
      <Odoodashboard connected={keycloak.authenticated} isAdmin={isadmin} />
    </div>
  );
}

export default function App() {
  return (
    <ReactKeycloakProvider 
      authClient={keycloak} 
      initOptions={{ 
        onLoad: 'login-required',  
      }}
    >
      <AppContent />
    </ReactKeycloakProvider>
  );
}
