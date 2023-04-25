import React, { FC } from 'react';
import {
  TextInput,
  TextInputProps,
  StyleSheet,
  StyleProp,
  TextStyle,
} from 'react-native';
/**
 *          />________________________________
 *[########[]_________________________________>
 *           \>
 * @author Noel Miranda
 * @date  10:00 AM 21/03/2023
 * @version: 1.0.0
 */
/**
 * Props del componente `TextArea`.
 */
type CustomStyleProp = StyleProp<TextStyle> | Array<StyleProp<TextStyle>>;

interface TextAreaProps extends TextInputProps {
  /**
   * Estilos personalizados para el input del componente.
   */
  inputStyle?: CustomStyleProp;
}
/**
 * Componente `TextArea` que representa un área de texto para input de texto.
 */
const TextAreaHnl: FC<TextAreaProps> = (props) => {
  const { inputStyle, ...rest } = props;

  return <TextInput multiline style={[styles.input, inputStyle]} {...rest} />;
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: '#f2f2f2',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
    fontFamily: 'Arial',
    fontWeight: 'normal',
    width: '100%',
  },
});

export { TextAreaProps };
export default TextAreaHnl;
