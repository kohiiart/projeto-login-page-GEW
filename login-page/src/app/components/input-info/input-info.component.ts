import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-input-info',
  templateUrl: './input-info.component.html',
  styleUrls: ['./input-info.component.css']
})
export class InputInfoComponent implements OnInit {
  profileForm = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    tel: new FormControl('', Validators.required),
    cpf: new FormControl('', Validators.required),
    radiobox: new FormControl('', Validators.required),
    ativo: new FormControl('', Validators.required),
  });
  constructor() { 
    this.profileForm.value.name;
    this.profileForm.value.email;
    this.profileForm.value.password;
    this.profileForm.value.tel;
    this.profileForm.value.cpf;
    this.profileForm.value.radiobox;
    this.profileForm.value.ativo;
  }

  ngOnInit(): void {
  }
  send(){
    //event.preventDefault();
    console.log(this.profileForm.value.name)
  }
}
