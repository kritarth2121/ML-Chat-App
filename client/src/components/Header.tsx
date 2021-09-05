import { Transition ,Menu, Dialog} from "@headlessui/react";
import { Avatar } from "@material-ui/core";
import React, { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { getPremium, selectUser } from "../features/userSlice";
import { auth } from "../firebase";
import Butto from "./Button/Button";
import Razorpay from "./Razorpay";
interface props{
}

const Header: React.FC<props> = () =>{
  const history = useHistory();

  const user = useSelector(selectUser);
const premium=useSelector(getPremium);
console.log("premium",  premium);

  const[ premiumText,setPremiumText]=useState("");
useEffect(()=>{
  if (premium){
    setPremiumText("You are a premium user,talk unlimited")
  }
  else{
    setPremiumText("You are not a premium user")
  }
},[premium])

return(<> 
<div className="fixed inset-0 bg-gray-800 h-14 flex justify-between px-4 text-white items-center ">
  <div className=" hidden md:space-x-20 items-center text-white md:text-sm md:pl-10  md:flex w-full flex-row "> 
  <div > <Link to="" > <Butto classes ="rounded-lg" theme="Warning">Chat with girl</Butto></Link></div>
  {!premium? <Razorpay/> :<></>}
  {user? (<><div><Butto onclick={() => auth.signOut()} classes ="rounded-lg"> Logout</Butto></div> <div> { premiumText}</div> </> ):<div> <Link to="/login" > <Butto classes ="rounded-lg" theme="Success">Login</Butto></Link></div> }
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
    <div className=" "><a target="blank" href="https://rzp.io/l/nIHd4hD"> <Butto classes ="rounded-lg" theme="Info">  Donate us</Butto> </a></div>

  
  </div>
  
  <div className=" md:hidden relative "> { user?(<div><Avatar
          
          className="Avatar"
          src={
            user.photo
              ? user.photo
              : "https://images-platform.99static.com//_QXV_u2KU7-ihGjWZVHQb5d-yVM=/238x1326:821x1909/fit-in/500x500/99designs-contests-attachments/119/119362/attachment_119362573"
          }
        /></div>): <div></div>}</div>
        <div className=" md:hidden">{premiumText }</div>

  <div className=" md:hidden text-right  relative ">
            <Menu as="div" className="relative inline-block text-left ">
              <div>
                <Menu.Button className="text-black"><i className="bg-white text-2xl fas fa-bars"></i>

</Menu.Button>
              </div>
              <div className="relative ">
              <Dialog
          as="div"
          className="fixed inset-0 top-10 right-5  overflow-y-auto"
          onClose={()=>{}}
        >
              <Transition 
             
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >

                <Menu.Items className="absolute right-0  w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="px-1 py-1 ">
                    <Menu.Item>
                      {({ active }) => (
                        
                          <button
                            className={`${
                              active
                                ? "bg-blue-500 font-medium"
                                : "text-gray-900"
                            } group flex rounded-md items-center font-medium w-full px-2 py-2 text-sm`}
                          >
                            <Razorpay/>
                          </button>
                        
                        
                      )}
                    </Menu.Item>
                    {/* <Menu.Item>
                      
                      {({ active }) => (
                        <a href="/groups">
                        <button
                          className={`${
                            active ? "bg-blue-500 font-medium" : "text-gray-900"
                          } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                        >
                          Groups
                        </button>
                        </a>
                      )}
                    </Menu.Item> */}
                  </div>
                  <div className="px-1 py-1">
                    <Menu.Item>
                      {({ active }) => (
                        <Link to="/">
                        <button
                          className={`${
                            active ? "bg-blue-500 font-medium" : "text-gray-900"
                          } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                        >
                          Chat with Girls
                        </button>
                        </Link>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <a target="blank" href="https://rzp.io/l/nIHd4hD">
                        <button
                          className={`${
                            active ? "bg-blue-500 font-medium" : "text-gray-900"
                          } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                        >
                         Donate Us
                        </button>
                        </a>
                      )}
                    </Menu.Item>
                  </div>
                  <div className="px-1 py-1">
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={()=>{user? auth.signOut(): history.push('login')} }
                          className={`${
                            active ? "bg-blue-500 font-medium" : "text-gray-900"
                          } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                        >
                        {user? "Logout": "Log In"}  
                        </button>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
              </Dialog>
              </div>
            </Menu>
          </div>
  </div>
  </>
);
}

Header.defaultProps = {};

export default React.memo(Header);