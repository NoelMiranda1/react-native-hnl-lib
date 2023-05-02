import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StyleProp,
  TextStyle,
  Platform,
  NativeModules,
} from 'react-native';

const LINKING_ERROR =
  `The package 'react-native-hnl-lib' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

/**
 * Tipo para las propiedades de estilo personalizadas que se pueden pasar al componente Alert.
 * Puede ser un solo estilo o una matriz de estilos.
 * @typedef {import('react-native').StyleProp<import('react-native').TextStyle> | import('react-native').StyleProp<import('react-native').TextStyle>[]} CustomStyleProp
 */
type CustomStyleProp = StyleProp<TextStyle> | Array<StyleProp<TextStyle>>;

interface Props {
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  onClose: () => void;
  visible: boolean;
  titleStyle?: CustomStyleProp;
  discriptionStyle?: CustomStyleProp;
}
/**
 *          />________________________________
 *[########[]_________________________________>
 *           \>
 * @author Noel Miranda
 * @date  09:50 PM 21/03/2023
 * @version: 1.1.0
 * @typedef {Object} Props
 * @property {string} title - El título del alerta.
 * @property {string} description - La descripción del alerta.
 * @property {string} [confirmText='Confirmar'] - El texto del botón de confirmación.
 * @property {string} [cancelText='Cancelar'] - El texto del botón de cancelación.
 * @property {() => void} [onConfirm] - La función que se ejecuta cuando se pulsa el botón de confirmación.
 * @property {() => void} [onCancel] - La función que se ejecuta cuando se pulsa el botón de cancelación.
 * @property {() => void} onClose - La función que se ejecuta cuando se pulsa el botón de cerrar o cuando se toca fuera del alerta.
 * @property {boolean} visible - Indica si el alerta está visible o no.
 * @property {CustomStyleProp} [titleStyle] - El estilo personalizado del texto del título.
 * @property {CustomStyleProp} [discriptionStyle] - El estilo personalizado del texto de la descripción.
 */
const Alert: React.FC<Props> = ({
  title,
  description,
  confirmText = 'Confirmar',
  cancelText = 'Cancelar',
  onConfirm,
  onCancel,
  visible,
  onClose,
  titleStyle,
  discriptionStyle,
}:Props) => {
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
  /**
   * La función que se ejecuta cuando se pulsa el botón de confirmación.
   */
  const handleConfirm = () => {
    onConfirm && onConfirm();
  };
  /**
   * La función que se ejecuta cuando se pulsa el botón de cancelación.
   */
  const handleCancel = () => {
    onCancel && onCancel();
  };
  /**
   * No Renderiza el componente.
   */
  if (!visible) {
    return null;
  }

  return (
    <View style={[styles.container]}>
      <View style={styles.alert}>
        <View style={styles.close}>
          <TouchableOpacity onPress={onClose}>
            <Text style={styles.X}>x</Text>
          </TouchableOpacity>
        </View>
        <Text style={[styles.title, titleStyle]}>{title}</Text>
        <Text style={[styles.description, discriptionStyle]}>
          {description}
        </Text>
        <View style={styles.buttons}>
          {onCancel && (
            <TouchableOpacity
              style={[styles.button, styles.cancelButton]}
              onPress={handleCancel}
            >
              <Text style={styles.buttonText}>{cancelText}</Text>
            </TouchableOpacity>
          )}
          {onConfirm && (
            <TouchableOpacity
              style={[styles.button, styles.confirmButton]}
              onPress={handleConfirm}
            >
              <Text style={styles.buttonText}>{confirmText}</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  X: { fontWeight: 'bold', fontSize: 23, color: '#003082' },
  close: { position: 'absolute', right: 10, top: 2 },
  container: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  alert: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  button: {
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 10,
  },
  cancelButton: {
    backgroundColor: 'grey',
  },
  confirmButton: {
    backgroundColor: '#003082',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default Alert;
