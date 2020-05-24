import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Plugins } from '@capacitor/core';

const { Storage } = Plugins;


@Injectable({
  providedIn: 'root'
})
export class HomesignedinGuard implements CanActivate {

  constructor( private router: Router) {}
  async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean> {

      const isSignedIn =  (await Storage.get({ key: 'signedIn' })).value;
      console.log(isSignedIn);
      if (isSignedIn) {
        this.router.navigateByUrl('homenav');
      }
      return !!!isSignedIn;
  }
}
