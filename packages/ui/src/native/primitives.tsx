import React, { type ReactElement, type ReactNode } from 'react';
import { Text as RNText, type TextStyle, View, type ViewStyle } from 'react-native';

import { tokens } from '../tokens';

type BoxProps = {
  children?: ReactNode;
  style?: ViewStyle;
};

export function Box({ children, style }: BoxProps): ReactElement {
  return <View style={style}>{children}</View>;
}

function mergeViewStyle(base: ViewStyle, style?: ViewStyle): ViewStyle {
  return style ? { ...base, ...style } : base;
}

function mergeTextStyle(base: TextStyle, style?: TextStyle): TextStyle {
  return style ? { ...base, ...style } : base;
}

type StackProps = BoxProps & {
  gap?: keyof typeof tokens.space;
  align?: ViewStyle['alignItems'];
  justify?: ViewStyle['justifyContent'];
};

export function Stack({
  children,
  gap = 'md',
  align,
  justify,
  style,
}: StackProps): ReactElement {
  const baseStyle: ViewStyle = {
    flexDirection: 'column',
    gap: tokens.space[gap],
    alignItems: align,
    justifyContent: justify,
  };

  return (
    <View style={mergeViewStyle(baseStyle, style)}>
      {children}
    </View>
  );
}

type InlineProps = BoxProps & {
  gap?: keyof typeof tokens.space;
  align?: ViewStyle['alignItems'];
  justify?: ViewStyle['justifyContent'];
};

export function Inline({ children, gap = 'md', align, justify, style }: InlineProps): ReactElement {
  const baseStyle: ViewStyle = {
    flexDirection: 'row',
    gap: tokens.space[gap],
    alignItems: align,
    justifyContent: justify,
  };

  return (
    <View style={mergeViewStyle(baseStyle, style)}>
      {children}
    </View>
  );
}

type GridProps = BoxProps & {
  columns?: number;
  gap?: keyof typeof tokens.space;
};

export function Grid({ children, columns = 2, gap = 'md', style }: GridProps): ReactElement {
  const baseStyle: ViewStyle = {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: tokens.space[gap],
  };

  return (
    <View style={mergeViewStyle(baseStyle, style)}>
      {React.Children.map(children, (child) => (
        <View style={{ width: `${100 / columns}%` }}>{child}</View>
      ))}
    </View>
  );
}

type TextProps = {
  children?: ReactNode;
  variant?: 'body' | 'caption' | 'title';
  tone?: 'default' | 'muted' | 'accent';
  style?: TextStyle;
};

export function Text({ children, variant = 'body', tone = 'default', style }: TextProps): ReactElement {
  const sizeMap = {
    body: tokens.typography.sizeMd,
    caption: tokens.typography.sizeSm,
    title: tokens.typography.sizeLg,
  } as const;

  const weightMap = {
    body: tokens.typography.weightRegular,
    caption: tokens.typography.weightMedium,
    title: tokens.typography.weightSemibold,
  } as const;

  const colorMap = {
    default: tokens.color.text,
    muted: tokens.color.textMuted,
    accent: tokens.color.accent,
  } as const;

  return (
    <RNText
      style={mergeTextStyle(
        {
          color: colorMap[tone],
          fontSize: sizeMap[variant],
          lineHeight: sizeMap[variant] * tokens.typography.lineHeightBase,
          fontWeight: `${weightMap[variant]}` as TextStyle['fontWeight'],
        },
        style,
      )}
    >
      {children}
    </RNText>
  );
}

type SurfaceProps = BoxProps & {
  elevated?: boolean;
  padded?: boolean;
};

export function Surface({ children, elevated = false, padded = true, style }: SurfaceProps): ReactElement {
  const baseStyle: ViewStyle = {
    backgroundColor: elevated ? tokens.color.surfaceElevated : tokens.color.surface,
    borderWidth: tokens.border.widthThin,
    borderColor: tokens.color.border,
    borderRadius: tokens.radius.md,
    padding: padded ? tokens.space.lg : tokens.space.none,
  };

  return (
    <View style={mergeViewStyle(baseStyle, style)}>
      {children}
    </View>
  );
}

export function Divider(): ReactElement {
  return <View style={{ borderTopWidth: tokens.border.widthThin, borderTopColor: tokens.color.border }} />;
}

type IconProps = {
  name?: 'dot' | 'check';
  size?: keyof typeof tokens.size;
  color?: keyof typeof tokens.color;
};

export function Icon({ name = 'dot', size = 'iconMd', color = 'text' }: IconProps): ReactElement {
  const glyphMap = {
    dot: '.',
    check: 'v',
  } as const;

  return (
    <RNText style={{ color: tokens.color[color], fontSize: tokens.size[size], lineHeight: tokens.size[size] }}>
      {glyphMap[name]}
    </RNText>
  );
}
