import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
 baseur= "";
  constructor(private http:HttpClient) { }
postRegister(data :any){
  return this.http.post<any>("http://localhost:8088/member/insert",data);
}
getRegister(){
  return this.http.get<any>("http://localhost:8088/member/get/all/members");
}


updatedata(data:any){
  return this.http.put<any>("http://localhost:8088/member/update/member",data)
}
viewdata(){
  return this.http.get<any>("http://localhost:8088/member/get/all/members");
}
getRegister1(id:string){
  return this.http.get<any>("http://localhost:8088/member/get/all/members/"+id);
}

claimRegister(data :any){
  return this.http.post<any>("http://localhost:8088/member/add/claim",data);

}



}
