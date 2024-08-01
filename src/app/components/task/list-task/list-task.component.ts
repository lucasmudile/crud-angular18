import { Component, inject, DestroyRef} from '@angular/core';
import { TaskService } from '../../../services/task.service';
import { catchError,of } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ToastrService } from 'ngx-toastr';
import { ErrorHandlingService } from '../../../services/error-handling.service';
import { CreatTaskComponent } from "../creat-task/creat-task.component";

@Component({
  selector: 'app-list-task',
  standalone: true,
  imports: [CreatTaskComponent],
  templateUrl: './list-task.component.html',
  styleUrl: './list-task.component.css'
})
export class ListTaskComponent {

  data:any
  private taskService = inject(TaskService)
  private destroyRef = inject(DestroyRef)
  private toastr = inject(ToastrService)
  private errorHandlingService = inject(ErrorHandlingService)
  constructor() {
    this.getTasks()
  }



  getTasks(){
    this.taskService.get()
                    .pipe(
                      catchError((error)=>this.errorHandlingService.handleError(error,'Error retrieving data.')),
                      takeUntilDestroyed(this.destroyRef)
                    ).subscribe((response)=>{
                      this.data = response;
                     });
  }

  delete(id:string){
    this.taskService.delete(id)
                    .pipe(
                      catchError((error)=>this.errorHandlingService.handleError(error,'Error retrieving data.')),
                      takeUntilDestroyed(this.destroyRef)
                    ).subscribe((response)=>{
                      this.toastr.success('Data deleted!', 'Message!');
                      setTimeout(() => {
                        window.location.reload();
                      }, 4000);
                     });

  }
}
