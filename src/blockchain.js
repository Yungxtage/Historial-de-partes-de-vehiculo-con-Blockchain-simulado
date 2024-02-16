const SHA256 = require("crypto-js/sha256");

class Block {
  constructor(index, data, previousHash = "") {
    this.index = index; // Posición que ocupa
    this.date = new Date(); // Fecha en la que se crea
    this.data = data; // Información que del Bloque
    this.previousHash = previousHash; // El Hash Anterior
    this.hash = this.createHash(); // Hash de este bloque
    this.nonce = 0; // Grado de dificultad
  }
  createHash() {
    return SHA256(
      this.index + this.date + this.data + this.previousHash + this.nonce
    ).toString();
  }
  mine(difficulty) {
    //startsWith() indica si una cadena de texto comienza con los caracteres de una
    // cadena de texto concreta, devolviendo true o false
    while (!this.hash.startsWith(difficulty)) {
      this.nonce++;
      this.hash = this.createHash();
    }
  }
}

class BlockChain {
  constructor(genesis, difficulty = "00") {
    this.chain = [this.createFirstBlock(genesis)];
    this.difficulty = difficulty;
  }
  createFirstBlock(genesis) {
    return new Block(0, genesis);
  }
  getLastBlock() {
    return this.chain[this.chain.length - 1];
  }

  addBlock(data) {
    let prevBlock = this.getLastBlock();
    let block = new Block(prevBlock.index + 1, data, prevBlock.hash);
    block.mine(this.difficulty);
    console.log("Minado! " + block.hash + " con nonce " + block.nonce);
    this.chain.push(block);
  }
}

module.exports = BlockChain