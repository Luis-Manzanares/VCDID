import { Component, Input, OnInit } from '@angular/core';
import { BlockchainService } from '../blockchain.service';
import { ethers } from 'ethers';

@Component({
  selector: 'app-credential',
  templateUrl: './credential.component.html',
  styleUrls: ['./credential.component.css']
})
export class CredentialComponent implements OnInit {
  @Input() walletAddress: string = '';
  credentialData: string = '';
  retrievedDID: string = '';
  errorMessage: string = '';

  constructor(private blockchainService: BlockchainService) { }

  ngOnInit(): void {
  }

  async createCredential(): Promise<void> {
    this.errorMessage = '';
    try {
      const did = `did:ethr:${this.walletAddress}`;
      await this.blockchainService.registerDID(did);
      console.log('Credencial registrada en la blockchain.');
      this.retrievedDID = ''; // Limpiamos el campo si se crea una nueva
    } catch (error) {
      this.errorMessage = 'Error al registrar la credencial. Por favor, revisa la consola.';
      console.error(error);
    }
  }

  async getDIDFromBlockchain(): Promise<void> {
    this.errorMessage = '';
    this.retrievedDID = '';
    try {
      const did = await this.blockchainService.getDID(this.walletAddress);
      this.retrievedDID = did;
    } catch (error) {
      this.errorMessage = 'No se pudo recuperar el DID. Asegúrate de haberlo registrado primero.';
      console.error(error);
    }
  }

}