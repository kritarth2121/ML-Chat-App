import axios, { AxiosResponse } from "axios";
import React, { useEffect, useRef, useState } from "react";
import "./Chatting.css";
import defaultuser from "./defaultuser.png"
interface props{
}

const Chatting: React.FC<props> = () =>{
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
        axios.get("http://ec2-65-0-110-124.ap-south-1.compute.amazonaws.com:8080/get", {headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "X-Requested-With"
            },params:{ msg: rawText }}).then(function (data) {
            console.log(rawText);
            console.log(data);
            const msgText = data.data;
            console.log(BOT_IMG);
            appendMessage(BOT_NAME, BOT_IMG, "left", msgText);
        });
    }

return(
<div className="bb relative mt-14" >
  <div className="msger -mt-10   ">
            <div className="msger-header ">
                <div className="msger-header-title">
                    <i className="fas fa-female"></i> Chatting Application
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
        


         </div>
);
}

Chatting.defaultProps = {};

export default React.memo(Chatting);


