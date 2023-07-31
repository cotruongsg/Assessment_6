const fs = require('fs');
const process = require('process');
const axios = require('axios');
const readline = require('readline');
const url = require('url');


function handleOutput(text, out){
    if (out){
        fs.writeFile(out, text, 'utf8', function() {
              console.log(`wrote to ${out}`);
        });
    }
}

async function getPage(url, out){
    try{       
        let res = await axios.get(url)
        handleOutput(res.data, out);
    }catch(err){
        console.error(`Couldn't download ${out}`);
    }
}


function getlines(textfile){
    const file = readline.createInterface({
        input: fs.createReadStream(textfile),
        output: process.stdout,
        terminal: false
    });
      
    file.on('line', async (line) => {
        let adr = line;
        let q = url.parse(adr, true);
        await getPage(line, q.host);
    });
}

let path = process.argv[2];
getlines(path);