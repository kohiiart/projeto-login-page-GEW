import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators, FormControl} from '@angular/forms';
import { CustomvalidationService } from 'src/app/services/customvalidation.service';
import { UserApiService } from 'src/app/services/user-api.service';
import { Subscription} from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-input-info',
  templateUrl: './input-info.component.html',
  styleUrls: ['./input-info.component.css']
})
  
export class InputInfoComponent implements OnInit {
  hide = true

  profileForm !: FormGroup;
  submitted = false;

  private routeSub: Subscription;
  id: string;
  
  constructor( private fb: FormBuilder, private customValidator : CustomvalidationService, 
    private UserApiService : UserApiService, private route : ActivatedRoute, private router : Router,
    public dialog: MatDialog) {
    this.loadForm(null)
    this.getById();
    this.routeSub = Subscription.EMPTY;
    this.id = "";
  }

  confirmEdit(): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '50vh',
      data: ['delete', this.id]
    });
  }

  save(): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '50vh',
      data: ['save', this.id, this.profileForm.valid]
    });
  }

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params => {
      this.id = params['id'];
    });
  }

  get profileFormControl():any{
    return this.profileForm?.controls;
  }

  loadForm(res: any){
    this.profileForm = this.fb.group({
      name: [!this.id ? '' : res.name, Validators.required],
      email: [!this.id ? '' : res.email, [Validators.required, Validators.email]],
      tel: [!this.id ? '' : res.tel, Validators.required],
      cpf: [!this.id ? '' : res.cpf, Validators.required],
      password: [!this.id ? '' : res.password, Validators.required],
      confirmPassword: ['', Validators.required],
      acess: [!this.id ? '' : res.acess, Validators.required],
      active: [!this.id ? '' : res.active, Validators.required]
    },
    {
      validator: this.customValidator.MatchPassword('password', 'confirmPassword'),
    }
  )
  }

  saveUser(){
    if(!this.id){
      this.UserApiService.addUsers(this.profileForm.value).subscribe()
    }else{
      this.UserApiService.editUsers(this.id, this.profileForm.value).subscribe()
    }
  }

  getById(){
    this.routeSub = this.route.params.subscribe(params => {
      this.id = params['id'];

      if(this.id){
        this.UserApiService.getUsersById(this.id).subscribe(res => {
          if(!res){
            this.router.navigateByUrl('/**')
          }else{
            this.loadForm(res)  
          }
        });
      }
    })
  }

  onSubmit() {
    this.submitted = true;

    if(this.profileForm.valid){ 
      this.saveUser()
    }
  }
}
