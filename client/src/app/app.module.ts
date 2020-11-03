import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NavigationComponent } from './components/navigation/navigation.component';
import { GeneralChatComponent } from './components/general-chat/general-chat.component';
import { SecretChatComponent } from './components/secret-chat/secret-chat.component';

const config: SocketIoConfig = { url: "http://localhost:3000", options: {} };
@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    GeneralChatComponent,
    SecretChatComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    SocketIoModule.forRoot(config),
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
