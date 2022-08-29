import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, FormBuilder, Validators} from '@angular/forms';
import { CustomvalidationService } from 'src/app/services/customvalidation.service';
import { UserApiService, User } from 'src/app/services/user-api.service';

@Component({
  selector: 'app-input-info',
  templateUrl: './input-info.component.html',
  styleUrls: ['./input-info.component.css']
})
  
export class InputInfoComponent implements OnInit {
  profileForm : FormGroup;
  submitted = false;
  addUser: User ={
    id:'',
    name:'',
    email:'',
    password:'',
    tel:'',
    cpf:'',
    acess:'',
    active:''
  };
  
  constructor( private fb: FormBuilder, private customValidator : CustomvalidationService, 
    private UserApiService : UserApiService) {
    this.profileForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      tel: ['', Validators.required],
      cpf: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      radiobox: ['', Validators.required],
      ativo: ['', Validators.required]

  },
  {
    validator: this.customValidator.MatchPassword('password', 'confirmPassword'),
  }
)
  }

  ngOnInit(): void {
  }

  get profileFormControl():any{
    return this.profileForm?.controls;
  }

  loginUser(){
    delete this.addUser.id,

    this.UserApiService.addUsers(this.addUser).subscribe()
  }
  onSubmit() {
    this.submitted = true;
    if (this.profileForm.valid) {
      alert('Cadastro realizado com sucesso!\n olhe os valores no console.');
      console.table(this.profileForm.getRawValue());
      this.loginUser()
    }
  }

}
