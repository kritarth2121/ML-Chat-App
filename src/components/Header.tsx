import { Avatar } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectUser } from "../features/userSlice";
import { auth } from "../firebase";
import Button from "./Button/Button";
interface props{
}

const Header: React.FC<props> = () =>{
  const user = useSelector(selectUser);

return(<> 

  <div className="h-14 space-x-20 items-center  md:text-sm pl-10 fixed inset-0 flex w-full flex-row bg-gray-400"> 
  <div > <Link to="" > <Button classes ="rounded-lg" theme="Warning">Chat with girl</Button></Link></div>
  <div><Button classes ="rounded-lg"> Buy Premium</Button></div>
  {user? (<div><Button onclick={() => auth.signOut()} classes ="rounded-lg"> Logout</Button></div>):<div> <Link to="/login" > <Button classes ="rounded-lg" theme="Info">Login</Button></Link></div> }
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