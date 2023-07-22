import React, {useEffect, useState} from 'react'

function VotingStage({factory, rounds, recentVote, connectVotingContract}) {



  return (
    <div className='m-20'>
      VotingStage

      {rounds ? (
        <div className='flex flex-wrap justify-center'>
          {recentVote.map((item, index) => (
            <div className='bg-gray-200 m-3 w-96'>
                {item}
                <button onClick={() => connectVotingContract(item)} className='bg-gray-800 m-2 p-2 rounded text-white'>
                  Go to Vote
                </button>
              </div>
          ))}
        </div>
      ) : (
        <div>
          <h1>Example Rounds</h1>
          {rounds}
        </div>
        )}

        </div>
  )
}

export default VotingStage