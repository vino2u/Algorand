/* global AlgoSigner */
import logo from './logo.svg';
import './App.css';


const connect = () =>
{
  AlgoSigner.connect()
  .then((d) => {
    const algosdk = require('algosdk');
    const token = {
        'X-API-Key': 'LGPjbAIwO23nVUZFNwkdd2cOb8UTd6ac99Z0xkrR'
    }
    const baseServer = 'https://testnet-algorand.api.purestake.io/ps2';
    const port = '';

    const algodClient = new algosdk.Algodv2(token, baseServer, port);
    console.log("Connected ...")
  })
  .catch((e) => {
    console.error(e);
  });
}

let signedTxs;

const getAccounts = () =>
{
  const algosdk = require('algosdk');
  const token = {
      'X-API-Key': 'LGPjbAIwO23nVUZFNwkdd2cOb8UTd6ac99Z0xkrR'
  }
  const baseServer = 'https://testnet-algorand.api.purestake.io/ps2';
  const port = '';

  const algodClient = new algosdk.Algodv2(token, baseServer, port);
  
  algodClient.healthCheck().do()
  .then(d => { 
    AlgoSigner.accounts({
      ledger: 'TestNet'
    })
    .then((d) => {
      let accounts = d;
      console.log("Accounts", accounts);
      algodClient.getTransactionParams().do()
      .then((d) => {
        let txParamsJS = d;
        console.log("txParamsJS", txParamsJS);
        const txn = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
          from: accounts[0].address,
          to:  accounts[1].address,
          amount: 100000,
          note: undefined,
          suggestedParams: {...txParamsJS}
        });
        
        // Use the AlgoSigner encoding library to make the transactions base64
        let txn_b64 = AlgoSigner.encoding.msgpackToBase64(txn.toByte());
        
        AlgoSigner.signTxn([{txn: txn_b64}])
        .then((d) => {
         signedTxs = d;
         console.log("signedTxs", signedTxs);
        })
        .catch((e) => {
            console.error(e);
        });
      })
      .catch((e) => {
        console.error(e);
      });      
    })
    .catch((e) => {
      console.error(e);
    });
  })
  .catch(e => { 
    console.error(e); 
  });
} 

const send = () =>
{
  AlgoSigner.send({
    ledger: 'TestNet',
    tx: signedTxs[0].blob
  })
  .then((d) => {
    let tx = d;
    console.log("Transaction Id", tx);
  })
  .catch((e) => {
    console.error(e);
  });
}

function App() {
  return (
    <div className="App">
      <button  onClick={()=>connect()}>Connect</button>
      <button  onClick={()=>getAccounts()}>Accounts</button>
      <button  onClick={()=>send()}>Send</button>
    </div>
  );
}

export default App;
