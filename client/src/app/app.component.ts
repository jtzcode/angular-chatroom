import { Component } from '@angular/core';
import { OauthAuthorizationService } from './services/oauth-authorization.service';

@Component({
  selector: 'ngchat-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private auth: OauthAuthorizationService) {
    this.auth.CheckAuthentication();
  }

  ngOnInit() {
    if (this.auth.IsAuthenticated) {
      this.auth.ResumeSession();
    }
  }
}
