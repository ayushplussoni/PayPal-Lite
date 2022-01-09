import { useState } from 'react';
const PayPalLite=()=>
{

const [activeUser,setactiveUser]=useState("");
const [activeUserName,setactiveUserName]=useState("");
const [password,setpassword]=useState("");
const [balanceAmount,setBalanceAmount]=useState("0");
const [receiver,setreceiver]=useState("");
const [amount,setamount]=useState("");
const [pin,setpin]=useState("facebook");
const [message,setmessage]=useState("");

const login= async ()=>
{
  const username=document.getElementById("username").value;
  const password=document.getElementById("password").value;
  const url="http://localhost:5000/login/";
  let api=url.concat(username).concat("/").concat(password);
  const res =  await fetch(api,{method:"POST"});
  const data = await res.text();
  var obj = JSON.parse(data);
  console.log(api);
  const loginAction=()=>
  {setactiveUser(obj.username);setpassword(obj.password);setactiveUserName(obj.name)}
  loginAction();
}

const balance= async ()=>
  {
  const url="http://localhost:5000/balance/";
  let api=url.concat(activeUser);
  const res =  await fetch(api,{method:"POST"});
  const data = await res.text();
  var obj = JSON.parse(data);
  const balanceAction=()=>{setBalanceAmount(obj.balance)}
  balanceAction();
  }

   const transaction= async ()=>
  {
  const amount=document.getElementById("amount").value;
  const receiver=document.getElementById("receiver").value;
  const pin=document.getElementById("pin").value;
  const setParameters=()=>{setamount(amount);setreceiver(receiver);setpin(pin);}
  setParameters();
  const url="http://localhost:5000/transaction/";
  let api=url.concat(activeUser).concat("/").concat(receiver).concat("/").
  concat(amount).concat("/").concat(pin).concat("/").concat(balanceAmount).concat("/").concat(password);
  console.log(api);
  const res =  await fetch(api,{method:"POST"});
  const data = await res.text();
  const transactionAction=()=>{setmessage(data);}
  transactionAction();
  }

  return<div>
  <div>
      
        <div id="title">PayPal Lite</div><br /><br />
    </div>
<label htmlFor="username" className="input-label">Username</label>
          <input type="text" id="username" name="username" className="input-field" /><br /><br />
          <label htmlFor="password" className="input-label">Password </label>
          <input type="password" id="password" name="password" className="input-field" /><br /><br />
  <div className="input-label" style={{ visibility: activeUserName!=""? 'visible': 'hidden'}}>
        Hey , Mr {activeUserName}</div><br/>
        <br />
        <button 
 className="button" onClick={login}>Log-In</button><br/><br/>
 <div>
        <div id="balance-segment" className="sub-title">Account Enquiry</div><br />
        <button className="button" onClick={balance}>Check Balance </button><br /> <br />
        <div className="input-label" style={{ visibility: balanceAmount!=0? 'visible': 'hidden'}}>
        Current Balance: $ {balanceAmount}
        </div><br /></div>
        <div>
        <div id="transaction-segment" className="sub-title">Make Payment</div><br />
          <label htmlFor="username" className="input-label">Username</label>
          <input type="text" id="receiver" name="username" className="input-field" /><br />
          <label htmlFor="amount" className="input-label">Amount</label>
          <input type="text" id="amount" name="amount" className="input-field" /><br />
          <label htmlFor="password" className="input-label">PIN</label>
          <input type="password" id="pin" name="pin" className="input-field" /><br /><br />
          <button className="button" onClick={transaction}> Pay Now </button><br /><br />
         <div className="input-label" >
         {message}
         </div><br/>
      </div>
        </div>
}
    export default Login;


