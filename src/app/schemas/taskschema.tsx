import { z } from 'zod';

export const taskSchema = z.object({
    name: z.string(),
    due: z.date().optional().nullable()
})
