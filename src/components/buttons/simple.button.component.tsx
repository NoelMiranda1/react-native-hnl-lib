import React, { useEffect } from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  NativeModules,
  Platform,
  StyleProp,
  TextStyle,
  ViewStyle,
} from 'react-native';

/**
 *          />________________________________
 *[########[]_________________________________>
 *           \>
 * @author Noel Miranda
 * @date  02:00 PM 21/03/2023
 * @version: 1.0.0
 */

type CustomTextStyleProp = StyleProp<TextStyle> | Array<StyleProp<TextStyle>>;

export interface buttonT {
  onPress: () => void;
  title: string;
  style?: StyleProp<ViewStyle>;
  textStyle?: CustomTextStyleProp;
  disabled?: boolean;
}

const LINKING_ERROR =
  `The package 'react-native-hnl-lib' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

const Button = ({ onPress, title, style, textStyle, disabled }: buttonT) => {
  /**
   * Valida la existencia del packate
   */
  useEffect(() => {
    NativeModules.HnlLib
      ? NativeModules.HnlLib
      : new Proxy(
          {},
          {
            get() {
              throw new Error(LINKING_ERROR);
            },
          }
        );
  }, []);
  return (
    <TouchableOpacity
      disabled={disabled ?? false}
      style={[style, styleLocal.button]}
      onPress={onPress}
    >
      <Text style={[textStyle, styleLocal.text]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styleLocal = StyleSheet.create({
  button: { backgroundColor: '#003082', padding: 10, borderRadius: 10 },
  text: { color: '#fff' },
});

export default Button;
