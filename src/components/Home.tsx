import React, { useEffect, useState } from "react";
import Chatting from "./Chatting/Chatting";
import Fetching from "./Fetching";
interface props{
}

const Home: React.FC<props> = () =>{
    const [w,setw]=useState(true);
    useEffect(()=>{

        const z= setTimeout(()=>{
            setw(false);
         },2000);
         return ()=>clearTimeout(z);
    },[])
return(<> 
  
  <div className="bb relative mt-14" >

  {w? <Fetching/>: <Chatting/>}

</div>
  </>
);
}

Home.defaultProps = {};

export default React.memo(Home);