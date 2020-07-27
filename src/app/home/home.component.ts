import { Component, OnInit, ViewChild } from '@angular/core';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { User } from '../_models';
import { UserService } from '../_services';
declare var $;

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
  })
export class HomeComponent implements OnInit {
    @ViewChild('sidenav') public el: any;
    currentUser: User;
    users: User[] = [];
    

     // @HostListener('swipe', ['$event']) 
  public swipePrev(event: any) {
    // this.toggleClass = this.toggleClass ? false : true;
    this.toggleClass = !this.toggleClass;
  }
  private swipeCoord?: [number, number];
  private swipeTime?: number;

  swipe(e: TouchEvent, when: string, whichSide: string): void {
    const coord: [number, number] = [e.changedTouches[0].pageX, e.changedTouches[0].pageY];
    const time = new Date().getTime();
    if (when === 'start') {
      this.swipeCoord = coord;
      this.swipeTime = time;
    } else if (when === 'end' && this.swipeCoord != undefined) {
      const direction = [coord[0] - this.swipeCoord[0], coord[1] - this.swipeCoord[1]];
      const duration = time - this.swipeTime;
      if (whichSide == 'right') {
        if(this.swipeCoord[0] < 15){
          if (direction[0] > 0) {
            if (duration < 1000 //
              && Math.abs(direction[0]) > 100 // Long enough
              && Math.abs(direction[0]) > Math.abs(direction[1] * 3)) { // Horizontal enough
              // const swipe = direction[0] < 0 ? 'next' : 'previous';
              // Do whatever you want with swipe
              this.toggleClass = !this.toggleClass;
            }
          }
        }
      } else {
        if (duration < 1000 //
          && Math.abs(direction[0]) > 100 // Long enough
          && Math.abs(direction[0]) > Math.abs(direction[1] * 3)) { // Horizontal enough
          // const swipe = direction[0] < 0 ? 'next' : 'previous';
          // Do whatever you want with swipe
          this.toggleClass = !this.toggleClass;
        }
      }

    }
  }

  toggleClass = false;

    constructor(private userService: UserService,private router: Router) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

    ngOnInit() {
        this.loadAllUsers();
    }

    deleteUser(id: number) {
        this.userService.delete(id).pipe(first()).subscribe(() => { 
            this.loadAllUsers() 
        });
    }

    private loadAllUsers() {
        this.userService.getAll().pipe(first()).subscribe(users => { 
            this.users = users; 
        });
    }

    OnHamburger() {
        this.toggleClass = !this.toggleClass;
        $('.header-class').css('z-index', '0');
        
    
      }

      logout()
      {

      }
}