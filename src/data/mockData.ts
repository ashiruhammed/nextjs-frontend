import { Task } from '../types/task';

export const initialTasks: Task[] = [
  {
    id: '1',
    title: 'MKV Intranet V2',
    startDate: '04/06/2024',
    endDate: '16/06/2014',
    assignees: ['John', 'Sarah', 'Mike'],
    priority: 'Normal',
    status: 'todo',
  },
  {
    id: '2',
    title: 'Design System',
    startDate: '23/06/2024',
    endDate: '24/06/2024',
    assignees: ['John', 'Sarah'],
    priority: 'Important',
    status: 'todo',
  },
  {
    id: '3',
    title: 'Medical Appointment',
    startDate: '16/06/2024',
    endDate: '18/06/2024',
    assignees: ['John', 'Sarah'],
    priority: 'Urgent',
    status: 'todo',
  },
  {
    id: '4',
    title: 'Testing Data',
    startDate: '23/06/2024',
    endDate: '24/06/2024',
    assignees: ['John', 'Sarah'],
    priority: 'Urgent',
    status: 'inProgress',
  },
  {
    id: '5',
    title: 'Patient Request',
    startDate: '16/06/2024',
    endDate: '18/06/2024',
    assignees: ['John', 'Sarah'],
    priority: 'Urgent',
    status: 'inProgress',
  },
  {
    id: '6',
    title: 'Patient Meetup',
    startDate: '23/06/2024',
    endDate: '24/06/2024',
    assignees: ['Mike'],
    priority: 'Low',
    status: 'complete',
  },
];

export const priorityColors = {
  Low: '#BAC1CC',
  Normal: '#75C5C1',
  Important: '#F6BE38',
  Urgent: '#FF515D',
};
