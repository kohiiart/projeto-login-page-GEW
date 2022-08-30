import { Component, OnInit } from '@angular/core';
import { UserApiService, User } from 'src/app/services/user-api.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent implements OnInit {
  usersLister: User[]

  constructor( private userApiService: UserApiService, private router: Router,
    private activatedRoute: ActivatedRoute) {
    this.usersLister = [];
   }

  ngOnInit(): void {
    this.listUsers();
    const idEntrada= <string>this.activatedRoute.snapshot.params['id'];
    console.log(idEntrada);
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
