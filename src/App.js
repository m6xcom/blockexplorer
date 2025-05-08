import { Alchemy, Network } from 'alchemy-sdk';
import { useEffect, useState } from 'react';

import './App.css';

// Refer to the README doc for more information about using API
// keys in client-side code. You should never do this in production
// level code.
const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};


// In this week's lessons we used ethers.js. Here we are using the
// Alchemy SDK is an umbrella library with several different packages.
//
// You can read more about the packages here:
//   https://docs.alchemy.com/reference/alchemy-sdk-api-surface-overview#api-surface
const alchemy = new Alchemy(settings);

function App() {
  const [blockNumber, setBlockNumber] = useState();
  const [blockHash, setBlockHash] = useState();
  const [transactions, setTransactions] = useState([]);
  const [transcationInfo, setTransactionInfo] = useState([]);

  useEffect(() => {
    async function getBlockNumber() {
      setBlockNumber(await alchemy.core.getBlockNumber());
    }

    async function getBlockHash() {
      const block = await alchemy.core.getBlock(blockNumber);
      const hash = block.hash;
      setBlockHash(hash);
    }

    async function getTransactions() {
      const block = await alchemy.core.getBlock(blockNumber);
      const transactions = block.transactions;
      setTransactions(transactions);
    }

    async function getTransactionInfo() {
      const transaction = await alchemy.core.getTransactionReceipt(transactions[0]);
      setTransactionInfo(transaction);
    }

    getBlockNumber();
    getBlockHash();
    getTransactions();
    getTransactionInfo();
  }, []);

  return <div className="App">
    Block Number: {blockNumber}
    <br/>
    Block Hash: {blockHash}
    <br/>
    Transactions: {transactions.length}
    <br/>
    First transaction information:
    <br/>
    from: {transcationInfo.from}
    <br/>
    to: {transcationInfo.to}
    <br/>
    gasUsed: {transcationInfo.gasUsed.toString()}
    <br/>
    blockHash: {transcationInfo.blockHash}
    <br/>
    blockNumber: {transcationInfo.blockNumber}
    <br/>
    transactionHash: {transcationInfo.transactionHash}
    <br/>
    transactionIndex: {transcationInfo.transactionIndex}
    <br/>
    contractAddress: {transcationInfo.contractAddress}
    <br/>
    cumulativeGasUsed: {transcationInfo.cumulativeGasUsed.toString()}
    <br/>
    effectiveGasPrice: {transcationInfo.effectiveGasPrice.toString()}
    <br/>
    logs: {transcationInfo.logs.length}
    <br/>
    status: {transcationInfo.status.toString()}
    <br/>
    type: {transcationInfo.type.toString()}
    <br/>
    confirmations: {transcationInfo.confirmations.toString()}
  </div>;
}

export default App;
