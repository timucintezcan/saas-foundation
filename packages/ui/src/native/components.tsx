import React, { type ReactElement, type ReactNode } from 'react';
import {
  Modal as RNModal,
  Pressable,
  TextInput,
  type TextInputProps,
  type ViewStyle,
  View,
} from 'react-native';

import { tokens } from '../tokens';
import { Divider, Stack, Surface, Text } from './primitives';

function mergeViewStyle(
  base: Record<string, string | number | undefined>,
  style?: Record<string, string | number | undefined> | Record<string, string | number | undefined>[],
): Record<string, string | number | undefined> {
  if (!style) {
    return base;
  }

  if (Array.isArray(style)) {
    return style.reduce<Record<string, string | number | undefined>>(
      (acc, item) => ({ ...acc, ...item }),
      base,
    );
  }

  return { ...base, ...style };
}

type ButtonProps = {
  children?: ReactNode;
  onPress?: () => void;
  variant?: 'primary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
};

export function Button({ children, onPress, variant = 'primary', size = 'md', disabled = false }: ButtonProps): ReactElement {
  const sizeMap = {
    sm: tokens.size.controlHeightSm,
    md: tokens.size.controlHeightMd,
    lg: tokens.size.controlHeightLg,
  } as const;

  const styleMap = {
    primary: {
      backgroundColor: tokens.color.accent,
      borderColor: tokens.color.accent,
      textColor: tokens.color.accentContrast,
    },
    ghost: {
      backgroundColor: tokens.color.transparent,
      borderColor: tokens.color.border,
      textColor: tokens.color.text,
    },
  } as const;

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={{
        height: sizeMap[size],
        borderRadius: tokens.radius.md,
        borderWidth: tokens.border.widthThin,
        borderColor: styleMap[variant].borderColor,
        backgroundColor: styleMap[variant].backgroundColor,
        paddingHorizontal: tokens.space.lg,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Text variant="caption" style={{ color: styleMap[variant].textColor }}>
        {children}
      </Text>
    </Pressable>
  );
}

export function Input(props: TextInputProps): ReactElement {
  const baseStyle = {
    height: tokens.size.controlHeightMd,
    width: '100%',
    borderWidth: tokens.border.widthThin,
    borderColor: tokens.color.border,
    borderRadius: tokens.radius.md,
    backgroundColor: tokens.color.surfaceElevated,
    color: tokens.color.text,
    paddingHorizontal: tokens.space.md,
    fontSize: tokens.typography.sizeSm,
  };

  return (
    <TextInput
      placeholderTextColor={tokens.color.textMuted}
      {...props}
      style={mergeViewStyle(baseStyle, props.style)}
    />
  );
}

type BadgeProps = {
  children?: ReactNode;
  tone?: 'neutral' | 'success' | 'danger';
};

export function Badge({ children, tone = 'neutral' }: BadgeProps): ReactElement {
  const colorMap = {
    neutral: tokens.color.textMuted,
    success: tokens.color.success,
    danger: tokens.color.danger,
  } as const;

  return (
    <View
      style={{
        height: tokens.size.controlHeightSm,
        borderRadius: tokens.radius.pill,
        borderWidth: tokens.border.widthThin,
        borderColor: colorMap[tone],
        paddingHorizontal: tokens.space.sm,
        justifyContent: 'center',
      }}
    >
      <Text variant="caption" style={{ color: colorMap[tone] }}>
        {children}
      </Text>
    </View>
  );
}

type ModalProps = {
  open: boolean;
  onClose?: () => void;
  title?: ReactNode;
  children?: ReactNode;
};

export function Modal({ open, onClose, title, children }: ModalProps): ReactElement {
  return (
    <RNModal visible={open} transparent animationType="fade" onRequestClose={onClose}>
      <Pressable
        onPress={onClose}
        style={{
          flex: 1,
          backgroundColor: tokens.color.overlay,
          padding: tokens.space.xl,
          justifyContent: 'center',
        }}
      >
        <Pressable onPress={() => undefined}>
          <Surface elevated>
            <Stack gap="lg">
              {title ? <Text variant="title">{title}</Text> : null}
              <Divider />
              <Stack gap="md">{children}</Stack>
            </Stack>
          </Surface>
        </Pressable>
      </Pressable>
    </RNModal>
  );
}

type ProgressIndicatorProps = {
  value: number;
  max?: number;
};

export function ProgressIndicator({ value, max = 100 }: ProgressIndicatorProps): ReactElement {
  const boundedValue = Math.min(Math.max(value, tokens.space.none), max);
  const ratio = max === tokens.space.none ? tokens.space.none : boundedValue / max;

  return (
    <View
      style={{
        width: '100%',
        height: tokens.size.progressHeight,
        borderRadius: tokens.radius.pill,
        backgroundColor: tokens.color.surfaceElevated,
        overflow: 'hidden',
      }}
    >
      <View
        style={{
          width: `${ratio * 100}%` as ViewStyle['width'],
          height: '100%',
          backgroundColor: tokens.color.accent,
        }}
      />
    </View>
  );
}
