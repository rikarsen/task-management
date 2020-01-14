import { Task } from './task';

export class Groups {
  [key: number]: {
    title: string;
    tasks: Task[];
  };
}
