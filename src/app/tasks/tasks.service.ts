import{Task} from './task.model'
import {Injectable} from '@angular/core'
import {Subject} from 'rxjs'
import {HttpClient} from '@angular/common/http'
import { Router } from '@angular/router'
@Injectable({providedIn:'root'})
export class TasksService{
  private tasks:Task[]=[]
private tasksUpdated= new Subject<{tasks:Task[],totalCount:number}>()

constructor(private http:HttpClient, private router:Router){

}
/* **************GET TASKS***** */
getTasks(tasksPerPage?:number,currentPage?:number){
let url='http://localhost:3000/api/tasks'
console.log(tasksPerPage,currentPage);
if(tasksPerPage && currentPage>-1){
  console.log(tasksPerPage&&currentPage);
url+=`?pagesize=${tasksPerPage}&currentpage=${currentPage}`
}
this.http.get<{status:{},data:Task[] ,totalCount:number}>(url).subscribe((taskData)=>{
this.tasks=taskData.data
this.tasksUpdated.next({tasks:[...this.tasks],totalCount:taskData.totalCount})
})
}
getTask(id:string){

  return this.http.get<{status:{},data:Task}>('http://localhost:3000/api/tasks/'+id)
}




/* *******post****** */
addTask(task:Task,image:File){
  const taskData=new FormData()
taskData.append("title",task.title)
taskData.append("description",task.description)
taskData.append("image",image,task.title)
  this.http.post<{status:{},data:Task}>('http://localhost:3000/api/tasks',taskData).subscribe((resp)=>{
console.log(resp);
this.router.navigate(['/'])
  })}


/* ******** update task ***************/

 updateTask(task:Task){
  let taskData=null
if(typeof(task.imagePath)=='string'){
taskData=task;
}
else{
  taskData=new FormData()
  taskData.append("_id",task._id)
  taskData.append("title",task.title)
  taskData.append("description",task.description)
  taskData.append("image",task.imagePath,task.title)
}
  this.http.put<{status:{},data:Task}>('http://localhost:3000/api/tasks/'+task._id,taskData).subscribe((resp)=>{
    console.log(resp)

this.router.navigate(['/'])
  })
}

getTaskUpdateLister(){
  return this.tasksUpdated.asObservable()
}

deleteTask(id:String){
return this.http.delete('http://localhost:3000/api/tasks/'+id)
}
}
