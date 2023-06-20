// const basePath = process.cwd();
const fs = require('fs')
const path = require('path')

const paths = ['../artifacts/contracts/VotingDappFactory.sol/VotingDappFactory.json', '../artifacts/contracts/VotingDappDeployer.sol/VotingDappDeployer.json', '../artifacts/contracts/VotingStage.sol/VotingStage.json',]
const frontendPaths = [ '../../frontend/src/abis/VotingDappFactory.json', '../../frontend/src/abis/VotingDappDeployer.json', '../../frontend/src/abis/VotingStage.json']
const votingPaths = ['../../VotingDapp/src/abis/VotingDappFactory.json', '../../VotingDapp/src/abis/VotingDappDeployer.json', '../../VotingDapp/src/abis/VotingStage.json']


function main() {

    for (i = 0; i < paths.length; i++ ) {
        console.log(paths[i])
        // path.resolve and __dirname allow us to find the file through absolute path
        let readABI = fs.readFileSync(path.resolve(__dirname, paths[i]))
        // turn the json into a javascript object
        let data = JSON.parse(readABI)
        // then chose the file we want to write into and write the abi
        fs.writeFileSync(path.resolve(__dirname, frontendPaths[i] ), JSON.stringify(data.abi))

    }

    for (i = 0; i < paths.length; i++ ) {
        console.log(paths[i])
        // path.resolve and __dirname allow us to find the file through absolute path
        let readABI = fs.readFileSync(path.resolve(__dirname, paths[i]))
        // turn the json into a javascript object
        let data = JSON.parse(readABI)
        // then chose the file we want to write into and write the abi
        fs.writeFileSync(path.resolve(__dirname, votingPaths[i] ), JSON.stringify(data.abi))

    }
    


console.log('ABI is updated')

}

main();