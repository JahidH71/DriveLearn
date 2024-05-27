import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InstructorGuard implements CanActivate {
  constructor(private route:Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const user_id = localStorage.getItem('user_id');
      const accountType:any = localStorage.getItem('accountType');
      if(user_id){
        if (accountType == 1) {
        return true;
        }
        else{
          localStorage.removeItem('user_id');
          localStorage.removeItem('accountType')
          this.route.navigate(['/login'])
          return false;
        }
      }
      else {
        localStorage.removeItem('user_id');
        localStorage.removeItem('accountType')
        this.route.navigate(['/login'])
        return false
      }
  }
  
}
