import React, { type CSSProperties, type HTMLAttributes, type ReactElement, type ReactNode } from 'react';

import { px, tokens, webThemeVars } from '../tokens';

type BoxProps = HTMLAttributes<HTMLDivElement> & {
  children?: ReactNode;
  style?: CSSProperties;
};

export function ThemeRoot({ children, style, ...rest }: BoxProps): ReactElement {
  return (
    <div
      {...rest}
      style={{
        ...webThemeVars,
        backgroundColor: tokens.color.bg,
        color: tokens.color.text,
        fontFamily: tokens.typography.familySans,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

export function Box({ children, style, ...rest }: BoxProps): ReactElement {
  return (
    <div {...rest} style={style}>
      {children}
    </div>
  );
}

type StackProps = BoxProps & {
  gap?: keyof typeof tokens.space;
  align?: CSSProperties['alignItems'];
  justify?: CSSProperties['justifyContent'];
};

export function Stack({
  children,
  gap = 'md',
  align,
  justify,
  style,
  ...rest
}: StackProps): ReactElement {
  return (
    <Box
      {...rest}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: px(tokens.space[gap]),
        alignItems: align,
        justifyContent: justify,
        ...style,
      }}
    >
      {children}
    </Box>
  );
}

type InlineProps = BoxProps & {
  gap?: keyof typeof tokens.space;
  wrap?: boolean;
  align?: CSSProperties['alignItems'];
  justify?: CSSProperties['justifyContent'];
};

export function Inline({
  children,
  gap = 'md',
  wrap = false,
  align,
  justify,
  style,
  ...rest
}: InlineProps): ReactElement {
  return (
    <Box
      {...rest}
      style={{
        display: 'flex',
        flexDirection: 'row',
        gap: px(tokens.space[gap]),
        flexWrap: wrap ? 'wrap' : 'nowrap',
        alignItems: align,
        justifyContent: justify,
        ...style,
      }}
    >
      {children}
    </Box>
  );
}

type GridProps = BoxProps & {
  columns?: number;
  gap?: keyof typeof tokens.space;
};

export function Grid({ children, columns = 2, gap = 'lg', style, ...rest }: GridProps): ReactElement {
  return (
    <Box
      {...rest}
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
        gap: px(tokens.space[gap]),
        ...style,
      }}
    >
      {children}
    </Box>
  );
}

type TextTag = 'p' | 'span' | 'h1' | 'h2' | 'h3' | 'label';

type TextProps = {
  children?: ReactNode;
  variant?: 'body' | 'caption' | 'title';
  tone?: 'default' | 'muted' | 'accent';
  as?: TextTag;
  style?: CSSProperties;
};

export function Text({ variant = 'body', tone = 'default', as = 'p', style, ...rest }: TextProps): ReactElement {
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

  const textStyle: CSSProperties = {
    margin: px(tokens.space.none),
    fontFamily: tokens.typography.familySans,
    fontSize: px(sizeMap[variant]),
    lineHeight: tokens.typography.lineHeightBase,
    fontWeight: weightMap[variant],
    color: colorMap[tone],
    ...style,
  };

  if (as === 'span') return <span {...rest} style={textStyle} />;
  if (as === 'h1') return <h1 {...rest} style={textStyle} />;
  if (as === 'h2') return <h2 {...rest} style={textStyle} />;
  if (as === 'h3') return <h3 {...rest} style={textStyle} />;
  if (as === 'label') return <label {...rest} style={textStyle} />;

  return (
    <p {...rest} style={textStyle} />
  );
}

type SurfaceProps = BoxProps & {
  elevated?: boolean;
  padded?: boolean;
};

export function Surface({ children, elevated = false, padded = true, style, ...rest }: SurfaceProps): ReactElement {
  return (
    <Box
      {...rest}
      style={{
        backgroundColor: elevated ? tokens.color.surfaceElevated : tokens.color.surface,
        borderStyle: 'solid',
        borderWidth: px(tokens.border.widthThin),
        borderColor: tokens.color.border,
        borderRadius: px(tokens.radius.md),
        padding: padded ? px(tokens.space.lg) : px(tokens.space.none),
        ...style,
      }}
    >
      {children}
    </Box>
  );
}

export function Divider({ style, ...rest }: BoxProps): ReactElement {
  return (
    <Box
      {...rest}
      style={{
        width: '100%',
        borderTopStyle: 'solid',
        borderTopWidth: px(tokens.border.widthThin),
        borderTopColor: tokens.color.border,
        ...style,
      }}
    />
  );
}

type IconName = 'dot' | 'chevronDown' | 'check';

type IconProps = {
  name?: IconName;
  size?: keyof typeof tokens.size;
  color?: keyof typeof tokens.color;
};

export function Icon({ name = 'dot', size = 'iconMd', color = 'text' }: IconProps): ReactElement {
  const iconSize = tokens.size[size];
  const iconColor = tokens.color[color];

  if (name === 'chevronDown') {
    return (
      <svg aria-hidden="true" width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="none">
        <path
          d="M6 9L12 15L18 9"
          stroke={iconColor}
          strokeWidth={tokens.border.widthThin * 2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (name === 'check') {
    return (
      <svg aria-hidden="true" width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="none">
        <path
          d="M5 13L10 18L19 7"
          stroke={iconColor}
          strokeWidth={tokens.border.widthThin * 2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="6" fill={iconColor} />
    </svg>
  );
}
