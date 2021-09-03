import { Avatar } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectUser } from "../features/userSlice";
import { auth } from "../firebase";
import Butto from "./Button/Button";
interface props{
}

const Header: React.FC<props> = () =>{
  const user = useSelector(selectUser);

return(<> 

  <div className="h-14 space-x-20 items-center  md:text-sm pl-10 fixed inset-0 flex w-full flex-row bg-gray-400"> 
  <div > <Link to="" > <Butto classes ="rounded-lg" theme="Warning">Chat with girl</Butto></Link></div>
  <div><Butto classes ="rounded-lg"> Buy Premium</Butto></div>
  {user? (<div><Butto onclick={() => auth.signOut()} classes ="rounded-lg"> Logout</Butto></div>):<div> <Link to="/login" > <Butto classes ="rounded-lg" theme="Info">Login</Butto></Link></div> }
  <div>

{ user?(<div><Avatar
          
          className="Avatar"
          src={
            user.photo
              ? user.photo
              : "https://images-platform.99static.com//_QXV_u2KU7-ihGjWZVHQb5d-yVM=/238x1326:821x1909/fit-in/500x500/99designs-contests-attachments/119/119362/attachment_119362573"
          }
        /></div>): <div></div>}
    
    </div>
  
  </div>

  </>
);
}

Header.defaultProps = {};

export default React.memo(Header);