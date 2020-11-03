import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Socket } from 'ngx-socket-io';
import { Authorization } from './authorization';
import * as auth0 from 'auth0-js';
import { Log } from '../types/logging';

@Injectable({
  providedIn: 'root'
})
export class OauthAuthorizationService {

  private auth0: auth0.WebAuth;
  private readonly authorization: Authorization;

  constructor(private router: Router, private socket: Socket) {
    this.authorization = new Authorization(socket);
    this.auth0 = new auth0.WebAuth({
      clientID: 'PAuQqfIgsu3VfEB67tgigheVr3NhhsWA',
      domain: 'dev-txia4u91.us.auth0.com',
      responseType: 'token id_token',
      redirectUri: 'http://localhost:4200/secret',
      scope: 'openid email'
    });
  }

  @Log()
  public Login(): void {
    this.auth0.authorize();
  }

  @Log()
  public Logout(): void {
    this.authorization.Clear();
    this.auth0.logout({
      returnTo: window.location.origin
    })
  }

  @Log()
  public CheckAuthentication(): void {
    this.auth0.parseHash((err, authResult) => {
      if (!err) {
        this.authorization.SetFromAuthResult(authResult);
        window.location.hash = '';
        this.router.navigate(['/secret']);
      } else {
        this.router.navigate(['/general']);
        console.log(err);
      }
    });
  }

  @Log()
  public ResumeSession(): void {
    this.auth0.checkSession({}, (err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.authorization.SetFromAuthResult(authResult);
      } else if(err) {
        this.Logout();
      }
    });
  }

  public get IsAuthenticated(): boolean {
    return this.authorization.IsAuthenticated;
  }
}
