import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, NgForm, Validators} from '@angular/forms';

@Component({
  selector: 'app-input-info',
  templateUrl: './input-info.component.html',
  styleUrls: ['./input-info.component.css']
})
export class InputInfoComponent implements OnInit {
  profileForm = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    tel: new FormControl(''),
    cpf: new FormControl(''),
    radiobox: new FormControl(''),

  });
  constructor() { 
    this.profileForm.value.name;
    this.profileForm.value.email;
    this.profileForm.value.password;
    this.profileForm.value.tel;
    this.profileForm.value.cpf;
    this.profileForm.value.radiobox;
  }

  ngOnInit(): void {
  }
  send(){
    //event.preventDefault();
    console.log(this.profileForm.value.radiobox)
  }
}
