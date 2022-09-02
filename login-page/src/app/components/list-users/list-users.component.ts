import { Component, OnInit, ViewChild } from '@angular/core';
import { UserApiService, User } from 'src/app/services/user-api.service';
import { ActivatedRoute, Router } from '@angular/router';
import {MatPaginator} from '@angular/material/paginator';
import { UsersComponent } from 'src/app/pages/users/users.component';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent implements OnInit {
  usersLister: User[]
  snapshot: any;

  userInfo: string[] = ['id','name', 'email', 'password', 'cpf', 'tel', 'acess', 'active'];

  constructor( private userApiService: UserApiService, private router: Router,
    private activatedRoute: ActivatedRoute) {
    this.usersLister = [];
   }

  ngOnInit(): void {
    this.listUsers();
  }

  listUsers() {
    this.userApiService.getUsers().subscribe(
      (res: any)=> {
        this.usersLister = <any>res;
      },
      (err: any) => console.log(err)
      )
  }
}
