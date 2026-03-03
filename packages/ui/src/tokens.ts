export const tokens = {
  color: {
    bg: '#0a0f1c',
    surface: '#121a2b',
    surfaceElevated: '#1a243a',
    text: '#e7edf8',
    textMuted: '#9db0cc',
    accent: '#3f8cff',
    accentContrast: '#0a0f1c',
    border: '#22304a',
    success: '#34c759',
    danger: '#ff5c5c',
    overlay: 'rgba(10, 15, 28, 0.72)',
    transparent: 'transparent',
  },
  space: {
    none: 0,
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
    xxl: 32,
  },
  typography: {
    familySans:
      'ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif',
    sizeXs: 12,
    sizeSm: 14,
    sizeMd: 16,
    sizeLg: 20,
    weightRegular: 400,
    weightMedium: 500,
    weightSemibold: 600,
    lineHeightTight: 1.2,
    lineHeightBase: 1.4,
  },
  radius: {
    none: 0,
    sm: 8,
    md: 12,
    lg: 16,
    pill: 999,
  },
  motion: {
    durationFastMs: 120,
    durationBaseMs: 200,
    durationSlowMs: 320,
    easingStandard: 'ease',
  },
  size: {
    iconSm: 14,
    iconMd: 18,
    controlHeightSm: 32,
    controlHeightMd: 40,
    controlHeightLg: 48,
    progressHeight: 8,
    modalWidth: 520,
    contentMax: 760,
  },
  border: {
    widthNone: 0,
    widthThin: 1,
  },
} as const;

export type Tokens = typeof tokens;

export const px = (value: number): string => `${value}px`;

export const webThemeVars: Readonly<Record<string, string>> = {
  '--im-color-bg': tokens.color.bg,
  '--im-color-surface': tokens.color.surface,
  '--im-color-surface-elevated': tokens.color.surfaceElevated,
  '--im-color-text': tokens.color.text,
  '--im-color-text-muted': tokens.color.textMuted,
  '--im-color-accent': tokens.color.accent,
  '--im-color-border': tokens.color.border,
  '--im-space-xs': px(tokens.space.xs),
  '--im-space-sm': px(tokens.space.sm),
  '--im-space-md': px(tokens.space.md),
  '--im-space-lg': px(tokens.space.lg),
  '--im-space-xl': px(tokens.space.xl),
  '--im-radius-md': px(tokens.radius.md),
  '--im-font-sans': tokens.typography.familySans,
};
