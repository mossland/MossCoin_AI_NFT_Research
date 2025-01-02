import { ethers } from "ethers";

async function connectWallet() {
  if (window.ethereum) {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    console.log("Connected wallet address:", await signer.getAddress());
  } else {
    alert("Install Metamask!");
  }
}
