import { ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { RegisterComponent } from './register/register.component';
import { ApiService } from './services/api.service';
import { MatTableDataSource} from '@angular/material/table';
import { SubmitClaimComponent } from './submit-claim/submit-claim.component';
import { HttpClient } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'memberPortal';
  displayedColumns: string[] = ['name','dob','contactNumber','dependName1','dependDOB1','dependName2','dependDOB2','action'];
  regs:any;
  dataSource!: MatTableDataSource<any>;

  constructor(private dialog:MatDialog,private api:ApiService,private http:HttpClient, private changeDetector:ChangeDetectorRef){

  }
  ngOnInit(): void {
    this.getApiRegisteration();

  }
  openDialog() {
    this.dialog.open(RegisterComponent, {
     width:'30%'
    }).afterClosed().subscribe(val=>{
      if(val==='save'){
        this.getApiRegisteration();
      }
    })
  }
  editMember(row:any){
    this.dialog.open(RegisterComponent,{
      width:'30%',
      data:row
    }).afterClosed().subscribe(val=>{
      if(val==='update'){
        this.getApiRegisteration();
      }
    })
  }

  editMember1(row:any){
    this.dialog.open(LoginComponent,{
      width:'30%',
      data:row,

    }).afterClosed().subscribe(val=>{
      if(val=='submit'){
      this.editMember(row);
      }
   })
  }
  editMember2(row:any){
    this.dialog.open(LoginComponent,{
      width:'30%',
      data:row
    }).afterClosed().subscribe(val=>{
      if(val=='submit'){
       this.submitClaim(row);
      }
    })
  }

  getApiRegisteration(){
    this.api.getRegister()
    .subscribe({
      next:(res)=>{
        this.dataSource =new MatTableDataSource(res.members);
      },
      error:(err)=>{
        alert("error while ")
      }
    })
  }

  applyFilter(event: Event) {
     const filterValue = (event.target as HTMLInputElement).value;
     this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  submitClaim(row:any){
    this.dialog.open(SubmitClaimComponent,{
      width:'30%',
      data:row
    }).afterOpened().subscribe(val=>{
      let response=this.http.get("http://localhost:8088/member/get/all/members");
      response.subscribe((data)=>this.regs=response);
    })
  }


}
