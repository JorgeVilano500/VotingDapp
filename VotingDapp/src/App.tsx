import { useState, useEffect } from 'react'
import {ethers} from 'ethers'
import './App.css'
import config from './network.json'
import abi from './abis/VotingDappFactory.json'

function App() {
  const [provider, setProvider] = useState(null)
  const [signer, setSigner] = useState(null)
  const [factory, setFactory] = useState(null)
  
  const [owner, setOwner] = useState(null)

  const getEthereumContract = async () => {
    // get provider
    const providers = new ethers.BrowserProvider(window.ethereum);
    setProvider(provider)

    // get network
    const network = await providers.getNetwork()
    if(network.chainId.toString() != "31337") window.alert("Please switch to hardhat node for now");
    
    // get factory 
    const VotingFactory = new ethers.Contract(config.networks[network.chainId], abi, providers);
    setFactory(VotingFactory)
  }

  useEffect(() => {
    let provider = getEthereumContract()
    console.log(provider)
  }, [])

  return (
    <div className="text-center">
      <h1 className='font-semibold my-5'>Welcome to JAVA Studios Voting Dapp</h1>
      <p>First Connect your wallet</p>
      

      
    </div>
  )
}

export default App
