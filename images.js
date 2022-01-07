// JavaScript source code
let fs = require("fs");
let axios = require("axios");

let ipfsArray = [];
let promises = [];

for (let i = 1; i < ; i++) {
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
Promise.all(promises).then(() => {
    axios.post("https://deep-index.moralis.io/api/v2/ipfs/uploadFolder",
        ipfsArray,
        {
            headers: {
                "X-API-KEY": 'm0aH1Oo8Lve5wlBT3go1ZOCs3c3sm7MaHaZUIDSx84YbI09z1YrL0mfKsC1tBI3B',
                "Content-Type": "application/json",
                "accept": "application/json"
            },
            maxContentLength: 100000000,
            maxBodyLength: 1000000000
        }
    ).then((res) => {
        console.log('error');
    }).catch((error) => {
        console.log('error12')
    })
})