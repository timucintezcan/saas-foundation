import React, { type CSSProperties, type InputHTMLAttributes, type ReactElement, type ReactNode } from 'react';

import { px, tokens } from '../tokens';
import { Divider, Icon, Inline, Stack, Surface, Text } from './primitives';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  leadingIcon?: ReactNode;
};

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  leadingIcon,
  style,
  ...rest
}: ButtonProps): ReactElement {
  const sizeMap = {
    sm: tokens.size.controlHeightSm,
    md: tokens.size.controlHeightMd,
    lg: tokens.size.controlHeightLg,
  } as const;

  const styleMap = {
    primary: {
      backgroundColor: tokens.color.accent,
      color: tokens.color.accentContrast,
      borderColor: tokens.color.accent,
    },
    ghost: {
      backgroundColor: tokens.color.transparent,
      color: tokens.color.text,
      borderColor: tokens.color.border,
    },
  } as const;

  return (
    <button
      {...rest}
      style={{
        height: px(sizeMap[size]),
        borderRadius: px(tokens.radius.md),
        borderStyle: 'solid',
        borderWidth: px(tokens.border.widthThin),
        paddingInline: px(tokens.space.lg),
        fontFamily: tokens.typography.familySans,
        fontSize: px(tokens.typography.sizeSm),
        fontWeight: tokens.typography.weightSemibold,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: px(tokens.space.sm),
        cursor: 'pointer',
        transitionDuration: `${tokens.motion.durationBaseMs}ms`,
        transitionTimingFunction: tokens.motion.easingStandard,
        ...styleMap[variant],
        ...style,
      }}
    >
      {leadingIcon}
      {children}
    </button>
  );
}

type InputProps = InputHTMLAttributes<HTMLInputElement>;

export function Input({ style, ...rest }: InputProps): ReactElement {
  return (
    <input
      {...rest}
      style={{
        height: px(tokens.size.controlHeightMd),
        width: '100%',
        borderRadius: px(tokens.radius.md),
        borderStyle: 'solid',
        borderWidth: px(tokens.border.widthThin),
        borderColor: tokens.color.border,
        backgroundColor: tokens.color.surfaceElevated,
        color: tokens.color.text,
        fontFamily: tokens.typography.familySans,
        fontSize: px(tokens.typography.sizeSm),
        paddingInline: px(tokens.space.md),
        outline: 'none',
        ...style,
      }}
    />
  );
}

type SelectOption = {
  value: string;
  label: string;
};

type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  options: SelectOption[];
};

export function Select({ options, style, ...rest }: SelectProps): ReactElement {
  return (
    <Inline
      align="center"
      style={{
        width: '100%',
        borderRadius: px(tokens.radius.md),
        borderStyle: 'solid',
        borderWidth: px(tokens.border.widthThin),
        borderColor: tokens.color.border,
        backgroundColor: tokens.color.surfaceElevated,
        paddingInline: px(tokens.space.md),
      }}
    >
      <select
        {...rest}
        style={{
          width: '100%',
          height: px(tokens.size.controlHeightMd),
          borderStyle: 'none',
          backgroundColor: tokens.color.transparent,
          color: tokens.color.text,
          fontFamily: tokens.typography.familySans,
          fontSize: px(tokens.typography.sizeSm),
          outline: 'none',
          ...style,
        }}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <Icon name="chevronDown" size="iconSm" color="textMuted" />
    </Inline>
  );
}

type BadgeProps = {
  children: ReactNode;
  tone?: 'neutral' | 'success' | 'danger';
  style?: CSSProperties;
};

export function Badge({ children, tone = 'neutral', style }: BadgeProps): ReactElement {
  const toneColor = {
    neutral: tokens.color.textMuted,
    success: tokens.color.success,
    danger: tokens.color.danger,
  } as const;

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        borderRadius: px(tokens.radius.pill),
        borderStyle: 'solid',
        borderWidth: px(tokens.border.widthThin),
        borderColor: toneColor[tone],
        color: toneColor[tone],
        paddingInline: px(tokens.space.sm),
        height: px(tokens.size.controlHeightSm),
        fontFamily: tokens.typography.familySans,
        fontSize: px(tokens.typography.sizeXs),
        fontWeight: tokens.typography.weightMedium,
        ...style,
      }}
    >
      {children}
    </span>
  );
}

type ModalProps = {
  open: boolean;
  title?: ReactNode;
  onClose?: () => void;
  children?: ReactNode;
};

export function Modal({ open, title, onClose, children }: ModalProps): ReactElement | null {
  if (!open) {
    return null;
  }

  return (
    <Stack
      justify="center"
      align="center"
      style={{
        position: 'fixed',
        inset: px(tokens.space.none),
        backgroundColor: tokens.color.overlay,
        padding: px(tokens.space.xl),
      }}
      onClick={onClose}
    >
      <Surface
        elevated
        style={{
          width: '100%',
          maxWidth: px(tokens.size.modalWidth),
        }}
        onClick={(event) => event.stopPropagation()}
      >
        <Stack gap="lg">
          {title ? <Text as="h3" variant="title">{title}</Text> : null}
          <Divider />
          <BoxContent>{children}</BoxContent>
        </Stack>
      </Surface>
    </Stack>
  );
}

function BoxContent({ children }: { children?: ReactNode }): ReactElement {
  return <Stack gap="md">{children}</Stack>;
}

type ProgressIndicatorProps = {
  value: number;
  max?: number;
};

export function ProgressIndicator({ value, max = 100 }: ProgressIndicatorProps): ReactElement {
  const boundedValue = Math.min(Math.max(value, tokens.space.none), max);
  const ratio = max === tokens.space.none ? tokens.space.none : boundedValue / max;

  return (
    <div
      aria-valuenow={boundedValue}
      aria-valuemin={tokens.space.none}
      aria-valuemax={max}
      role="progressbar"
      style={{
        width: '100%',
        height: px(tokens.size.progressHeight),
        borderRadius: px(tokens.radius.pill),
        backgroundColor: tokens.color.surfaceElevated,
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          width: `${ratio * 100}%`,
          height: '100%',
          backgroundColor: tokens.color.accent,
          transitionDuration: `${tokens.motion.durationBaseMs}ms`,
          transitionTimingFunction: tokens.motion.easingStandard,
        }}
      />
    </div>
  );
}
