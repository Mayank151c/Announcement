// import logo from './logo.svg';
import './App.css';
import Web3 from 'web3';
import Web3Modal from 'web3modal';
import { useEffect, useState } from 'react';
import Announcement from './compiledContracts/Announcement.json';


function App() {
  const [serverMsg,setServerMsg] = useState('Not Sync with Server')
  const [msg,setMsg] = useState("")

  async function setMessage() {
    const web3modal = new Web3Modal();
    const provider = await web3modal.connect();
    const web3 = new Web3(provider);
    const id = await web3.eth.net.getId();
    const contractAnnouncement = new web3.eth.Contract(Announcement.abi, Announcement.networks[id].address);
    const accounts = await web3.eth.getAccounts();
    contractAnnouncement.methods.setMessage(msg).send({ from: accounts[0] })
    .then(()=>{
      getMessage()
    })
    .catch((e)=>{
      console.log(e);
      
    })
  }
  
  async function getMessage() {
    const web3modal = new Web3Modal();
    const provider = await web3modal.connect();
    const web3 = new Web3(provider);
    const id = await web3.eth.net.getId();
    const contractAnnouncement = new web3.eth.Contract(Announcement.abi, Announcement.networks[id].address);
    const temp = await contractAnnouncement.methods.message().call()
    setServerMsg(temp);
  }
  
  useEffect(() => {
    getMessage();
  }, [])
  
  return (
    <div className="App">
      <marquee style={{width:"300px", backgroundColor:"white",color:"black",fontSize:"25px"}}>{serverMsg}</marquee>
      <header className="App-header">
        <label style={{margin: "12px",height:"20px",fontSize:"30px",padding:"8px"}}>Enter your Announcement</label>
        <input style={{margin: "12px",height:"20px",fontSize:"20px",padding:"8px"}} type="text" onChange={(e)=>setMsg(e.target.value)}/>
        <div>
          <button style={{margin: "12px",padding: "8px",fontSize: "20px",color: "white",backgroundColor: "teal"}} onClick={setMessage}>Change</button>
          <button style={{margin: "12px",padding: "8px",fontSize: "20px",color: "white",backgroundColor: "teal"}} onClick={getMessage}>Refresh</button>
        </div>
      </header>
    </div>
  );
}

export default App;
