const SHA256 = require('crypto-js/sha256');

//Create a Transaction class
class Transaction{
    constructor(fromAddress, toAddress, amount){
        this.fromAddress = fromAddress;
        this.toAddress = toAddress;
        this.amount = amount;
    }
}


//Create the Block class
class Block {
    
    constructor(timestamp, transactions, previousHash = ''){
        this.timestamp = timestamp;
        this.transactions = transactions;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
        this.nonce = 0;
    }
    
    calculateHash(){
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data) + this.nonce).toString();
    }
    
    mineBlock(difficulty){
        while(this.hash.substring(0, difficulty) !== Array(difficulty + 1).join('0')){
            this.nonce++;
            this.hash = this.calculateHash();
        }
        
        console.log(`Block mined: ${this.hash}`);
    }
    
}

//Creat the Blockchain class
class Blockchain{
    
    constructor(){
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 3;
        this.pendingTransactions = [];
        this.miningReward = 100;
    }
    
    createGenesisBlock(){
        
        var currentDate = new Date();
        var day = currentDate.getDate();
        var month = currentDate.getMonth();
        var year = currentDate.getFullYear();
        var genesisDate = `${month}/${day}/${year}`;
        console.log(genesisDate);
        
        return new Block(genesisDate, 'Genesis Block', '0');
    }
    
    getLatestBlock(){
        return this.chain[this.chain.length - 1];
    }
    
    minePendingTransactions(miningRewardAddress){
        let block = new Block(Date.now(), this.pendingTransactions);
        block.mineBlock(this.difficulty);
        
        console.log('Block has been mined successfully!');
        this.chain.push(block);
        
        this.pendingTransactions = [
            new Transaction(null, miningRewardAddress, this.miningReward)
        ]
    }
    
    createTransaction(transaction){
        this.pendingTransactions.push(transaction);
    }
    
    getBalanceOfAddress(address){
        let balance = 0;
        
        for(const block of this.chain){
            for(const trans of block.transactions){
                if(trans.fromAddress === address){
                    balance -= trans.amount;
                }
                
                if(trans.toAddress === address){
                    balance += trans.amount;
                }
            }
        }
        
        return balance;
    }
    
    isChainValid(){
        
        for(let i = 1; i < this.chain.length; i++){
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];
            
            //Retest the Block hash
            if(currentBlock.hash !== currentBlock.calculateHash()){
                return false;
            }
            
            //Make sure the block points to the correct previous block
            if(currentBlock.previousHash !== previousBlock.hash){
                return false;
            }
        }
        
        return true;
        
    }
    
}

let sadBoiCoin = new Blockchain();

sadBoiCoin.createTransaction(new Transaction('address1', 'address2', 30));
sadBoiCoin.createTransaction(new Transaction('address2', 'address1', 14));

console.log('\nStarting the miner...');
sadBoiCoin.minePendingTransactions('Mycah-Address');

console.log('\nBalance for Mycah is', sadBoiCoin.getBalanceOfAddress('Mycah-Address'));

console.log('\nStarting the miner again...');
sadBoiCoin.minePendingTransactions('Mycah-Address');

console.log('\nBalance for Mycah is', sadBoiCoin.getBalanceOfAddress('Mycah-Address'));



