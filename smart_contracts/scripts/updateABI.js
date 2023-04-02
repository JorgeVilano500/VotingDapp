// const basePath = process.cwd();
const fs = require('fs')
const path = require('path')
 
function main() {
    
// path.resolve and __dirname allow us to find the file through absolute path
let readABI = fs.readFileSync(path.resolve(__dirname, `../artifacts/contracts/VotingDapp.sol/VotingDappFactory.json`))
// turn the json into a javascript object
let data = JSON.parse(readABI)
// then chose the file we want to write into and write the abi
fs.writeFileSync(path.resolve(__dirname, `../../VotingDapp/src/abis/VotingDappFactory.json` ), JSON.stringify(data.abi))


console.log('ABI is updated')

}

main();