import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { ethers } from 'ethers'

declare let window:any

function App () {
  const [balance, setBalance] = useState<string | undefined>()
  const [currentAccount, setCurrentAccount] = useState<string | undefined>()
  const [chainId, setChainId] = useState<number | undefined>()
  const [chainname, setChainName] = useState<string | undefined>()

  useEffect(() => {
    if (!currentAccount || !ethers.utils.isAddress(currentAccount)) return

    if (!window.ethereum) return

    const provider = new ethers.providers.Web3Provider(window.ethereum)
    provider.getBalance(currentAccount).then((result) => {
      setBalance(ethers.utils.formatEther(result))
    })
    provider.getNetwork().then((result) => {
      setChainId(result.chainId)
      setChainName(result.name)
    })
  }, [currentAccount])

  const handleConnect = () => {
    if (!window.ethereum) {
      console.log('please install MetaMask')
      return
    }

    const provider = new ethers.providers.Web3Provider(window.ethereum)

    provider.send('eth_requestAccounts', [])
      .then((accounts) => {
        if (accounts.length > 0) setCurrentAccount(accounts[0])
      })
      .catch((e) => console.log(e))
  }

  const handleDisconnect = () => {
    setBalance(undefined)
    setCurrentAccount(undefined)
  }

  return (
    <div className="App">
      <div>
        <a href="https://reactjs.org" target="_blank" rel="noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>DApp</h1>
      <div className="card">
        {currentAccount
          ? <button type="button" onClick={handleDisconnect}>
              Account:{currentAccount}
            </button>
          : <button type="button" onClick={handleConnect} id="connectButton">
              Connect MetaMask
            </button>
        }
      </div>
      <div className="read-the-docs">
        {currentAccount
          ? <div>
          <h2>Account info</h2>
          <p>ETH Balance of current account: {balance}</p>
          <p>Chain Info: ChainId {chainId} name {chainname}</p>
        </div>
          : <></>
        }
      </div>
    </div>
  )
}

export default App
