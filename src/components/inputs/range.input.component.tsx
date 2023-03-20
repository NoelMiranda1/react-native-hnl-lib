/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react';
import type { StyleProp } from 'react-native';
import type { ViewStyle } from 'react-native';
import { Image } from 'react-native';
import {
  TouchableOpacity,
  View,
  NativeModules,
  Platform,
  StyleSheet,
  TextInput,
} from 'react-native';
// ? White Assets
const plusIconWhite = require('../../assets/icons/plus-white.png');
const minusIconWhite = require('../../assets/icons/minus-white.png');
// ? Black Assets
const plusIconBlack = require('../../assets/icons/plus-black.png');
const minusIconBlack = require('../../assets/icons/minus-black.png');

const LINKING_ERROR =
  `The package 'react-native-hnl-lib' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';
type CustomStyleProp = StyleProp<ViewStyle> | Array<StyleProp<ViewStyle>>;

interface props {
  onChange: (counter: number) => void;
  style?: CustomStyleProp;
  initialValue?: number;
  blackIcons: boolean;
  min?: number;
  max?: number;
  width?: number | string;
  leftDisable?: boolean;
  rigthDisable?: boolean;
}

const CounterInput = ({
  onChange,
  style,
  blackIcons,
  initialValue,
  min,
  max,
  width,
  leftDisable,
  rigthDisable,
}: props) => {
  const [counter, setCounter] = useState(initialValue ?? 1);

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

  // Funtions
  const handleOnDecreasePress = () => {
    // let value;
    if (min === undefined || counter > min) {
      //   value = counter - 1;
      setCounter((prevState: number) => prevState - 1);
      onChange && onChange(counter);
    }
  };

  const handleOnIncreasePress = () => {
    // let value;
    if (max === undefined || counter < max) {
      //   value = counter + 1;
      setCounter((prevState: number) => prevState + 1);
      onChange && onChange(counter);
    }
  };

  // change value from input
  const handleOnChangeText = (text: string) => {
    let input = parseInt(text, 10) || 0;
    let oldNumber = counter;
    if (
      (min !== undefined && input < min) ||
      (max !== undefined && input > max)
    ) {
      setCounter(oldNumber);
      onChange && onChange(oldNumber);
    } else {
      setCounter(input);
      onChange && onChange(input);
    }
  };

  return (
    <View
      style={{
        width,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
      }}
    >
      <TouchableOpacity
        disabled={leftDisable ?? false}
        style={[style, styleLocal.button]}
        onPress={handleOnDecreasePress}
      >
        <Image
          style={{ width: 10, height: 13 }}
          source={blackIcons ? minusIconBlack : minusIconWhite}
        />
      </TouchableOpacity>
      <TextInput
        numberOfLines={1}
        maxLength={6}
        keyboardType="numeric"
        style={[
          styleLocal.textInputStyle,
          { width: width ? width : counter.toString().length > 3 ? 100 : 40 },
        ]}
        onChangeText={handleOnChangeText}
      >
        {counter}
      </TextInput>
      <TouchableOpacity
        disabled={rigthDisable ?? false}
        style={[style, styleLocal.button]}
        onPress={handleOnIncreasePress}
      >
        <Image
          style={{ width: 10, height: 13 }}
          source={blackIcons ? plusIconBlack : plusIconWhite}
        />
      </TouchableOpacity>
    </View>
  );
};

const styleLocal = StyleSheet.create({
  button: { backgroundColor: '#003082', padding: 10, borderRadius: 10 },
  text: { color: '#fff' },
  textInputStyle: {
    width: 40,
    minHeight: 20,
    fontSize: 18,
    marginTop: 12,
    marginBottom: 8,
    alignSelf: 'center',
    textAlign: 'center',
    backgroundColor: '#f2f2f2',
    marginHorizontal: 5,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#D6D5D5',
  },
});

export default CounterInput;
