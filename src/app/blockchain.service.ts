import { Injectable } from '@angular/core';
import { ethers } from 'ethers';

const CONTRACT_ADDRESS = '0x57c2253C33fB34EDEe7fFC6A98569C537515E21E';
const GANACHE_URL = 'http://127.0.0.1:7545';
const CONTRACT_ABI = [
  "function registerDID(string memory _did) public",
  "function getDID(address _owner) public view returns (string memory)"
];

@Injectable({
  providedIn: 'root'
})
export class BlockchainService {
  private provider: ethers.providers.JsonRpcProvider;
  private contract: ethers.Contract;
  private wallet: ethers.Wallet | null = null;

  constructor() {
    this.provider = new ethers.providers.JsonRpcProvider(GANACHE_URL);
    this.contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, this.provider);
  }

  setWallet(wallet: ethers.Wallet): void {
    this.wallet = wallet;
  }

  async registerDID(did: string): Promise<void> {
    if (!this.wallet) {
      throw new Error("Wallet not set. Please log in first.");
    }
    const contractWithSigner = this.contract.connect(this.wallet);
    const tx = await contractWithSigner['registerDID'](did);
    await tx.wait();
    console.log('DID registrado exitosamente!');
  }

  async getDID(walletAddress: string): Promise<string> {
    const did = await this.contract['getDID'](walletAddress);
    return did;
  }
}