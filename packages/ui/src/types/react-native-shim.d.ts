declare module 'react-native' {
  import type { ComponentType, ReactNode } from 'react';

  export type ViewStyle = Record<string, string | number | undefined>;
  export type TextStyle = Record<string, string | number | undefined>;

  export type TextInputProps = {
    style?: ViewStyle | ViewStyle[];
    placeholder?: string;
    placeholderTextColor?: string;
    value?: string;
    onChangeText?: (value: string) => void;
  };

  export const View: ComponentType<{ style?: ViewStyle | ViewStyle[]; children?: ReactNode }>;
  export const Text: ComponentType<{ style?: TextStyle | TextStyle[]; children?: ReactNode }>;
  export const Pressable: ComponentType<{
    style?: ViewStyle | ViewStyle[];
    children?: ReactNode;
    onPress?: () => void;
    disabled?: boolean;
    onPressOut?: () => void;
  }>;
  export const TextInput: ComponentType<TextInputProps>;
  export const Modal: ComponentType<{
    visible?: boolean;
    transparent?: boolean;
    animationType?: 'none' | 'slide' | 'fade';
    onRequestClose?: () => void;
    children?: ReactNode;
  }>;
}
