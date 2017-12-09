import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../$services/person/auth.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { UserRequest } from '../../$models/person';



@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.less']
})
export class AuthComponent implements OnInit {
  closeResult: string;

  constructor(private authService: AuthService, private modalService: NgbModal) {}

  getBookings() {
    this.authService.getBookings();
  }

  signup(body: UserRequest = {email: 'nycheporuk@gmail.com', password: 'qwe'}) {
    // this.authService.signUp(body).subscribe(res => {
    this.authService.signUp(body);
  }
  login(body: UserRequest = {email: 'nycheporuk@gmail.com', password: 'qwe'}) {
    this.authService.login(body).subscribe(res => {
      console.log('login res:', res);
    });
  }



  ngOnInit() {

  }

}
