// JavaScript source code
let fs = require("fs");
let axios = require("axios");
const { nextTick } = require("process");

const readFile = (paddedHex) => new Promise((resolve, reject) => {
    let ipfsArray = [];
    fs.readFile(`${__dirname}/export/${paddedHex}.png`, (err, data) => {
        if(err) reject(null);
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
            maxContentLength: 100000000,
            maxBodyLength: 1000000000
            
        }
    ).then((res) => {
        resolve(res.data);
    }).catch((error) => {
        reject(error);
    })
})

async function uploadData(data) {
    let stringData = JSON.stringify(data);
    let resp = await axios({
        method: 'post',
        url: 'https://deep-index.moralis.io/api/v2/ipfs/uploadFolder',
        data: stringData,
        headers: { "X-API-KEY": 'm0aH1Oo8Lve5wlBT3go1ZOCs3c3sm7MaHaZUIDSx84YbI09z1YrL0mfKsC1tBI3B', 'Accept': 'application/json', 'Content-Type': 'application/json' },
        maxContentLength: 100000000,
        maxBodyLength: 1000000000
    }).catch(err => {
        throw err;
    })
    return resp.data;
}

async function startUpload(){
    fs.writeFileSync(`${__dirname}/log.txt`, '', { flag: 'w' });
    for (let i = 1; i < 10; i++) {
        let imagename = i.toString() + '.png\n';
        
        try{
            let data = await readFile(i.toString());
            if(data !== null){
                let res = await uploadData(data);
                console.log(res);
            }
        }catch(err){
            try {
                fs.writeFileSync(`${__dirname}/log.txt`, imagename, { flag: 'a+' });
            } catch (err) {
                console.error('file writing error');
            }
        }
    }
}

startUpload();