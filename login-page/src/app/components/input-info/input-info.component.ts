import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators, FormControl} from '@angular/forms';
import { CustomvalidationService } from 'src/app/services/customvalidation.service';
import { UserApiService, User } from 'src/app/services/user-api.service';
import { Subscription} from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-input-info',
  templateUrl: './input-info.component.html',
  styleUrls: ['./input-info.component.css']
})
  
export class InputInfoComponent implements OnInit {
  hide = true
  disableSelect = new FormControl(false);


  profileForm !: FormGroup;
  submitted = false;

  private routeSub: Subscription;
  id: string;
  
  constructor( private fb: FormBuilder, private customValidator : CustomvalidationService, 
    private UserApiService : UserApiService, private route : ActivatedRoute, private router : Router) {
    this.loadForm(null)
    this.getById();
    this.routeSub = Subscription.EMPTY;
    this.id = "";
  }

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params => {
      this.id = params['id'];
      console.log('ID DO EDIT----->',this.id);
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
  
  deleteUsers(){
    this.UserApiService.deleteUsers(this.id).subscribe()
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

  sendForm(){
    if(!this.profileForm.valid){
      this.disableSelect = new FormControl(false)
    }
  }
  onSubmit() {
    this.submitted = true;

    if(this.profileForm.valid){ 
      this.saveUser()
      this.router.navigateByUrl('users')
    }
  }

}
