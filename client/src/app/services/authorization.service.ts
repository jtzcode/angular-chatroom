import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { OauthAuthorizationService } from './oauth-authorization.service';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService implements CanActivate {

  constructor(private router: Router, private authorization: OauthAuthorizationService) {

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (!this.authorization.IsAuthenticated) {
      this.router.navigate(['/general']);
      return false;
    }
    return true;
  }
}
