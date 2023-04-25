import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from 'react-native';
/**
 *          />________________________________
 *[########[]_________________________________>
 *           \>
 * @author Noel Miranda
 * @date  08:00 PM 21/03/2023
 * @version: 1.0.0
 */
/**
 * Props for Checkbox component
 */
interface CheckboxProps {
  /**
   * The value associated with the checkbox. This value will be returned in the onChange event.
   */
  value: any;
  /**
   * Determines whether the checkbox is checked by default.
   * @default false
   */
  defaultChecked?: boolean;
  /**
   * Label to be displayed next to the checkbox.
   */
  label?: string;
  /**
   * Additional style to apply to the checkbox container.
   */
  style?: StyleProp<ViewStyle>;
  /**
   * Determines whether the checkbox is disabled.
   * @default false
   */
  disabled?: boolean;
  /**
   * Callback function that is called when the checkbox is checked or unchecked.
   * The function receives the value of the checkbox and a boolean indicating whether the checkbox is checked or unchecked.
   */
  onChange?: (value: any, checked: boolean) => void;
}
/**
 *A Checkbox component that allows the user to select an option
 *@param {CheckboxProps} props - Props for the Checkbox component
 *@returns {JSX.Element} Checkbox component
 */
const Checkbox = ({
  value,
  defaultChecked = false,
  label = '',
  style = {},
  onChange,
  disabled,
}: CheckboxProps) => {
  const [checked, setChecked] = useState(defaultChecked);

  const handlePress = () => {
    const newChecked = !checked;
    setChecked(newChecked);
    if (onChange) {
      onChange(value, newChecked);
    }
  };

  return (
    <TouchableOpacity
      disabled={disabled ?? false}
      onPress={handlePress}
      style={[styles.checkbox, style]}
    >
      <View
        style={[
          styles.checkboxContainer,
          checked && styles.checkboxContainerChecked,
        ]}
      >
        {checked && <Text style={styles.checkboxIcon}>✓</Text>}
      </View>
      {label && <Text style={styles.checkboxLabel}>{label}</Text>}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  checkbox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkboxContainer: {
    borderWidth: 1,
    borderColor: '#888',
    borderRadius: 5,
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 5,
  },
  checkboxContainerChecked: {
    backgroundColor: '#888',
  },
  checkboxIcon: {
    color: '#fff',
  },
  checkboxLabel: {
    fontSize: 16,
  },
});

export default Checkbox;
