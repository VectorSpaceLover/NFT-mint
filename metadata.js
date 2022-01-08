// JavaScript source code
let fs = require("fs");
let axios = require("axios");


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
    fs.writeFileSync(`${__dirname}/metadata.txt`, '', { flag: 'w' });
    for (let i = 1; i < 17050; i++) {
        let jsonName = 'https://ipfs.moralis.io:2053/ipfs/QmT4bzHcwGhArQd3FULxHdbBUwysrkhCdChpT3XUnBdUrL/build/metadata/' + i.toString() + '.json\n';
        try{
            let data = [];
            data.push({
                path: `build/metadata/${i}.json`,
                content: {
                    image: `ipfs://QmWN6QUqLVfXF1wtfnQDSTG4Li7STM3dbpB4dAHaKF47Sj/images/${i}.png`,
                    name: `PokeNFT 1. Generation #${i}`,
                    description: "This PokeNFT is generated with an AI and is part of the world's largest Pokemon NFT collection."
                }
            })
            if(data !== null){
                let res = await uploadData(data);
                console.log(res);
            }
        }catch(err){
            try {
                fs.writeFileSync(`${__dirname}/metadata.txt`, jsonName, { flag: 'a+' });
            } catch (err) {
                console.error('file writing error');
            }
        }
    }
}

startUpload();