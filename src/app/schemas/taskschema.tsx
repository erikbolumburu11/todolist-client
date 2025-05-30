import { z } from 'zod';

export const taskSchema = z.object({
    name: z.string().min(1, "Task name is required"),
    due: z.date().optional().nullable()
})
