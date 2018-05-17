import { Component, OnInit, ViewChild } from '@angular/core';

import { MatPaginator, MatTableDataSource } from '@angular/material';

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
  search: string;
  pageSize: number;
  pageSizeOptions: number[];
  displayedColumns: string[];
  dataSource: MatTableDataSource<Task>;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private taskService: TaskService) {
    this.tasks = [];
    this.pageSize = 2;
    this.pageSizeOptions = [this.pageSize, (2 * this.pageSize), (3 * this.pageSize)];

    this.displayedColumns = ['done', 'task', 'action'];
    this.setTable(this.tasks, this.paginator);
  }

  ngOnInit() {
    this.getTasks();
  }

  private setTable(tasks, paginator) {
    this.dataSource = new MatTableDataSource<Task>(tasks);
    this.dataSource.paginator = paginator;
  }

  getTasks() {
    try {
      this.taskService.getTasks()
        .subscribe(tasks => {
          this.tasks = tasks;
          this.setTable(this.tasks, this.paginator);
        });
    } catch (error) {
      return error;
    }
  }

  addTask(ev) {
    if (ev.keyCode === 13 && this.title !== '') {
      const newTask = {
        title: this.title,
        isDone: false
      }

      try {
        this.taskService.addTask(newTask)
          .subscribe(task => {
            this.tasks.push(task);
            this.title = '';
            this.setTable(this.tasks, this.paginator);
          });
      } catch (error) {
        return error;
      }
    }
  }

  deleteTask(id: number) {
    try {
      this.taskService.deleteTask(id)
        .subscribe(() => {
          for (let i = 0; i < this.tasks.length; i++) {
            if (this.tasks[i]._id === id) {
              this.tasks.splice(i, 1);
              this.setTable(this.tasks, this.paginator);
            }
          }
        });
    } catch (error) {
      return error;
    }
  }

  updateTask(task, ev) {
    task.isDone = ev.checked;

    try {
      this.taskService.updateTask(task)
        .subscribe(data => {
          if (data.n === 1) {
            for (let i = 0; i < this.tasks.length; i++) {
              if (this.tasks[i]._id === task._id) {
                this.tasks[i] = task;
                this.setTable(this.tasks, this.paginator);
              }
            }
          }
        });
    } catch (error) {
      return error;
    }
  }

  filterTask(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
