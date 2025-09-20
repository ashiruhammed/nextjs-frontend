export interface Task {
  id: string;
  title: string;
  startDate: string;
  endDate: string;
  assignees: string[];
  priority: 'Low' | 'Medium' | 'Important' | 'Urgent';
  status: 'todo' | 'inProgress' | 'complete';
}

export interface Column {
  id: string;
  title: string;
  tasks: Task[];
  color: string;
  icon: React.ReactNode;
}
