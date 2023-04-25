import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  NativeModules,
  Platform,
} from 'react-native';
const { width } = Dimensions.get('window');

interface CarouselProps {
  images: Array<string>;
}
/**
 *          />________________________________
 *[########[]_________________________________>
 *           \>
 * @author Noel Miranda
 * @date  12:00 PM 21/03/2023
 * @version: 1.0.0
 *Componente que muestra una lista de imágenes en un carrusel.
 *@typedef {Object} CarouselProps
 *@property {Array<string>} images - Una lista de URLs de imágenes para mostrar en el carrusel.
 *@param {CarouselProps} props - Las propiedades del componente.
 *@returns {JSX.Element} - El componente de carrusel.
 */

const LINKING_ERROR =
  `The package 'react-native-hnl-lib' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

const Carousel = ({ images }: CarouselProps) => {
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
  /*
   *El índice actual de la imagen que se está mostrando en el carrusel.
   *@type {[number, React.Dispatch<React.SetStateAction<number>>]}
   */
  const [currentIndex, setCurrentIndex] = useState(0);
  /*
   *Indica si el carrusel debe reproducirse automáticamente.
   *@type {[boolean, React.Dispatch<React.SetStateAction<boolean>>]}
   */
  const [autoPlay, setAutoPlay] = useState(true);
  /**
   *Indica si las imágenes se están cargando.
   *@type {[boolean, React.Dispatch<React.SetStateAction<boolean>>]}
   */
  const [loading, setLoading] = useState(true);
  /*
   *Referencia a un temporizador utilizado para controlar la reproducción automática del carrusel.
   *@type {React.MutableRefObject<NodeJS.Timeout | null>}
   */
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  /**
   *
   *Manejador para la reproducción automática del carrusel.
   *@returns {void}
   */
  const handleAutoPlay = () => {
    if (autoPlay) {
      timerRef.current = setTimeout(() => {
        handleNext();
      }, 5000);
    } else {
      clearTimeout(timerRef.current as NodeJS.Timeout);
    }
  };

  useEffect(() => {
    handleAutoPlay();
    return () => clearTimeout(timerRef.current as NodeJS.Timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex, autoPlay]);
  /**
   * Avanza el índice actual al siguiente elemento de la lista de imágenes.
   * Si el índice alcanza el final de la lista, vuelve al primer elemento.
   * La función handleNext utiliza el operador módulo (%) para asegurarse
   * de que el índice permanezca dentro de los límites de la lista de imágenes.
   *  Si currentIndex + 1 es igual al número total de imágenes (images.length),
   * el operador módulo establece el índice actual en cero (el primer elemento de
   * la lista). De lo contrario, el operador módulo simplemente
   * devuelve currentIndex + 1.
   */
  const handleNext = () => {
    setCurrentIndex((currentIndex + 1) % images.length);
  };
  /**
   * Retrocede el índice actual al elemento anterior de la lista de imágenes.
   * Si el índice alcanza el comienzo de la lista, vuelve al último elemento.
   * La función handlePrev utiliza una fórmula similar para asegurarse de que
   * el índice se mantenga dentro de los límites de la lista de imágenes.
   * Si currentIndex - 1 es menor que cero, el operador módulo establece
   * el índice actual en images.length - 1 (el último elemento de la lista).
   * De lo contrario, el operador módulo
   * simplemente devuelve currentIndex - 1 + images.length. Esta fórmula suma
   * images.length al índice actual antes de aplicar el operador módulo
   * para asegurarse de que el resultado sea siempre un número positivo.
   */
  const handlePrev = () => {
    setCurrentIndex((currentIndex - 1 + images.length) % images.length);
  };

  const handleIndicatorPress = (index: number) => {
    setCurrentIndex(index);
    setAutoPlay(false);
  };

  const handleImageLoadEnd = () => {
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        {images.map((image, index) => (
          <Image
            key={index}
            source={{ uri: image }}
            style={[
              styles.image,
              { transform: [{ translateX: -currentIndex * width }] },
            ]}
            resizeMode="contain"
            onLoadEnd={handleImageLoadEnd}
          />
        ))}
        {loading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#0000ff" />
            <Text style={styles.textLoad}>Cargando...</Text>
          </View>
        )}
      </View>
      <View style={styles.indicatorContainer}>
        {images.map((_, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.indicator,
              index === currentIndex && styles.activeIndicator,
            ]}
            onPress={() => handleIndicatorPress(index)}
          />
        ))}
      </View>
      <TouchableOpacity style={styles.buttonPrev} onPress={handlePrev}>
        <Text style={styles.buttonText}>{`<`}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonNext} onPress={handleNext}>
        <Text style={styles.buttonText}>{`>`}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  textLoad: { marginTop: 10 },
  container: {
    flex: 1,
    position: 'relative',
  },
  imageContainer: {
    flexDirection: 'row',
    position: 'relative',
    width,
  },
  image: {
    width,
    height: 200,
  },
  indicatorContainer: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  indicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#C9C6C6',
    marginHorizontal: 5,
  },
  activeIndicator: {
    backgroundColor: '#000382',
  },
  buttonPrev: {
    position: 'absolute',
    top: '40%',
    left: 10,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    elevation: 2,
    zIndex: 999,
  },
  buttonNext: {
    position: 'absolute',
    top: '40%',
    right: 10,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    elevation: 2,
    zIndex: 999,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});

export default Carousel;
