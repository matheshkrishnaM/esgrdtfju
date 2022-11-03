import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { ApiService } from '../services/api.service';


@Component({
  selector: 'app-submit-claim',
  templateUrl: './submit-claim.component.html',
  styleUrls: ['./submit-claim.component.css']
})
export class SubmitClaimComponent implements OnInit {

  displayedColumns: string[] = ['name','dob','dependName1','dependDOB1','dependName2','dependDOB2','action'];
  constructor(private formBuilder:FormBuilder,private api:ApiService ,@Inject(MAT_DIALOG_DATA) public submitClaim:any,private submitRef:MatDialogRef<SubmitClaimComponent>,private http:HttpClient) { }
  submitForm !: FormGroup;
  regs1:any;
  regs2:any;
  regs3:any;
  regs4:any;
  regs5:any;
  regs6:any;


  ngOnInit() {

    this.api.getRegister1(this.submitClaim.id)
    .subscribe({next:(data)=>{
      this.regs1=data.members.name;
      this.regs2=data.members.dependName1;
      this.regs3=data.members.dependName2;
      this.regs4=data.members.dob;
      this.regs5=data.members.dependDOB1;
      this.regs6=data.members.dependDOB2;
      }});


    this.submitForm  =this.formBuilder.group({
      name:['',Validators.required],
      dob:['',Validators.required],
      dateOfAdmission:['',Validators.required],
      dateOfDischarge:['',Validators.required],
      billAmount:['',Validators.required],


  }) ;

  }
  claimSubmit(){
    let editdata=this.submitForm.value
     let newData = {...editdata,"id":this.submitClaim.id}
      if(this.submitForm.valid){
        this.api.claimRegister(newData)
        .subscribe({
          next:(res)=>{
            alert("claimSubmited is Succesfully");
            this.submitForm.reset();
            this.submitRef.close('save');

          },
          error:()=>{
            alert("error while adding member")
          }
        })
      }

  }


}
