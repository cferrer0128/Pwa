import { Component, OnInit , ViewChild } from '@angular/core';

import {TaskService} from '../services/task.service';

import {MatPaginator, MatTableDataSource} from '@angular/material';


@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  displayedColumns: string[] = ['position', 'Title'];

  dataSource = new MatTableDataSource<TaskElement>(ELEMENT_DATA);

  public tasks:TaskElement[];
  
  

  public config = {
    title: "Serverless Table",
    w: 300,
    h: 300,
    itemHeight: 31,
    totalRows: this.tasks.length>0?this.tasks.length:0,
    items: this.tasks,
    sort:{'_id':'desc'}
  }

  
  title: string='';
  onetask:any;
  public myTimer:any;
  public isloaded:boolean=false;

  public arrRecords: Promise<any>|null = null;

   onRowClick(row:any){
    console.log(row);
    console.log("selected row:"+ row._id +" "+row.Title);
    //console.log(row);
  }

  constructor(private taskservice:TaskService) {

    this.tasks=[];

   //Interval here...

      let start = Date.now();
    
      
   }

 //update Task
 updateTask(task){
  // console.log('before updating ' + task)
  var _task = {
      Title:task.Title,
      _id:task._id,
      isdone:!task.isdone,
      isdeleted:false
  };
  this.taskservice.updateTask(_task)
  .subscribe(data =>{
      task.isdone = !task.isdone;
  })
}
//add
  addTask(event){
    event.preventDefault();
    var newTask = {
        Title: this.title,
        isdone:false
    }
    this.title = "";
    //calling the service....
    this.taskservice.addTask(newTask)
        .subscribe(task =>{
            console.log('saved ', task)
            this.tasks.push(task.packageSent);
            this.arrRecords = new Promise<any>((resolve,reject) => { resolve(this.tasks)})

        })

  }
  //delete task...
  deleteTask(task){
   
    var _task = {
      Title:task.Title,
      _id:task._id,
      isdone:task.isdone,
      isdeleted:true
    };
    this.onetask = task;
        this.taskservice.updateTask(_task)
        .subscribe(data =>{
          //console.log('Delete task... ' + JSON.stringify(data));
          // if(this.tasks[i]._id == this.onetask._id){
          for(var i=0; i<this.tasks.length;i++){
                if(this.tasks[i] == this.onetask._id){
                    
                      console.log('Delete task... ' + JSON.stringify(this.tasks[i]))
                      this.tasks.splice(i,1);
                }
                   
          }
            
                
        })

}

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit() {
    this.taskservice.getTasks()
    .subscribe(mytask =>{
     
      let myTime = Date.now();
      this.isloaded =  true;
      this.tasks =[];
      let data = mytask.data;
      let item:TaskElement;
      let index=1;

      console.log('FOR LOOP ngOnInit Seconds ', Math.floor((Date.now() - myTime)/1000))
      data.map(elem =>{
        if(typeof elem.isdone != "undefined" && 
              typeof elem.isdeleted != "undefined" && 
              !elem.isdeleted){
                item.Title = elem.Title;
                item.position = index++;
                this.tasks.push(item);

              }
             
      });

      this.dataSource = new MatTableDataSource<TaskElement>(this.tasks);

      this.arrRecords = new Promise<any>((resolve,reject) => { resolve(this.tasks)})

      console.log('end time FOR LOOP ngOnInit ', Math.floor((Date.now() - myTime)/1000))
      

    })
  }

}

export interface TaskElement {
  Title: string;
  position: number;
 
}

const ELEMENT_DATA: TaskElement[] = [];
  