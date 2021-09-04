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



  
  {/* <div>
  <script type="text/javascript" >
      var aax_size='300x250';
      var aax_pubname = 'kt025-21';
      var aax_src='302';
    </script>
    <script type="text/javascript"  src="https://c.amazon-adsystem.com/aax2/assoc.js"></script></div> */}
</div>
  </>
);
}

Home.defaultProps = {};

export default React.memo(Home);