import { Component,inject,DestroyRef } from '@angular/core';
import { task } from '../../../core/models/task';
import { TaskService } from '../../../services/task.service';
import { catchError } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ErrorHandlingService } from '../../../services/error-handling.service';
import { ToastrService } from 'ngx-toastr';
import { taskForm } from './forms/task.form';

@Component({
  selector: 'app-creat-task',
  standalone: true,
  imports: [],
  templateUrl: './creat-task.component.html',
  styleUrl: './creat-task.component.css'
})
export class CreatTaskComponent {

  private taskService = inject(TaskService)
  private errorHandlingService = inject(ErrorHandlingService)
  private destroyRef = inject(DestroyRef)
  private _toaster = inject(ToastrService)
  titile:string=""
  userId:number=0
  completed:boolean=true
  
  save(){

    const create:task={
      completed:this.completed,
      id:0,
      title:this.titile,
      userId:this.userId
    }
   
    this.taskService
        .save(create)
        .pipe(
          catchError((error)=>this.errorHandlingService.handleError(error,'Error retrieving data.')),
          takeUntilDestroyed(this.destroyRef)
        ).subscribe((response)=>{
          this._toaster.success("Data Save Successfully","Message")

          setTimeout(() => {
            window.location.reload();
          }, 4000);
        });

  }

}
