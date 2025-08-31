import { Component, Output, EventEmitter } from '@angular/core';
import { ethers } from 'ethers';
import { BlockchainService } from '../blockchain.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  walletId: string = '';
  seedPhrase: string = '';
  errorMessage: string = '';

  @Output() loginSuccess = new EventEmitter<string>();

  constructor(private blockchainService: BlockchainService) { }

  async onLogin(): Promise<void> {
    this.errorMessage = '';

    try {
      const provider = new ethers.providers.JsonRpcProvider('http://127.0.0.1:7545');
      const wallet = new ethers.Wallet(this.seedPhrase, provider);

      if (wallet.address.toLowerCase() !== this.walletId.toLowerCase()) {
        throw new Error('El ID de la cartera o la clave privada son incorrectos.');
      }

      this.blockchainService.setWallet(wallet);
      
      this.loginSuccess.emit(wallet.address);

    } catch (error: any) {
      this.errorMessage = 'Credenciales no válidas. Por favor, revisa la información e intenta de nuevo.';
      console.error(error);
    }
  }
}