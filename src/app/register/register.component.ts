import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatDialogRef,MAT_DIALOG_DATA} from '@angular/material/dialog';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm !: FormGroup;
  actionBtn:string="Save"
  constructor(private formBuilder:FormBuilder,private api:ApiService ,@Inject(MAT_DIALOG_DATA) public editData:any,private regeisteraionRef:MatDialogRef<RegisterComponent>) { }
  ngOnInit(): void {
   this.registerForm =this.formBuilder.group({
    name:['',Validators.required],
    emailId:['',[Validators.required,Validators.email]],
    dob:['',Validators.required],
    address:['',Validators.required],
    panNumber:['',[Validators.required]],
    contactNumber:['',[Validators.required,Validators.maxLength(10)]],
    state:['',Validators.required],
    country:['',Validators.required],
    dependName1:['',Validators.required],
    dependName2:['',Validators.required],
    dependDOB1:['',Validators.required],
    dependDOB2:['',Validators.required],
   })

   if(this.editData){
    this.actionBtn="Update"
    this.registerForm.controls['name'].setValue(this.editData.name);
    this.registerForm.controls['emailId'].setValue(this.editData.emailId);
    this.registerForm.controls['dob'].setValue(this.editData.dob);
    this.registerForm.controls['address'].setValue(this.editData.address);
    this.registerForm.controls['panNumber'].setValue(this.editData.panNumber);
    this.registerForm.controls['contactNumber'].setValue(this.editData.contactNumber);
    this.registerForm.controls['state'].setValue(this.editData.state);
    this.registerForm.controls['country'].setValue(this.editData.country);
    this.registerForm.controls['dependName1'].setValue(this.editData.dependName1);
    this.registerForm.controls['dependDOB1'].setValue(this.editData.dependDOB1);
    this.registerForm.controls['dependName2'].setValue(this.editData.dependName2);
    this.registerForm.controls['dependDOB2'].setValue(this.editData.dependDOB2);

   }
  }
  registeration(){
    if(!this.editData){
      if(this.registerForm.valid){
        this.api.postRegister(this.registerForm.value)
        .subscribe({
          next:(res)=>{
            alert("Registeration is Succesfully");
            this.registerForm.reset();
            this.regeisteraionRef.close('save');
          },
          error:()=>{
            alert("error while adding member")
          }
        })
      }
    }else{
      this.updatedata()
    }
  }
  updatedata(){
     let editdata=this.registerForm.value
     let newData = {...editdata,"id":this.editData.id}
     this.api.updatedata(newData).
     subscribe({
      next:(res)=>{
        alert("product updated successfully");
        this.registerForm.reset();
        this.regeisteraionRef.close('update');
      },
      error:()=>{
        alert("error");
      }
     })
  }
}
