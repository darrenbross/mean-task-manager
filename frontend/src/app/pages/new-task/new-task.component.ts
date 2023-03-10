import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TaskService } from 'src/app/task.service';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.scss']
})
export class NewTaskComponent implements OnInit {

  listId!: string;

  constructor(private taskService: TaskService, private route: ActivatedRoute, private router: Router) {  }
  
  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.listId = params.get['listId'];
      }
    )
  }

  createTask(title: string, listId: string) {
    this.taskService.createTask(title, this.listId).subscribe((newTask: Task) => {
      this.router.navigate(['../'], { relativeTo: this.route });
    })
  }

}
