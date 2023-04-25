import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from 'react-native';

/**
 *          />________________________________
 *[########[]_________________________________>
 *           \>
 * @author Noel Miranda
 * @date  05:00 PM 21/03/2023
 * @version: 1.0.0
 */
/**
 *
 *@typedef Option
 *@property {string} value - Valor de la opción
 *@property {string} label - Etiqueta de la opción
 */
type Option = {
  value: string;
  label: string;
};
/**
 *
 *Propiedades del componente Select
 *@typedef SelectProps
 *@property {Option[]} options - Arreglo de opciones
 *@property {string} [placeholder] - Texto a mostrar cuando no se ha seleccionado ninguna opción
 *@property {string} [defaultSelectedValue] - Valor pre-seleccionado
 *@property {(value: string) => void} onChange - Función a ejecutar cuando se selecciona una opción
 */
type SelectProps = {
  options: Option[];
  placeholder?: string;
  defaultSelectedValue?: string;
  onChange: (value: string) => void;
};

/**
 *
 *Componente para contener el Select y limitar su altura
 *@param {{
 *   children: React.ReactNode,
 *   height: any
 *   }} props - Propiedades del componente
 *   @returns {JSX.Element}
 *
 */
const SelectContainer = ({
  children,
  height,
}: {
  children: React.ReactNode;
  height: any;
}) => {
  return <View style={[styles.selectContainer, { height }]}>{children}</View>;
};

/**
 *
 *Componente para contener las opciones del Select
 *@param {{
 *    children: React.ReactNode
 *}} props - Propiedades del componente
 *@returns {JSX.Element}
 */
const OptionsContainer = ({ children }: { children: React.ReactNode }) => {
  return <View style={styles.optionsContainer}>{children}</View>;
};

/**
 *
 *Componente Select para elegir entre un conjunto de opciones
 *@param {SelectProps} props - Propiedades del componente
 *@returns {JSX.Element}
 */
const Select = ({
  options,
  placeholder,
  defaultSelectedValue,
  onChange,
}: SelectProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedValue, setSelectedValue] = useState(defaultSelectedValue);

  /**
   *
   *Función para manejar la selección de una opción
   *@param {string} value - Valor de la opción seleccionada
   *@returns {void}
   */
  const handleSelect = (value: string) => {
    setSelectedValue(value);
    onChange(value);
    setIsVisible(false);
  };
  const optionsContainerHeight = options.length * 20;
  return (
    <SelectContainer height={isVisible ? optionsContainerHeight : 50}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => setIsVisible(true)}
      >
        <Text style={styles.buttonText}>
          {selectedValue ? selectedValue : placeholder}
        </Text>
      </TouchableOpacity>
      {isVisible && (
        <OptionsContainer>
          <FlatList
            nestedScrollEnabled={true}
            data={options}
            keyExtractor={(item) => `key-${item.value}`}
            renderItem={({ item }) => (
              <TouchableOpacity
                key={item.value}
                style={styles.option}
                onPress={() => handleSelect(item.value)}
              >
                <Text style={styles.textItem}>{item.label}</Text>
              </TouchableOpacity>
            )}
          />
        </OptionsContainer>
      )}
    </SelectContainer>
  );
};

const styles = StyleSheet.create({
  textItem: { left: 10 },
  selectContainer: {
    height: 50,
    overflow: 'hidden',
  },
  button: {
    borderColor: '#E3E3E3',
    borderWidth: 1,
    overflow: 'hidden',
    padding: 10,
  },
  buttonText: {
    textAlign: 'left',
  },
  optionsContainer: {
    backgroundColor: '#E1E1E1',
    maxHeight: 150,
    overflow: 'scroll',
  },
  option: {
    paddingVertical: 10,
  },
});

export default Select;
