import { Component, OnInit, ViewChild } from '@angular/core';
import { UserApiService, User } from 'src/app/services/user-api.service';
import { ActivatedRoute, Router } from '@angular/router';
import {MatPaginator} from '@angular/material/paginator';
import { UsersComponent } from 'src/app/pages/users/users.component';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent implements OnInit {
  usersLister: User[]
  snapshot: any;
  id: string;
  resValidate: boolean = false;
  userInfo: string[] = ['id','name', 'email', 'password', 'cpf', 'tel', 'acess', 'active', 'delete'];

  constructor( private userApiService: UserApiService, 
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public dialog: MatDialog) {
    this.usersLister = [];
    this.id=''
   }

  ngOnInit(): void {
    this.listUsers();
  }

  listUsers() {
    this.userApiService.getUsers().subscribe(
      (res: any)=> {
        this.usersLister = <any>res;
        if(res){
          this.resValidate= true
        }
      },
      (err: any) => console.log(err)
      )
  }

  confirmEdit(sendId:string): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '50vh',
      data: ['delete', sendId]
    });

    dialogRef.afterClosed().subscribe(()=>{
      this.listUsers();
    })
  }
}
