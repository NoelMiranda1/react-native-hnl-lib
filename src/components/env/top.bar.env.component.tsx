import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Platform,
  NativeModules,
} from 'react-native';
import React, { useEffect } from 'react';

/**
 *          />________________________________
 *[########[]_________________________________>
 *           \>
 * @author Noel Miranda
 * @date  10:00 AM 21/03/2023
 * @version: 1.0.0
 */
interface props {
  children: any;
  env: string;
  mainEnvironment?: string;
}

const LINKING_ERROR =
  `The package 'react-native-hnl-lib' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

const TopBarEnviroment = (props: props) => {
  const { children, env, mainEnvironment } = props;
  /**
   * Valida la existencia del package
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
    <SafeAreaView style={styles.flex}>
      <View style={styles.flex}>
        {env !== (mainEnvironment ?? 'prod') && (
          <View style={styles.containter}>
            <Text style={styles.text}>Entorno: {`${env.toUpperCase()}`}</Text>
          </View>
        )}
        {children}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  containter: {
    height: 30,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0EBC37',
  },
  text: {
    color: '#FFF',
    fontSize: 20,
    textAlign: 'center',
  },
  flex: {
    flex: 1,
  },
});

export default TopBarEnviroment;
