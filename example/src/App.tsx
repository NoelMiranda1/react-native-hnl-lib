import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { SimpleButton, suma, CounterInput } from 'react-native-hnl-lib';

export default function App() {
  return (
    <View style={styles.container}>
      <SimpleButton
        onPress={() => console.log('hola')}
        title={`Suma: ${suma(10, 16)}`}
      />
      <CounterInput
        blackIcons={false}
        onChange={(value) => console.log('valor: ', value)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
