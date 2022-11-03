import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm !: FormGroup;
  constructor(private formBuilder:FormBuilder,private api:ApiService,@Inject(MAT_DIALOG_DATA) public loginData:any,private loginRef:MatDialogRef<LoginComponent>) { }
  regs1:any;
  regs2:any;

  form = new FormGroup({
    name1: new FormControl(),
    panNumber1: new FormControl()
});
get name1():any{
   return this.form.get('name');
}

get panNumber1():any{
  return this.form.get('panNumber1');
}


  ngOnInit(): void {
    this.loginForm  =this.formBuilder.group({
      name1:['',Validators.required],
      panNumber1:['',Validators.required],
    })
  }
  loginSubmit(){
    let editdata=this.loginForm.value
    let newData = {...editdata,"name":this.loginData.name,"panNumber":this.loginData.panNumber}

    if(this.loginForm.value){
    if(newData.name==newData.name1 && newData.panNumber==newData.panNumber1){
        this.api.getRegister()
        .subscribe({
          next:(res)=>{
            this.loginForm.reset();
            this.loginRef.close('submit');
          },
          error:()=>{
            alert("error while adding member")
          }
        })
      }
      else{
        alert("invalid name or pannumber");
      }
    }
  }
}
