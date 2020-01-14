export class Task {
  id: number;
  title: string;
  description: string;
  status: {
    id: number;
    title: string;
  };
  priority: {
    id: number;
    title: string;
  };
  assignee: {
    id: number;
    name: string;
  };
}
