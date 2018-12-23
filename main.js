const SHA256 = require('crypto-js/sha256');


//Create the Block class
class Block {
    
    constructor(index, timestamp, data, previousHash = ''){
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
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
        this.difficulty = 5;
    }
    
    createGenesisBlock(){
        
        var currentDate = new Date();
        var day = currentDate.getDate();
        var month = currentDate.getMonth();
        var year = currentDate.getFullYear();
        var genesisDate = `${month}/${day}/${year}`;
        console.log(genesisDate);
        
        return new Block(0, genesisDate, 'Genesis Block', '0');
    }
    
    getLatestBlock(){
        return this.chain[this.chain.length - 1];
    }
    
    addBlock(newBlock){
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.mineBlock(this.difficulty);
        this.chain.push(newBlock);
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

let mycahCoin = new Blockchain();

console.log('Mining block 1...');
mycahCoin.addBlock(new Block(1, '12/24/2018', {amount: 7}));
console.log('Mining block 2...');
mycahCoin.addBlock(new Block(2, '12/25/2018', {amount: 10}));

