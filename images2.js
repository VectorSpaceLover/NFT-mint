// JavaScript source code
let fs = require("fs");
let axios = require("axios");

const readFile = (paddedHex) => new Promise((resolve, reject) => {
    let ipfsArray = [];
    fs.readFile(`${__dirname}/build/images/${paddedHex}.png`, (err, data) => {
        if(err) reject(err);
        else{
            ipfsArray.push({
                path: `images/${paddedHex}.png`,
                content: data.toString("base64")
            })
            resolve(ipfsArray);
        }
    })
});

const uploadImage = (data) => new Promise((resolve, reject) => {
    axios.post("https://deep-index.moralis.io/api/v2/ipfs/uploadFolder",
        data,
        {
            headers: {
                "X-API-KEY": 'm0aH1Oo8Lve5wlBT3go1ZOCs3c3sm7MaHaZUIDSx84YbI09z1YrL0mfKsC1tBI3B',
                "Content-Type": "application/json",
                "accept": "application/json"
            },
        }
    ).then((res) => {
        console.log(res.data);
        resolve();
    }).catch((error) => {
        reject(error);
    })
})


async function startUpload(){

    for (let i = 1; i < 17051; i++) {
        let paddedHex = i.toString();
    
        let data = await readFile(paddedHex);

        await uploadImage(data);
    }
    
}

startUpload();