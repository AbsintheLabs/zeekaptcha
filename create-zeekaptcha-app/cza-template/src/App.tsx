import absintheLogo from '/absinthelabs.png'
import './App.css'
import Zeekaptcha from 'zeekaptcha'

function App() {

  return (
    <>
      <div>
        <a href="https://absinthelabs.xyz" target="_blank">
          <img src={absintheLogo} className="logo" alt="Absinthe logo" />
        </a>
      </div>
      <h1>Zeekaptcha</h1>
      <h2>On-Chain Reputation and Sybil Resistance</h2>
      <div className="card">
        <Zeekaptcha />
      </div>
      <p className="read-the-docs">
        Click on the Absinthe logo to learn more
      </p>
    </>
  )
}

export default App
