import React, { useState, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Animated,
  StatusBar,
} from 'react-native';
import { Camera } from 'react-native-camera-kit';
import { CameraApi, CameraType, CaptureData } from 'react-native-camera-kit';


const UsingScanner = ({ onBack }) => {
  const cameraRef = useRef(null);
  // const [currentFlashArrayPosition, setCurrentFlashArrayPosition] = useState(0);
  const [captureImages, setCaptureImages] = useState([]);
  // const [flashData, setFlashData] = useState(flashArray[currentFlashArrayPosition]);
  const [torchMode, setTorchMode] = useState(false);
  const [captured, setCaptured] = useState(false);
  const [cameraType, setCameraType] = useState(CameraType.Back);
  const [showImageUri, setShowImageUri] = useState('');
  const [zoom, setZoom] = useState();
  const [hide, setHide] = useState(false);
  const [orientationAnim] = useState(new Animated.Value(3));
  const isCapturing = useRef(false);

  const numberOfImagesTaken = () => {
    const numberTook = captureImages.length;
    if (numberTook >= 2) {
      return numberTook;
    } else if (captured) {
      return '1';
    } else {
      return '';
    }
  };

  // const onBack = () => {

  // }

  const onSwitchCameraPressed = () => {
    const direction = cameraType === CameraType.Back ? CameraType.Front : CameraType.Back;
    setCameraType(direction);
    setZoom(1);
  };

  // const onSetFlash = () => {
  //   const newPosition = (currentFlashArrayPosition + 1) % 3;
  //   setCurrentFlashArrayPosition(newPosition);
  //   setFlashData(flashArray[newPosition]);
  // };

  const onSetTorch = () => {
    setTorchMode(!torchMode);
  };

  const onCaptureImagePressed = async () => {
    if (showImageUri) {
      setShowImageUri('');
      return;
    }
    if (!cameraRef.current || isCapturing.current) return;
    let image;
    try {
      isCapturing.current = true;
      image = await cameraRef.current.capture();
    } catch (e) {
      console.log('error', e);
    } finally {
      isCapturing.current = false;
    }
    if (!image) return;

    setCaptured(true);
    setCaptureImages([...captureImages, image]);
    console.log('image', image);
  };

  function CaptureButton({ onPress, children }) {
    const w = 80, brdW = 4, spc = 6;
    const cInner = 'white', cOuter = 'white';
    return (
      <TouchableOpacity onPress={onPress} style={{ width: w, height: w }}>
        <View
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            width: w,
            height: w,
            borderColor: cOuter,
            borderWidth: brdW,
            borderRadius: w / 2,
          }}
        />
        <View
          style={{
            position: 'absolute',
            left: brdW + spc,
            top: brdW + spc,
            width: w - ((brdW + spc) * 2),
            height: w - ((brdW + spc) * 2),
            backgroundColor: cInner,
            borderRadius: (w - ((brdW + spc) * 2)) / 2,
          }}
        />
        {children}
      </TouchableOpacity>
    );
  }

  // const rotateUi = true;
  // const uiRotation = orientationAnim.interpolate({
  //   inputRange: [1, 4],
  //   outputRange: ['180deg', '-90deg'],
  // });
  // const uiRotationStyle = rotateUi ? { transform: [{ rotate: uiRotation }] } : undefined;

  // function rotateUiTo(rotationValue) {
  //   Animated.timing(orientationAnim, {
  //     toValue: rotationValue,
  //     useNativeDriver: true,
  //     duration: 200,
  //     isInteraction: false,
  //   }).start();
  // }

  return (
    <View style={styles.screen}>
      <StatusBar hidden />
      <SafeAreaView style={styles.topButtons}>
        {/* {flashData.image && (
          <TouchableOpacity style={styles.topButton} onPress={onSetFlash}>
            <Animated.Image
              source={flashData.image}
              resizeMode="contain"
              style={[styles.topButtonImg, uiRotationStyle]}
            />
          </TouchableOpacity>
        )} */}

        <TouchableOpacity style={styles.topButton} onPress={onSwitchCameraPressed}>
          <Animated.Image
            source={require('../assets/images/pressure.png')}
            resizeMode="contain"
            style={[styles.topButtonImg]}
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.topButton} onPress={() => setZoom(2)}>
          <Animated.Text style={[styles.zoomFactor]}>
            {zoom ? Number(zoom).toFixed(2) : '??'}x
          </Animated.Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.topButton} onPress={onSetTorch}>
          <Animated.Image
            source={torchMode ? require('../assets/images/pressure.png') : require('../assets/images/pressure.png')}
            resizeMode="contain"
            style={[styles.topButtonImg]}
          />
        </TouchableOpacity>
      </SafeAreaView>

      <View style={styles.cameraContainer}>
        {showImageUri ? (
          <Image source={{ uri: showImageUri }} style={styles.cameraPreview} resizeMode="contain" />
        ) : (
          <Camera
            ref={cameraRef}
            style={styles.cameraPreview}
            cameraType={cameraType}
            // flashMode={flashData?.mode}
            resetFocusWhenMotionDetected
            zoom={zoom}
            maxZoom={10}
            onZoom={(e) => {
              console.log('zoom', e.nativeEvent.zoom);
              setZoom(e.nativeEvent.zoom);
            }}

            torchMode={torchMode ? 'on' : 'off'}
            // onOrientationChange={(e) => {
            //   switch (e.nativeEvent.orientation) {
            //     case Orientation.PORTRAIT_UPSIDE_DOWN:
            //       console.log('orientationChange', 'PORTRAIT_UPSIDE_DOWN');
            //       rotateUiTo(1);
            //       break;
            //     case Orientation.LANDSCAPE_LEFT:
            //       console.log('orientationChange', 'LANDSCAPE_LEFT');
            //       rotateUiTo(2);
            //       break;
            //     case Orientation.PORTRAIT:
            //       console.log('orientationChange', 'PORTRAIT');
            //       rotateUiTo(3);
            //       break;
            //     case Orientation.LANDSCAPE_RIGHT:
            //       console.log('orientationChange', 'LANDSCAPE_RIGHT');
            //       rotateUiTo(4);
            //       break;
            //     default:
            //       console.log('orientationChange', e.nativeEvent);
            //       break;
            //   }
            // }}
          />
        )}
      </View>

      <SafeAreaView style={styles.bottomButtons}>
        <View style={styles.backBtnContainer}>
          <TouchableOpacity onPress={onBack}>
            <Animated.Text style={[styles.backTextStyle]}>Back</Animated.Text>
          </TouchableOpacity>
        </View>

        <View style={styles.captureButtonContainer}>
          <CaptureButton onPress={onCaptureImagePressed}>
            <View style={styles.textNumberContainer}>
              {/* <Text>{numberOfImagesTaken()}</Text> */}
            </View>
          </CaptureButton>
        </View>

        <View style={styles.thumbnailContainer}>
          {captureImages.length > 0 && (
            <TouchableOpacity
              onPress={() => {
                if (showImageUri) {
                  setShowImageUri('');
                } else {
                  setShowImageUri(captureImages[captureImages.length - 1].uri);
                }
              }}
            >
              <Image
                source={{ uri: captureImages[captureImages.length - 1].uri }}
                style={styles.thumbnail}
              />
            </TouchableOpacity>
          )}
        </View>
      </SafeAreaView>
    </View>
  );
};

export default UsingScanner;

const styles = StyleSheet.create({
  screen: {
    height: '100%',
    backgroundColor: 'black',
  },
  topButtons: {
    margin: 10,
    zIndex: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  topButton: {
    backgroundColor: '#222',
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  topButtonImg: {
    margin: 10,
    width: 24,
    height: 24,
  },
  cameraContainer: {
    justifyContent: 'center',
    flex: 1,
  },
  cameraPreview: {
    aspectRatio: 2.5 / 4,
    width: '80%',
    alignSelf: 'center',
    borderColor: 'green',
    borderWidth: 1
  },
  bottomButtons: {
    margin: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backBtnContainer: {
    flex: 1,
    alignItems: 'flex-start',
  },
  backTextStyle: {
    padding: 10,
    color: 'white',
    fontSize: 20,
  },
  captureButtonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textNumberContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  zoomFactor: {
    color: '#ffffff',
  },
  thumbnailContainer: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  thumbnail: {
    width: 48,
    height: 48,
    borderRadius: 4,
    marginEnd: 10,
  },
});
