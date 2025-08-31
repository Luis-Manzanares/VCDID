import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // <-- 1. Importa FormsModule

import { AppComponent } from './app.component';
import { BlockchainService } from './blockchain.service';
import { LoginComponent } from './login/login.component';
import { CredentialComponent } from './credential/credential.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CredentialComponent
  ],
  imports: [
    BrowserModule,
    FormsModule // <-- 2. Agrégalo a los imports
  ],
  providers: [BlockchainService],
  bootstrap: [AppComponent]
})
export class AppModule { }