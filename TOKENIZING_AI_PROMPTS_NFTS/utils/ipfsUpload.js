const axios = require("axios");
const FormData = require("form-data");
const fs = require("fs");

async function uploadToIPFS(filePath) {
  const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
  const formData = new FormData();
  formData.append("file", fs.createReadStream(filePath));

  const res = await axios.post(url, formData, {
    headers: {
      "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
      pinata_api_key: process.env.PINATA_API_KEY,
      pinata_secret_api_key: process.env.PINATA_SECRET_API_KEY,
    },
  });

  return res.data.IpfsHash;
}

(async () => {
  const hash = await uploadToIPFS("path/to/your/prompt.txt");
  console.log(`Uploaded to IPFS: ${hash}`);
})();
