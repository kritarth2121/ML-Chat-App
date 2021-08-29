import React from "react";
import { Link } from "react-router-dom";
import Button from "./Button/Button";
interface props{
}

const Header: React.FC<props> = () =>{
return(<> 
  <div className="h-14 space-x-20 items-center  md:text-sm pl-10 fixed inset-0 flex w-full flex-row bg-gray-400"> 
  <div > <Link to="" > <Button classes ="rounded-lg" theme="Warning">Chat with girl</Button></Link></div>
  <div><Button classes ="rounded-lg"> Buy Premium</Button></div>
  <div> <Link to="/login" > <Button classes ="rounded-lg" theme="Info">Login/Logout</Button></Link></div>
  
  </div>

  </>
);
}

Header.defaultProps = {};

export default React.memo(Header);