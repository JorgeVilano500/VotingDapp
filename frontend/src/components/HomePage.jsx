import React from 'react'
import {ethers} from 'ethers'

function HomePage({factoryAddress, factory, provider, owner, rounds, recentVote, setRecentVote}) {
    const onSubmit = async (e) => {
        e.preventDefault()
        const firstC = e.target[0].value
        const secondC = e.target[1].value
        const thirdParty = e.target[2].value

        const signer = await provider.getSigner()

        const transact = await factory.connect(signer).createVote(firstC, secondC, thirdParty, {value: ethers.parseUnits('1', 'ether')})
        console.log(transact)
        await transact.wait()
        console.log(`successful hash: ${transact.hash}`)

        const votingContract = await factory.votingHistory(rounds);

        setRecentVote(prev => [votingContract, ...prev])

    }

  return (
    <div className='m-auto bg-gray-200 p-20 w-[75%] group'>
        <h1 className='mb-4'>You are connected to {factoryAddress}</h1>
        <h1>Welcome {owner}</h1>

        <form className='flex flex-col place-items-center' onSubmit={onSubmit}>
            <label className='p-4 flex flex-col w-96'>
                First Candidate:
                <input className='p-2'  type='text' placeholder='Add Person 1' name='firstC' />
            </label>
            
            <label className='p-4 flex flex-col w-96'>
                Second Candidate: 
                <input className='p-2'  type='text' placeholder='Add Person 1' name='secondC' />
            </label>
            <label className='p-4 flex flex-col w-96'>
                Third Party to Keep track 
                <input className='p-2'  type='text' placeholder='Add Person 1' name='thirdParty' />
            </label>
            <input className='bg-gray-600 p-4 rounded-md group-hover:text-gray-100  hover:cursor-pointer' type='submit' value='Submit'  />
        </form>
    </div>
  )
}

export default HomePage

// pattern={`/^0x[a-fA-F0-9]{40}$/gm`}
// pattern={`/^0x[a-fA-F0-9]{40}$/gm`}
// pattern={`/^0x[a-fA-F0-9]{40}$/gm`}