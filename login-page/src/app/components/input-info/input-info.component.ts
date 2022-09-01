import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, FormBuilder, Validators} from '@angular/forms';
import { CustomvalidationService } from 'src/app/services/customvalidation.service';
import { UserApiService, User } from 'src/app/services/user-api.service';
import { Subscription} from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-input-info',
  templateUrl: './input-info.component.html',
  styleUrls: ['./input-info.component.css']
})
  
export class InputInfoComponent implements OnInit {
  profileForm !: FormGroup;
  submitted = false;

  private routeSub: Subscription;
  id: string;
  
  constructor( private fb: FormBuilder, private customValidator : CustomvalidationService, 
    private UserApiService : UserApiService, private route : ActivatedRoute) {
    this.setMethod();  
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

  setMethod(){
    this.profileForm = this.fb.group({
      id: [null],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      tel: ['', Validators.required],
      cpf: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      acess: ['', Validators.required],
      active: ['', Validators.required]
    },
    {
      validator: this.customValidator.MatchPassword('password', 'confirmPassword'),
    }
  )
  }

  loginUser(){
    this.UserApiService.addUsers(this.profileForm.value).subscribe()
  }

  onSubmit() {
    this.submitted = true;
    if (this.profileForm.valid) {
      alert('Cadastro realizado com sucesso!');
      console.table(this.profileForm.getRawValue());
      this.loginUser()
    }
  }

}
