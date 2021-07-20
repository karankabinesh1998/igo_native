import React, { Component, useState } from 'react';
import { View, Text , TouchableOpacity , PermissionsAndroid , Alert  } from 'react-native';
import { STYLES, COLORS } from '../Styles/Styles';
import * as ImagePicker from "react-native-image-picker";
// import {launchCamera, launchImageLibrary} from 'react-native-image-picker';


export default class SimpleImagePicker extends Component {

  constructor(props){
    super(props)
    {
      this.state={
        resourcePath : ""
      }
    }
  }


  // const [imageSource, setImageSource] = useState(null);


   requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: "App Camera Permission",
          message:"App needs access to your camera ",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("Camera permission given");
        ImagePicker.launchCamera(
          {
            includeBase64: false,
            mediaType: 'photo',
            quality: 0.8,
          },
          async (response) => {
            console.log(response);
            if (response.didCancel) {
              console.log('User cancelled image picker');
            } else if (response.error) {
              console.log('ImagePicker Error: ', response.error);
            } else {
              
            }
          },
        );
      } else {
        console.log("Camera permission denied");
      }
    } catch (err) {
      console.warn(err);
    }
  };

   selectImage = () => {
    let options = {
      title: 'You can choose one image',
      maxWidth: 256,
      maxHeight: 256,
      storageOptions: {
        skipBackup: true
      }
    };
    launchCamera(options, callback);

    // ImagePicker.showImagePicker(options, response => {
    //   console.log({ response });

    //   if (response.didCancel) {
    //     console.log('User cancelled photo picker');
    //     Alert.alert('You did not select any image');
    //   } else if (response.error) {
    //     console.log('ImagePicker Error: ', response.error);
    //   } else if (response.customButton) {
    //     console.log('User tapped custom button: ', response.customButton);
    //   } else {
    //     let source = { uri: response.uri };
    //     console.log({ source });
    //   }
    // });
  }

  render(){

  return (
    <View
      style={[
        STYLES.flex,
        STYLES.centerContainer,
        
      ]}
    >
      <Text style={[STYLES.title, { color: COLORS.primaryLight }]}>
        Simple Image Picker
      </Text>
      <TouchableOpacity
        onPress={() =>this.requestCameraPermission()}
        style={[
          STYLES.selectButtonContainer,
          { backgroundColor: COLORS.primaryLight }
        ]}
      >
        <Text style={STYLES.selectButtonTitle}>Pick an image</Text>
      </TouchableOpacity>
    </View>
  );
      }
}