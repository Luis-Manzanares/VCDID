import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isLoggedIn: boolean = false;
  walletAddress: string = '';

  constructor() {}

  onLoginSuccess(walletAddress: string): void {
    this.isLoggedIn = true;
    this.walletAddress = walletAddress;
  }
}