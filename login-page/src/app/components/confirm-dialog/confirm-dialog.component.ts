import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UserApiService } from 'src/app/services/user-api.service';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent implements OnInit {
  id: string = '';
  validForm: boolean = false;
  loading: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    private router : Router,
    private UserApiService : UserApiService,
    @Inject(MAT_DIALOG_DATA) public data: string
  ) {}
  
  cancel(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    if(this.data[0] === 'delete'){
      this.id = this.data[1];
    }
    if(this.data[0] === 'save'){
      this.id=''
    }
    this.validForm = Boolean(this.data[2]);
  }

  save(){
    if(this.validForm == true){
      this.router.navigateByUrl('/users');
    }
    this.dialogRef.close();
  }
  delete(){
    this.loading = true;
    this.UserApiService.deleteUsers(this.id).subscribe((res => {
      this.loading = false; 
      this.dialogRef.close();
    }));
  }
}
