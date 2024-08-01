import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ListTaskComponent } from "./components/task/list-task/list-task.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ListTaskComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'crud-angular18';
}
