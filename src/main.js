const EC = require('elliptic').ec;
const ec = new EC('secp256k1');
const {Blockchain, Transaction} = require('./blockchain');

const myKey = ec.keyFromPrivate('f53113bf37969600b0349c706023d26bd0920f03e39adacbae8ee0e4f81c5b28');
const myWalletAddress = myKey.getPublic('hex');

let sadBoiCoin = new Blockchain();

const tx1 = new Transaction(myWalletAddress, 'Somone\'s Public key', 10);
tx1.signTransaction(myKey);
sadBoiCoin.addTransaction(tx1);


console.log('\nStarting the miner...');
sadBoiCoin.minePendingTransactions(myWalletAddress);

console.log('\nBalance for Mycah is', sadBoiCoin.getBalanceOfAddress(myWalletAddress));




