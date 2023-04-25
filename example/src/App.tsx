/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  Alert as AlertRN,
} from 'react-native';
import {
  SimpleButton,
  suma,
  CounterInput,
  TopBarEnviroment,
  // generateCURL,
  Alert,
  Carousel,
  TextArea,
  Checkbox,
  Select,
  Steps,
  StepStatus,
} from 'react-native-hnl-lib';

export default function App() {
  /**
   * Estados y funciones para el Steps
   */
  type Step = {
    id: number;
    title?: string;
    description?: string;
    status: StepStatus;
  };

  const [steps, setSteps] = React.useState<Step[]>([
    {
      id: 1,
      status: StepStatus.InProgress,
    },
    {
      id: 2,
      status: StepStatus.Normal,
    },
    {
      id: 3,
      status: StepStatus.Normal,
    },
    // agregar más pasos aquí según sea necesario
  ]);

  const [currentStep, setCurrentStep] = React.useState(0);

  const handleNextStep = () => {
    if (currentStep < steps.length - 1) {
      const newSteps = [...steps];
      const currentStepObj = newSteps[currentStep]; // guardar una referencia al objeto del paso actual
      if (currentStepObj) {
        // verificar que el objeto exista antes de actualizarlo
        currentStepObj.status = StepStatus.Completed;
      }
      setSteps(newSteps);
      setCurrentStep(currentStep + 1);
    } else if (currentStep === steps.length - 1) {
      const newSteps = [...steps];
      const currentStepObj = newSteps[currentStep];
      if (currentStepObj) {
        currentStepObj.status = StepStatus.Completed;
      }
      setSteps(newSteps);
      setCurrentStep(currentStep);
      AlertRN.alert('¡Has completado todos los pasos!');
    }
  };

  /**
   * FIN STEPS
   */
  /**
   * Estados y funciones para el Selected
   */
  const [selectedValue, setSelectedValue] = React.useState('');

  const handleSelectChange = (value: string) => {
    setSelectedValue(value);
  };
  const optionsSelected = [
    { value: 'option1', label: 'Opción 1' },
    { value: 'option2', label: 'Opción 2' },
    { value: 'option3', label: 'Opción 3' },
    { value: 'option4', label: 'Opción 4' },
    { value: 'option5', label: 'Opción 5' },
    { value: 'option6', label: 'Opción 6' },
    { value: 'option7', label: 'Opción 7' },
    { value: 'option8', label: 'Opción 8' },
  ];

  console.log('selectedValue', selectedValue);
  /**
   * FIN DE SELECTED
   */
  /**
   * Estados y funciones para el componente checkbox
   */
  const [options, setOptions] = React.useState([
    { label: 'Option 1', value: 'option1', checked: false },
    { label: 'Option 2', value: 'option2', checked: false },
    { label: 'Option 3', value: 'option3', checked: false },
  ]);

  const handleOptionChange = (value: any, checked: boolean) => {
    // Seleccion multiple
    const newOptions = options.map((option) =>
      option.value === value ? { ...option, checked } : option
    );
    // Solo se selecciona uno y el resto en false
    // DEBE AGREGAR AL OBJETO DE OPCIONES KEY DISABLED
    // const newOptions = options.map((option) => {
    //   if (option.value === value) {
    //     return { ...option, checked, disable: false };
    //   } else {
    //     return { ...option, checked: false, disable: checked };
    //   }
    // });
    setOptions(newOptions);
  };

  /**
   * FIn de checkbox
   */
  /**
   * Estados yy funciones para el Alert
   */
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    setVisible(true);

    return () => {};
  }, []);
  /**
   * Fin de Alert
   */
  /**
   * Estados y funcion para el text Area
   */
  const [text, setText] = React.useState('');
  const handleButtonClick = () => {
    console.log('El valor: ', text);
  };
  /**
   * Fin de text Area
   */

  // generateCURL({
  //   url: res.config.url,
  //   dataRaw: res.config.data,
  //   headers: res.config.headers,
  //   method: res.config.method,
  // });
  /**
   * Arreglo de imagenes para el carrusel
   */
  const images = [
    'https://images.unsplash.com/photo-1678905029643-741e60ef88d5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1529&q=80',
    'https://images.unsplash.com/photo-1678954129535-9f0d186570ea?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1866&q=80',
    'https://i.pinimg.com/236x/0d/a8/87/0da8872e1ca3e247aef7f75f64a75a5f--learn-coding-logos.jpg',
    'https://www.evanmiller.org/images/four-days-of-go/gopher3.png',
    'https://talks.golang.org/2013/highperf/aegopher.jpg',
    'http://gophercloud.io/public/logo.png',
    'https://images.unsplash.com/photo-1679178936583-af19713f2a1c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
  ];
  /**
   * Fin carrusel
   */
  return (
    <TopBarEnviroment env="qa">
      <ScrollView style={{ flex: 1 }} keyboardShouldPersistTaps={'always'}>
        <View style={{ flex: 1, alignItems: 'center' }}>
          <View style={{ width: '90%' }}>
            <Steps steps={steps} currentStep={currentStep} />
            <View style={styles.buttonContainer}>
              <SimpleButton title="Siguiente" onPress={handleNextStep} />
            </View>
          </View>
          <View style={{ width: '90%', marginVertical: 10 }}>
            <Text>Selecciona una opción:</Text>
            <Select
              options={optionsSelected}
              placeholder="Seleccionar una opción"
              onChange={handleSelectChange}
            />
          </View>

          <View style={styles.row}>
            {options.map((option) => (
              <Checkbox
                key={option.value}
                value={option.value}
                label={option.label}
                defaultChecked={option.checked}
                onChange={handleOptionChange}
                // debe agregar al options key disabled
                // para seleccion unica
                // disable={option.disabled}
              />
            ))}
          </View>

          <Text style={styles.selectedOptions}>
            Selected options:{' '}
            {options
              .filter((option) => option.checked)
              .map((option) => option.label)
              .join(', ')}
          </Text>

          <TextArea
            placeholder="Type here"
            inputStyle={styles.textAreaInput}
            value={text}
            onChangeText={setText}
          />
          <SimpleButton
            style={{ marginVertical: 10 }}
            title="Enviar"
            onPress={handleButtonClick}
          />
          <SimpleButton
            onPress={() => console.log('hola')}
            title={`Suma: ${suma(10, 16)}`}
          />
          <View style={{ height: 300, marginVertical: 10 }}>
            <Carousel images={images} />
          </View>

          <CounterInput
            blackIcons={false}
            onChange={(value) => console.log('valor: ', value)}
          />
        </View>
      </ScrollView>
      <Alert
        title="Hola"
        description="Fin de steps"
        confirmText="Ok"
        onConfirm={() => {
          setVisible(false);
        }}
        onClose={() => {
          setVisible(false);
        }}
        visible={visible}
      />
    </TopBarEnviroment>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginTop: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginVertical: 5,
  },
  selectedOptions: {
    color: '#000',
    fontSize: 18,
  },
  textAreaInput: {
    height: 100,
    backgroundColor: '#f1f1f1',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingTop: 16,
    textAlignVertical: 'top',
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
    width: '90%',
    marginHorizontal: 10,
    marginVertical: 10,
  },
});
