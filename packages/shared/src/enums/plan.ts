export const PLAN = {
  FREE: 'free',
  PRO_MONTHLY: 'pro_monthly',
  PRO_ANNUAL: 'pro_annual',
} as const;

export type Plan = (typeof PLAN)[keyof typeof PLAN];
