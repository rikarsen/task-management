import { Component, OnInit } from '@angular/core';
import {
  trigger,
  state,
  style,
  transition,
  animate
} from '@angular/animations';
import { first } from 'rxjs/operators';
import { TasksService } from './tasks.service';
import { Task } from './models/task';
import { Option } from './models/option';
import { Groups } from './models/groups';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
  animations: [
    trigger('fadeAnimation', [
      state('in', style({ opacity: 1 })),
      transition(':enter', [style({ opacity: 0 }), animate(150)]),
      transition(':leave', animate(150, style({ opacity: 0 })))
    ])
  ]
})
export class TasksComponent implements OnInit {
  public objectKeys = Object.keys;

  public sortOptions: Option[];
  public groupOptions: Option[];
  public selectedSort: string;
  public selectedGroup: string;
  public filterText: string;

  private tasks: Task[];
  public groups: Groups;

  constructor(private tasksService: TasksService) {
    this.sortOptions = [
      { value: 'priority', name: 'Priority' },
      { value: 'assignee', name: 'Assignee' },
      { value: 'name', name: 'Name' }
    ];
    this.groupOptions = [
      { value: 'status', name: 'Status' },
      { value: 'assignee', name: 'Assignee' },
      { value: 'priority', name: 'Priority' }
    ];
    this.selectedSort = 'priority';
    this.selectedGroup = 'status';

    this.tasks = [];
    this.groups = {};
  }

  ngOnInit() {
    this.getTasks(true);

    setTimeout(() => {
      this.getTasks();
    }, 15000);
  }

  private getTasks(firstTime: boolean = false): void {
    this.tasksService
      .getTasks()
      .pipe(first())
      .subscribe((tasks: Task[]) => {
        this.tasks = tasks;

        if (firstTime) {
          this.initGroup();
        } else {
          Object.keys(this.groups).map(key => {
            this.groups[key].tasks.map((task: Task) => {
              task.title = this.tasks[task.id].title;
            });
          });
        }
      });
  }

  private initGroup(): void {
    const groups = {};
    this.tasks.map((task: Task) => {
      const group = task[this.selectedGroup];
      if (!groups[group.id]) {
        groups[group.id] = {
          title: group.title || group.name,
          tasks: [task]
        };
      } else {
        groups[group.id].tasks.push(task);
      }
    });
    this.groups = groups;
  }

  public moveTask(groupI: number, taskI: number, pos: number): void {
    const tasks = this.groups[groupI].tasks;
    this.groups[groupI + pos].tasks.push(tasks[taskI]);
    tasks.splice(taskI, 1);
  }
}
