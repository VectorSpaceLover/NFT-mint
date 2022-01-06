let fs = require("fs");
let axios = require("axios");

let ipfsArray = [];
let promises = [];

for (let i = 0; i < 10; i++) {
    let paddedHex = i.toString();
    
    promises.push(new Promise( (res, rej) => {
        fs.readFile(`${__dirname}/export/${paddedHex}.png`, (err, data) => {
            if(err) rej(err);
            else{
                ipfsArray.push({
                    path: `images/${paddedHex}.png`,
                    content: data.toString("base64")
                })
                res();
            }
            
        })
    }).catch((error) => {
        console.log(error.message);
    }))
}
Promise.all(promises).then( () => {
    axios.post("https://deep-index.moralis.io/api/v2/ipfs/uploadFolder", 
        ipfsArray,
        {
            headers: {
                "X-API-KEY": '',
                "Content-Type": "application/json",
                "accept": "application/json"
            }
        }
    ).then( (res) => {
        console.log(res.data);
    })
    .catch ( (error) => {
        console.log(error)
    })
}).catch((error) => {
    console.log(error.message);
})