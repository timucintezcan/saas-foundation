import { z } from 'zod';

export const generateChartRequestSchema = z.object({
  metric: z.string().min(1),
  country: z.string().length(2),
  yearStart: z.number().int(),
  yearEnd: z.number().int(),
});

export type GenerateChartRequest = z.infer<typeof generateChartRequestSchema>;
