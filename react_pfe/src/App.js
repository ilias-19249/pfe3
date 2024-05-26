import { useState } from 'react';
import { authContext } from './helpers/authContext';
import Navigation from './Navigation/Navigation';
import ProducerRoutes from './Navigation/ProducerRoutes';
function App() {
  const [user,setUser]=useState({});
  return (
  <authContext.Provider value={{user,setUser}}>
    <div>
   <Navigation />
   {/* <ProducerRoutes /> */}
    </div>
  </authContext.Provider>
  )
}

export default App;
