import { Outlet } from "react-router-dom";

import { useSelector } from "react-redux";
import Loader from "./components/Loader";

function App() {
  const loaders = useSelector(Store => Store.loader.loader)
  return (
    
    <div className="h-screen z-10 bg-slate-900 text-white flex justify-center items-center">
       {(!loaders && <Loader />)}
       <Outlet />
       
         
      
    </div>
   
  );
}



export default App;
