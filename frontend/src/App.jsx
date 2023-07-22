import { useState, useEffect } from 'react'
import {ethers} from 'ethers'
import './App.css'
import config from './network.json'
import abi from './abis/VotingDappFactory.json'
import votingStage from './abis/VotingStage.json'
import HomePage from './components/HomePage'
import VotingStage from './components/VotingStage'


function App() {
  const [provider, setProvider] = useState(null)
  const [signer, setSigner] = useState(null)
  const [factory, setFactory] = useState(null)
  const [rounds, setRounds] = useState(0)
  const [recentVote, setRecentVote] = useState([])
  const [currentVote, setCurrentVote] = useState('')
  const [votingFactoryStage, setVotingFactoryStage] = useState(null)


  
  const [owner, setOwner] = useState(null)

  const getEthereumContract = async () => {
    // set the provider
    const providers = new ethers.BrowserProvider(window.ethereum);
    setProvider(providers)

    // get the network 
    const network = await providers.getNetwork();
    if(network.chainId != "31337") window.alert("Please switch to Hardhat node for now")

    // get the factory 

    const VotingFactory = new ethers.Contract(config.networks[network.chainId], abi, providers)
    setFactory(VotingFactory)
  }
  const connectWallet = async () => {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
    .catch((err) => {
      if (err.code === 4001) {
        // EIP-1193 userRejectedRequest error
        // If this happens, the user rejected the connection request.
        console.log('Please connect to MetaMask.');
      } else {
        console.error(err);
      }
    });
  const account = accounts[0];
    setOwner(account)

    const totalRounds = await factory.totalRounds()  
    setRounds(totalRounds)

    for (let i = 1; i < totalRounds ; i++ ) {
      const votingContract = await factory.votingHistory(i)
      setRecentVote(prev => [votingContract, ...prev])
    }

  }

  const connectVotingContract = async (address) => {
    const network = await provider.getNetwork();
    // will install another warning here 
    if(network.chainId != '31337') window.alert("Please go to harhat node for now")

    const VotingStage = new ethers.Contract(address, votingStage, provider) 
    console.log(VotingStage)

    // this will open a modal now for this contract 

  }
 

  useEffect(() => {
     getEthereumContract()
    //  getVotingList()
    connectWallet();
  }, [owner])

  return (
    <div className="text-center">
      <h1 className='font-semibold my-5'>Welcome to JAVA Studios Voting Dapp</h1>
     
      {owner ? (
        // when the person is connected to the right network and contract
        <HomePage
          factoryAddress={factory.target}
          factory={factory}
          provider={provider}
          owner={owner}
          rounds={rounds}
          recentVote={recentVote}
          setRecentVote={setRecentVote}
          />
        
      ) :(<div>
         <p>First Connect your wallet or to the correct network</p>
         <button className='bg-gray-200 p-6 m-3 rounded' onClick={() => connectWallet()}>Connect</button>
      </div>)}

      {/* {provider ? (<h1>Hello</h1>) : (<h1>without</h1>)} */}

        <VotingStage
          factory={factory}
          rounds={rounds}
          recentVote={recentVote}
          connectVotingContract={connectVotingContract}
        />
      
    </div>
  )
}

export default App
