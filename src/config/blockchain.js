import { Injectable } from '@angular/core';
import { ethers } from 'ethers';

// Reemplaza con la dirección de tu contrato desplegado en Ganache
const CONTRACT_ADDRESS = '0x741C3134F8eD87ba07fbc5206F26D11E97F69a8b'; 

// URL de tu red de Ganache
const GANACHE_URL = 'http://127.0.0.1:7545';

// El ABI de tu contrato
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

  constructor() {
    this.provider = new ethers.providers.JsonRpcProvider(GANACHE_URL);
    this.contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, this.provider);
  }

  // Función para registrar un DID
  async registerDID(did: string, wallet: ethers.Wallet) {
    const contractWithSigner = this.contract.connect(wallet);
    const tx = await contractWithSigner.registerDID(did);
    await tx.wait();
    console.log('DID registrado exitosamente!');
  }
  
  // Función para obtener un DID
  async getDID(walletAddress: string): Promise<string> {
    const did = await this.contract.getDID(walletAddress);
    return did;
  }
}