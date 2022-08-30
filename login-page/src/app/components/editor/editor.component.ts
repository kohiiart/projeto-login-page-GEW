import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, FormBuilder, Validators} from '@angular/forms';
import { CustomvalidationService } from 'src/app/services/customvalidation.service';
import { UserApiService, User } from 'src/app/services/user-api.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})

export class EditorComponent implements OnInit {
  editForm : FormGroup;
  submitted = false;

  id: string='';
  newUser: User ={
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
    private UserApiService : UserApiService, private activateRoute : ActivatedRoute,
    private router: Router) {
    this.editForm = this.fb.group({
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
    this.id= this.activateRoute.snapshot.params['id'];
    console.log(this.id);
  }

  get editFormControl():any{
    return this.editForm?.controls;
  }

  editUser(){
    delete this.newUser.id,

    this.UserApiService.editUsers('1',this.newUser).subscribe()
  }

  onSubmit() {
    this.submitted = true;
    if (this.editForm.valid) {
      alert('Dados atualizados com sucesso!');
      this.editUser()
    }
  }

}
