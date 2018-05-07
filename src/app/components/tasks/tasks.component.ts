import { Component, OnInit } from '@angular/core';

import { TaskService } from './../../../app/services/task/task.service';
import { Task } from './../../../app/models/task';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
  providers: [TaskService]
})

export class TasksComponent implements OnInit {

  tasks: Task[];
  title: string;
  currentPage: number;
  pageSize: number;
  q: string;
  filteredTasks: Task[];

  constructor(private taskService: TaskService) {
    this.tasks = [];
    this.filteredTasks = [];
    this.pageSize = 3;
    this.q = '';
  }

  async ngOnInit() {
    this.getTasks();
  }

  async getTasks() {
    try {
      await this.taskService.getTasks()
        .subscribe(tasks => {
          this.tasks = tasks;
          this.filteredTasks = this.tasks;
          this.currentPage = 1;
        });
    } catch (error) {
      return error;
    }
  }

  async addTask(ev) {
    if (ev.keyCode === 13 && this.title !== '') {
      const newTask = {
        title: this.title,
        isDone: false
      }

      try {
        await this.taskService.addTask(newTask)
          .subscribe(task => {
            this.tasks.push(task);
            this.title = '';
          });
      } catch (error) {
        return error;
      }
    }
  }

  async deleteTask(id: number) {
    try {
      await this.taskService.deleteTask(id)
        .subscribe(() => {
          for (let i = 0; i < this.tasks.length; i++) {
            if (this.tasks[i]._id === id) {
              this.tasks.splice(i, 1);
            }
          }
        });
    } catch (error) {
      return error;
    }
  }

  async updateTask(task) {
    const updTask = {
      _id: task._id,
      title: task.title,
      isDone: task.isDone
    };

    try {
      await this.taskService.updateTask(updTask)
        .subscribe(data => {
          if (data.n === 1) {
            for (let i = 0; i < this.tasks.length; i++) {
              if (this.tasks[i]._id === updTask._id) {
                return this.tasks[i] = updTask;
              }
            }
          }
        });
    } catch (error) {
      return error;
    }


  }

  filterTask(): Task[] {
    if (this.q) {
      this.assignCopy();
    }

    this.currentPage = 1;

    return this.filteredTasks = Object.assign([], this.tasks)
    .filter( (task) => task.title.toLowerCase().indexOf(this.q.toLowerCase()) > -1);
      // .filter( (task) => JSON.stringify(task).toLowerCase().indexOf(this.q.toLowerCase()) > -1)
  }

  private assignCopy(): Task[] {
    return this.filteredTasks = Object.assign([], this.tasks);
  }

  numberOfPages(): number {
    if (this.pageSize !== 0) {
      return Math.ceil(this.filteredTasks.length / this.pageSize);
    } else if (this.pageSize <= 0 || this.pageSize == null) {
      return this.filteredTasks.length;
    }
  }

  previousPage(): number {
    return this.currentPage = this.currentPage - 1;
  }

  nextPage(): number {
    return this.currentPage = this.currentPage + 1;
  }

}
