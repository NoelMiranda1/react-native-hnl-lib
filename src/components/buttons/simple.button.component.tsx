import React, { useEffect } from 'react';
import {
  TouchableOpacity,
  Text,
  NativeModules,
  Platform,
  StyleSheet,
} from 'react-native';
import type { buttonT } from 'src/interfaces/components.interfaces';

const LINKING_ERROR =
  `The package 'react-native-hnl-lib' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

const Button = ({ onPress, title, style, textStyle, disabled }: buttonT) => {
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
  button: { backgroundColor: 'blue', padding: 10, borderRadius: 10 },
  text: { color: '#fff' },
});

export default Button;
