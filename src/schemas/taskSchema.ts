import { z } from 'zod';

export const createTaskSchema = z.object({
  title: z
    .string()
    .min(1, 'Task name is required')
    .max(100, 'Task name must be less than 100 characters'),
  status: z.enum(['todo', 'inProgress', 'complete']),
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().min(1, 'End date is required'),
  assignees: z
    .string()
    .optional()
    .transform((val) =>
      val
        ? val
            .split(',')
            .map((a) => a.trim())
            .filter(Boolean)
        : []
    ),
  priority: z.enum(['Low', 'Medium', 'Important', 'Urgent']),
  description: z.string().optional(),
});

export type CreateTaskFormData = z.infer<typeof createTaskSchema>;
