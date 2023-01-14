  import { Component,OnDestroy,OnInit } from '@angular/core';
  import { PageEvent } from '@angular/material/paginator';
  import {  Subscription } from 'rxjs';
  import { AuthService } from 'src/app/auth/auth.service';
  import { Task } from '../task.model';
  import { TasksService } from '../tasks.service';

  @Component({
    selector: 'app-task-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss']
  })
  export class ListComponent implements OnInit,OnDestroy{

      storedTasks:Task[]=[]
      isLoading=false
      totalTasks=0
      pageIndex=0
      pageSize=10
      pageSizeOptions=[1,5,10,100]
      userId=null


  private tasksSub:Subscription
  private authListenerSubs:Subscription;
  public userIsAuthenticated=false
  constructor(public tasksServive:TasksService,private authService:AuthService){

  }
  ngOnInit() {

  this.tasksServive.getTasks(this.pageSize,this.pageIndex)
  this.isLoading=true
    this.tasksSub= this.tasksServive.getTaskUpdateLister().subscribe((taskData:any)=>{
  this.isLoading=false
  console.log(taskData);
  this.storedTasks=taskData.tasks
      this.totalTasks=taskData.totalCount
  })

  this.userIsAuthenticated=this.authService.getAuthStatus()
this.userId=this.authService.getUserId()
  this.authListenerSubs=this.authService.getAuthStatusListener().subscribe(isAuthenticated=>{
    this.userIsAuthenticated=isAuthenticated;
    this.userId=this.authService.getUserId()
  })
  }
  onChangePage(event:PageEvent){
  console.log(event)
  this.pageSize=event.pageSize
  this.pageIndex=event.pageIndex
  this.tasksServive.getTasks(this.pageSize,this.pageIndex)
  }

  onDelete(id:String){
  this.tasksServive.deleteTask(id).subscribe(r=>
    this.tasksServive.getTasks(this.pageSize,this.pageIndex)

    )
  }

  ngOnDestroy()  {
    this.tasksSub.unsubscribe()
  }

  }
