const express = require("express");
const { ethers } = require("ethers");
const app = express();
app.use(express.json());

const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
const contractAddress = process.env.CONTRACT_ADDRESS;
const abi = [
  "function mintPrompt(string memory tokenURI, uint256 royaltyPercentage) public",
];

const contract = new ethers.Contract(contractAddress, abi, wallet);

app.post("/mint", async (req, res) => {
  const { tokenURI, royaltyPercentage } = req.body;

  try {
    const tx = await contract.mintPrompt(tokenURI, royaltyPercentage);
    await tx.wait();
    res.status(200).json({ success: true, transactionHash: tx.hash });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
