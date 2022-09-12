import { Component, OnInit, ViewChild } from '@angular/core';
import { UserApiService, User } from 'src/app/services/user-api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ElementRef } from '@angular/core';
import { LoadingComponent } from '../loading/loading.component';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent implements OnInit {
  usersLister: User[] = []
  snapshot: any;

  src: User[] = []
  id: string;
  resValidate: boolean = false;
  userInfo: string[] = ['id','name', 'email', 'password', 'cpf', 'tel', 'acess', 'active', 'delete'];

  constructor( private userApiService: UserApiService, 
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public dialog: MatDialog,
    private ref: ElementRef )
    {
    this.usersLister = [];
    this.id=''
   }

  ngOnInit(): void {
    this.listUsers();
  }

  listUsers() {
    const dialogRef = this.dialog.open(LoadingComponent, {
      panelClass: 'loading-dialog'
    });

    this.userApiService.getUsers().subscribe(
      (res: any)=> {
        this.usersLister = <any>res;
        this.src = this.usersLister
        if(res){
          dialogRef.close()
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

  searchUsers() {
    const input =  this.ref.nativeElement.querySelector('input')
    if (input.value.length === Number(0)) {
      this.src = this.usersLister;

    }else{
      let table: User[] = []

      for (let i = 0; i < this.usersLister.length; i++){

        const row = this.usersLister[i]
        const rowValue = input.value.toLowerCase()
        const rowName = row.name?.toLowerCase()
        if (rowName?.includes(rowValue)){
          table.push(row)
        }

      }
      console.log(table, table)
      this.src = table;
    }
  }
}
