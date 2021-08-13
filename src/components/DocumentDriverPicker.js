import React, { Component, useState } from 'react';
import { View, Text ,StyleSheet,Image, TouchableOpacity , PermissionsAndroid , Alert  } from 'react-native';
// import { STYLES, COLORS } from '../Styles/Styles';
import { UploadProfile  } from '../configuration/functional'
import * as ImagePicker from "react-native-image-picker";
// import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import  Config from '../configuration/config';
import { Avatar } from 'react-native-paper';
import {Button as PaperButton  } from 'react-native-paper';

const styles = StyleSheet.create({
  tinyLogo: {
    // width: 100,
    // marginTop:5,
    // height: 100,
    alignSelf:'center',
    // position:'absolute'
 },
 FileUploadButton:{
    width:'50%',
    alignContent:"flex-end"
},
})

export default class DocumentDriverPicker extends Component {

  constructor(props){
    super(props)
    {
      this.state={
        resourcePath : "",
        Profile:null,
        onCamera : false,
        id:null
      }
    }
  }

  async componentDidMount(){
    console.log(this.props,"31");
    try {

    //   if(this.props.Profile !== null ){
    //     this.setState({
    //       Profile : this.props.Profile,
    //       id : this.props.id
    //     })
    //   }else{
    //     this.setState({
    //       id : this.props.id
    //     })
    //   }

    console.log(this.props,"DOCUMENTPICKEr");
      
    } catch (error) {
      console.log(error);
    }
  }

  // const [imageSource, setImageSource] = useState(null);

  ChooseImagorFile = async()=>{
    Alert.alert(
      "Document Image Upload",
      "Do you want to upload Document ? ",
      [
        
        { text: "Cancel", onPress: () => console.log("OK Pressed") },
        {
          text: "Open Gallery",
          onPress: () => this.ShiftCametoFile(2)
        },
        {
          text: "Open Camera",
          onPress: () => this.ShiftCametoFile(1),
          style: "cancel"
        }
      ]
    );
  }


  ShiftCametoFile = async(e)=>{

    if(e==1){
      this.setState({
        onCamera : true
      })
    }else{
      this.setState({
        onCamera : false
      })
    }
    console.log(e);
     this.requestCameraPermission()
  }

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
        
        if(this.state.onCamera==true){
          ImagePicker.launchCamera(
            {
              includeBase64: false,
              mediaType: 'photo',
              quality: 0.8,
            },
            async (response) => {
              console.log(response,"this.response");
              if (response.didCancel) {
                console.log('User cancelled image picker');
              } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
              } else {

                const formData=new FormData();

                formData.append("profile_dp",{
                  name: response.fileName,
                  type: response.type,
                  uri: response.uri
                })

                //  let result =await UploadProfile(formData,this.state.id);

                //  if(result){
                  //  console.log(result,"Imagepicker");
                //    this.setState({
                //     Profile : result[0].profile_dp
                //    })
                   this.props.handleChange({
                    name: response.fileName,
                    type: response.type,
                    uri: response.uri
                  })
                //  }
                
              }
            },
          );
        }else{

          ImagePicker.launchImageLibrary(
            {
              includeBase64: false,
              mediaType: 'photo',
              quality: 0.8,
            },
            async (response) => {
              console.log(response,"Library image");
              if (response.didCancel) {
                console.log('User cancelled image picker');
              } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
              } else {
                      const formData=new FormData();

                      formData.append("profile_dp",{
                        name: response.fileName,
                        type: response.type,
                        uri: response.uri
                      })

                    //    let result =await UploadProfile(formData,this.state.id);

                    //    if(result){
                    //     //  console.log(result,"Imagepicker");
                    //      this.setState({
                    //       Profile : result[0].profile_dp
                    //      })
                    //      this.props.handleUserDeatils(result)
                    //    }

                    this.props.handleChange({
                        name: response.fileName,
                        type: response.type,
                        uri: response.uri
                      })
              }
            },
          );

        }

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
    launchImageLibrary(options, callback);

    ImagePicker.showImagePicker(options, response => {
      console.log({ response });

      if (response.didCancel) {
        console.log('User cancelled photo picker');
        Alert.alert('You did not select any image');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        let source = { uri: response.uri };
        console.log({ source });
      }
    });
  }

  render(){
// console.log(`${Config.ACCESS_POINT}/admin/profile/${this.state.Profile}`,"render 187");
  return (
    <PaperButton icon="camera" mode="contained" style={styles.FileUploadButton} onPress={() =>this.ChooseImagorFile()}>
    Upload
    </PaperButton> 
  );
      }
}

