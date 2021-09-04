import { Dialog, Transition } from "@headlessui/react";
import axios from "axios";
import React, { Fragment, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getPremium } from "../../features/userSlice";
import Razorpay from "../Razorpay";
import "./Chatting.css";
import defaultuser from "./defaultuser.png"
interface props{
}
const Chatting: React.FC<props> = () =>{
    const premium=useSelector(getPremium);
    const [num,setNum]=useState(0);
    const [typing, settyping]=useState(false);
    const [inp, setinp] = useState("");
    const PERSON_IMG = defaultuser;
    //console.log("image");
    //let BOT_IMG = "";
    const [BOT_IMG,setBOT_IMG]=useState("")
    const[ BOT_NAME,setBOT_NAME]=useState("");
    const PERSON_NAME = "You";
    const msgerChat=useRef<HTMLDivElement>(null);
    const Name=useRef<HTMLDivElement>(null);
    const Dates=useRef<HTMLDivElement>(null);
    const myDiv=useRef<HTMLDivElement>(null);
    let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }
    
useEffect(()=>{
    
    fetch("https://randomuser.me/api/?gender=female")
    .then((response) => response.json())
    .then(function (data) {
        console.log(data);
        if (Dates.current){
        Dates.current.innerHTML = formatDate(
            new Date()
        );}
        setBOT_NAME( data.results[0].name.first);
        if(Name.current){
            Name.current.innerHTML = data.results[0].name.first;
        
        }
        setBOT_IMG (JSON.stringify(data.results[0].picture.large));
        if(myDiv.current){
            myDiv.current.style.backgroundImage = `url(${JSON.stringify(data.results[0].picture.large) })`;}
    });
    
},[])

function appendMessage(name: any, img: any, side: string, text: string) {
    //   Simple solution for small apps
    const msgHTML = `
<div class="msg ${side}-msg">
  <img class="msg-img" src=${img} / >
  <div class="msg-bubble">
    <div class="msg-info">
      <div class="msg-info-name">${name}</div>
      <div class="msg-info-time">${formatDate(new Date())}</div>
    </div>

    <div class="msg-text">${text}</div>
  </div>
</div>
`;
if (msgerChat.current){
    msgerChat.current.insertAdjacentHTML("beforeend", msgHTML);
    msgerChat.current.scrollTop += 500;}
}



    const handlechange = (event: any) => {
       
        setinp(event.target.value );
        console.log(inp);
      };
  function  submitted(e:any) {
        e.preventDefault();
        appendMessage(PERSON_NAME, PERSON_IMG, "right", inp);
        setinp("");
        botResponse(inp);
        console.log("handle request ");
    }
    function formatDate(date:any) {
        const h = "0" + date.getHours();
        const m = "0" + date.getMinutes();

        return `${h.slice(-2)}:${m.slice(-2)}`;
    }
    function botResponse(rawText:string) {
        //console.log(BOT_IMG);
        // Bot Response
        setNum((num)=>num+1);
        if (num>=15 && !premium ){
            openModal()
         }
        axios.get("https://chaljaabhai.azurewebsites.net/get", {headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "X-Requested-With"
            },params:{ msg: rawText }}).then(function (data) {
            console.log(rawText);
            console.log(data);
            const msgText = data.data;
            console.log(BOT_IMG);
            settyping(true);
            setTimeout(()=>{
                settyping(false);
                appendMessage(BOT_NAME, BOT_IMG, "left", msgText);
            },1200);
            
        });
    }

return(
  <div className="msger -mt-10  mx-4 ">
            <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={openModal}
        >
                  <Dialog.Overlay className="fixed inset-0 bg-black opacity-60" />

          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Limit Reached for Free account
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    You can talk limited with a free account,buy our premium to talk unlimited
                  </p>
                </div>

                <div className="mt-4">
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium  border border-transparent rounded-md  focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                    // onClick={ ()=> history.push}
                  >
                      <Razorpay/>
                    
                  </button>
                  <a href="/">
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"                    // onClick={ ()=> history.push}
                  >

                      Cancel
                  </button>
                  </a>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
            <div className="msger-header ">
                <div className="msger-header-title font-bold">
                    <i className="fas fa-female"></i> Chatting Application,Dont use slangs like "u" for "you",use proper English  ,don't use other languages like hindi or german.
                    <i className="fas fa-female"></i>
                </div>
            </div>

            <main className="msger-chat" ref={msgerChat}>
                <div className="msg left-msg">
                    <div
                        className="msg-img"
                        id="myDiv"
                        ref={myDiv}
                        
                    ></div>

                    <div className="msg-bubble">
                        <div className="msg-info">
                            <div className="msg-info-name" id="name" ref={Name}></div>
                            <div className="msg-info-time" id="date" ref={Dates}></div>
                        </div>

                        <div className="msg-text">Hi,😄</div>
                    </div>
                </div>
            </main>
{ typing? <div className="ml-5 m-2"> {BOT_NAME} is Typing</div> : <div></div>}
            <form className="msger-inputarea">
                <input
                    type="text"
                    className="msger-input"
                    id="textInput"
                    placeholder="Enter your message..."
                    onChange={handlechange}
                    value={inp}
                    
                />
                <button  type="submit" onClick={(e)=>submitted(e)} className="msger-send-btn">Send</button>
            </form>
        </div>
        

    
);
}

Chatting.defaultProps = {};

export default React.memo(Chatting);


