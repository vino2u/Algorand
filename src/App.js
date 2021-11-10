/* global AlgoSigner */
import logo from './logo.svg';
import './App.css';

let signedTxs;

const connect = () =>
{
    AlgoSigner.connect()
.then((d) => {
  const algosdk = require('algosdk');

  const token = {
   'X-API-Key': 'pOD5BAUCxq7InVPjo0sO01B0Vq4d7pD1ask5Ix43'
  }
  const server = "https://testnet-algorand.api.purestake.io/ps2";   
  const port = '';

  let algodclient = new algosdk.Algodv2(token, server, port);
  console.log("Connected");
})
.catch((e) => {
  console.error(e);
});
}

const sdk_check = () =>
{
  
    AlgoSigner.connect()
.then((d) => {
  const algosdk = require('algosdk');

  const token = {
   'X-API-Key': 'pOD5BAUCxq7InVPjo0sO01B0Vq4d7pD1ask5Ix43'
  }
  const server = "https://testnet-algorand.api.purestake.io/ps2";   
  const port = '';

  let algodclient = new algosdk.Algodv2(token, server, port);
  algodclient.healthCheck().do()
.then(d => { 
  console.log(JSON.stringify(d));
})
.catch(e => { 
  console.error(e); 
});
})
.catch((e) => {
  console.error(e);
});
}

const getAccounts = () =>
{
  const algosdk = require('algosdk');

  const token = {
    'X-API-Key': 'pOD5BAUCxq7InVPjo0sO01B0Vq4d7pD1ask5Ix43'
   }
   const server = "https://testnet-algorand.api.purestake.io/ps2";   
   const port = '';
 
   let algodclient = new algosdk.Algodv2(token, server, port);
  algodclient.healthCheck().do()
  .then(d => { 
    console.log(JSON.stringify(d));
    AlgoSigner.accounts({
      ledger: 'TestNet'
    })
    .then((d) => {
      let accounts = d;
      console.log("Your wallet accounts = ", accounts);
    })
    .catch((e) => {
      console.error(e);
    });
  })
  .catch(e => { 
    console.error(e); 
  });
}

const signTrans = () =>
{
  const algosdk = require('algosdk');

  const token = {
    'X-API-Key': 'pOD5BAUCxq7InVPjo0sO01B0Vq4d7pD1ask5Ix43'
   }
   const server = "https://testnet-algorand.api.purestake.io/ps2";   
   const port = '';
 
   let algodclient = new algosdk.Algodv2(token, server, port);
   algodclient.healthCheck().do()
   .then(d => { 
     console.log(JSON.stringify(d));
     AlgoSigner.accounts({
       ledger: 'TestNet'
     })
     .then((d) => {
       let accounts = d;
       console.log("Your wallet accounts = ", accounts);
       algodclient.getTransactionParams().do()
.then((d) => {
  let txParamsJS = d;
  const txn = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
    from: accounts[0].address,
    to: accounts[1].address,
    amount: 1000000,
    note: undefined,
    suggestedParams: {...txParamsJS}
  });
  
  // Use the AlgoSigner encoding library to make the transactions base64
  let txn_b64 = AlgoSigner.encoding.msgpackToBase64(txn.toByte());
  
  AlgoSigner.signTxn([{txn: txn_b64}])
  .then((d) => {
    signedTxs = d;
    console.log("Sign", signedTxs);
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
    let txID = d;
    console.log("transaction ID = ", txID);
  })
  .catch((e) => {
    console.error(e);
  });
} 









function App() {
  return (
    <div className="App">
      <button onClick={()=>connect()}>connect</button> <br />
      <button onClick={()=>sdk_check()}>sdk check</button>    <br />
      <button onClick={()=>getAccounts()}>Get Accounts</button> <br />
      <button onClick={()=>signTrans()}>sign</button><br />
      <button onClick={()=>send()}>send</button><br />
    </div>
  );
}

export default App;
