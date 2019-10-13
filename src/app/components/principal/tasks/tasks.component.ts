import { Component, OnInit, ViewChild } from '@angular/core'
import { MatPaginator, MatTableDataSource } from '@angular/material'
import { TaskService } from '@app/services/task.service'
import { Task } from '@app/models/task'

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
  providers: [TaskService]
})
export class TasksComponent implements OnInit {

  tasks: Task[]
  title: string
  search: string
  pageSize: number
  pageSizeOptions: number[]
  displayedColumns: string[]
  dataSource: MatTableDataSource<Task>

  @ViewChild(MatPaginator) paginator: MatPaginator

  constructor(private taskService: TaskService) {
    this.tasks = []
    this.pageSize = 2
    this.pageSizeOptions = [this.pageSize, (2 * this.pageSize), (3 * this.pageSize)]

    this.displayedColumns = ['done', 'task', 'action']
    this.setTable(this.tasks, this.paginator)
  }

  ngOnInit() {
    this.getTasks()
  }

  private setTable(tasks, paginator) {
    this.dataSource = new MatTableDataSource<Task>(tasks)
    this.dataSource.paginator = paginator
  }

  getTasks() {
    try {
      this.taskService.getTasks()
        .subscribe(
          data => {
            console.log(data)
            this.tasks = data
            this.title = ''
            this.setTable(this.tasks, this.paginator)
          },
          error => {
            console.log(error)
          }
        )
    } catch (error) {
      console.log(error)
      // return error
    }
  }

  addTaskEvent(ev) {
    if (ev.keyCode === 13 && this.title !== '') {
      console.log(this.title)
      try {
        this.taskService.addTask(
          {
            title: this.title,
            isDone: false
          }
        ).subscribe(
          () => {
            this.getTasks()
          },
          error => {
            console.log(error)
          }
        )
      } catch (error) {
        console.log(error)
        // return error
      }
    }
  }

  addTaskTap() {
    if (this.title !== '') {
      try {
        this.taskService.addTask(
          {
            title: this.title,
            isDone: false
          }
        ).subscribe(
          () => {
            this.getTasks()
          },
          error => {
            console.log(error)
          }
        )
      } catch (error) {
        console.log(error)
        // return error
      }
    }
  }

  deleteTask(id: number) {
    try {
      this.taskService.deleteTask(id)
        .subscribe(
          () => {
            this.getTasks()
          },
          error => {
            console.log(error)
          }
        )
    } catch (error) {
      console.log(error)
      // return error
    }
  }

  updateTask(task, ev) {
    task.isDone = ev.checked

    try {
      this.taskService.updateTask(task)
        .subscribe(
          () => {
            this.getTasks()
          },
          error => {
            console.log(error)
          }
        )
    } catch (error) {
      console.log(error)
      // return error
    }
  }

  filterTask(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase()
  }

}
