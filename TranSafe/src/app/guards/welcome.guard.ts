import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Plugins } from '@capacitor/core';

const { Storage } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class WelcomeGuard implements CanActivate {

  constructor( private router: Router) {}


  async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
    ): Promise<boolean> {

      const isComplete = await (await Storage.get({ key: 'welcomeCompleted' })).value;

      console.log(isComplete);
      if (isComplete) {
        this.router.navigateByUrl('signup');
      }

      return !!!isComplete;
  }

}
