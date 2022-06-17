import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, } from '@angular/forms';
import { Dataservice } from '../data.service';
import { Data } from '@angular/router';
@Component({
  selector: 'app-datalist',
  templateUrl: './datalist.component.html',
  styleUrls: ['./datalist.component.css']
})
export class DatalistComponent implements OnInit {
  headers =["sno","firstName"]
  tasks:any;
  myDate = Date.now();

  // showmsg:boolean=false;
  firstName: any;
  rows: any;
  Isloading: boolean = false;
  constructor(private fb: FormBuilder, public http: HttpClient ,private service :Dataservice) { }
  profiles = this.fb.group({
                firstName: [''],
                status:[''],
                Date:['']

                            })
 ngOnInit(): void {
    this.getdata()
  }
  getdata(){
    this.http.get<any[]>('https://crudcrud.com/api/88ab3a75fec34ec1b1c17c20b4d2359b/task')
     .subscribe(data => {
        this.tasks = data;
      },
    )
  }
  onSubmit() {
  }

  markAsDone(task: any){
    let data =  {
      name: task.name,
      status: 'done',
    }
    let url = 'https://crudcrud.com/api/88ab3a75fec34ec1b1c17c20b4d2359b/task/' + task._id;
    this.http.put(url,data)
    .subscribe((res)=>{
        this.getdata()
      })

  }
  createUser(){
   let data = {
     name: this.profiles.value.firstName,
     status: 'pending',
    Date: '15-6-2022'
    }

    this.http.post('https://crudcrud.com/api/88ab3a75fec34ec1b1c17c20b4d2359b/task',data).subscribe(
      (res)=>{
            // this.userData=res.Data
        this.getdata()
        this.profiles.get("firstName")?.setValue("");
        }
        )

      }
      taskremove(id:any){
        if(id !=undefined && id !=null && id !="")
           {
          var url='https://crudcrud.com/api/88ab3a75fec34ec1b1c17c20b4d2359b/task/'+id;
          this.http.delete<any>(url).subscribe(data =>{
                    this.getdata();
                       })
           }
          }
  }
  

