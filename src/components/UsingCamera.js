import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  PermissionsAndroid,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
// import {styles} from '../screens/WeatherScreen/styles';
import Ionic from 'react-native-vector-icons/Ionicons';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import { RNCamera } from 'react-native-camera';

const UsingCamera = ({navigation}) => {
  const [imageUri, setImageUri] = useState(null);
  const onBack = () => {
    navigation.goBack('weatherScreen');
  };

  const requestPermissionCamera = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('OK');
        const result = await launchCamera({
          mediaType: 'photo',
          cameraType: 'back',
          quality: 1,
        });
        setImageUri(result?.assets[0]?.uri);
      } else {
        console.log('Tu choi');
      }
    } catch (err) {
      console.log('Nguoi dung huy chup anh')
    }
  };

  const onCamera = () => {
    requestPermissionCamera();
  };
  return (
    <View style={[styles.container, {marginTop: 30}]}>
      <TouchableOpacity onPress={onBack}>
        <Ionic name="arrow-back" size={26} style={styles.iconBack} />
      </TouchableOpacity>
      <Text style={styles.title}>Chụp ảnh</Text>
      <TouchableOpacity onPress={onCamera}>
        <Ionic name="camera-outline" size={26} style={styles.iconCamera} />
      </TouchableOpacity>
      <View style={styles.container}>
      {/* Camera Preview */}
      <RNCamera style={styles.cameraPreview} type={RNCamera.Constants.Type.back} />

      {/* Overlay View */}
      <View style={styles.overlay}>
        <TouchableOpacity onPress={onCamera} style={styles.cameraButton}>
          <Text style={styles.cameraButtonText}>Take Photo</Text>
        </TouchableOpacity>
      </View>

      {/* Display Captured Image */}
      {imageUri && <Image source={{ uri: imageUri }} style={styles.capturedImage} />}
    </View>
    </View>
  );
};

export default UsingCamera;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cameraPreview: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject, // Cover the entire screen with overlay
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black background
  },
  cameraButton: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
  },
  cameraButtonText: {
    color: 'black',
  },
  capturedImage: {
    width: 200,
    height: 200,
    marginTop: 20,
  },
});
