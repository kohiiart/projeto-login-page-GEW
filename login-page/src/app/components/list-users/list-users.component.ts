import { Component, OnInit } from '@angular/core';
import { UserApiService, User } from 'src/app/services/user-api.service';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent implements OnInit {
  usersLister: User[]

  constructor( private userApiService: UserApiService) {
    this.usersLister = [];
   }

  ngOnInit(): void {
    this.listUsers();
  }

  listUsers() {
    this.userApiService.getUsers().subscribe(
      (res: any)=> {
        console.log(res);
        this.usersLister = <any>res;

      },
      (err: any) => console.log(err)
      )
  }
}
