import React, { Component, useState } from 'react';
import { View, Text ,StyleSheet,Image, TouchableOpacity , PermissionsAndroid , Alert  } from 'react-native';
import * as ImagePicker from "react-native-image-picker";
import  Config from '../configuration/config';
import { UploadAppDocumentUpload } from '../configuration/functional';


const styles = StyleSheet.create({
    tinyLogo: {
      width: "50%",
      // marginTop:5,
      height: "50%",
      alignSelf:'center',
      // position:'absolute'
   },
   TouchOPP:{
       marginTop:10
   },
   tinyLogo1:{
    width: 100,
    height: 150,
      alignSelf:'center',
   }
  })

export default class DocumentImagePicker extends Component {
    constructor(props){
        super(props)
        {
          this.state={
            resourcePath : "",
            DocumentATion:null,
            onCamera : false,
            id:null,
            docname:null
          }
        }
      }


      async componentDidMount(){
        console.log(this.props,"31");
        try {
    
          if(this.props.Profile !== null  ){
            this.setState({
                DocumentATion : this.props.Profile,
                id : this.props.id,
                docname:this.props.docname
            })
          }else{
            this.setState({
              id : this.props.id,
              docname:this.props.docname
            })
          }
          
        } catch (error) {
          console.log(error);
        }
      }


      ChooseImagorFile = async()=>{
        Alert.alert(
          "Profile Image Upload",
          "Do you want to upload Profile Image ? ",
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
    
                          formData.append(`${this.state.docname}`,{
                           
                              name: response.fileName,
                            type: response.type,
                            uri: response.uri
                            
                          })
                          formData.append("userid",this.state.id);
                          formData.append(`${this.state.docname}`,this.state.DocumentATion)
    
                           let result =await UploadAppDocumentUpload(formData);
    
                           if(result){
                              console.log(result[0][`${this.state.docname}`],"Imagepicker");
                             this.setState({
                              DocumentATion : result[0][`${this.state.docname}`]
                             })
                             this.props.handleUserDeatils(this.state.docname,result[0][`${this.state.docname}`])
                           }
                    
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
    
                          formData.append(`${this.state.docname}`,{
                           
                              name: response.fileName,
                            type: response.type,
                            uri: response.uri
                            
                          })
                          formData.append("userid",this.state.id);
                          formData.append(`${this.state.docname}`,this.state.DocumentATion=='null' ? null : this.state.DocumentATion )
    
                           let result =await UploadAppDocumentUpload(formData);
    
                           if(result){
                              console.log(result[0][`${this.state.docname}`],"Imagepicker");
                             this.setState({
                              DocumentATion : result[0][`${this.state.docname}`]
                             })
                             this.props.handleUserDeatils(this.state.docname,result[0][`${this.state.docname}`])
                           }
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

      render(){
        console.log(this.state.DocumentATion,`${this.state.docname}`);
        return(
            <TouchableOpacity
            style={styles.TouchOPP}
        onPress={() =>this.ChooseImagorFile()}
      >

{this.state.DocumentATion == null ? 
<Image source={require('../assets/upload-01.png')} style={styles.tinyLogo1} /> : <Image
style={styles.tinyLogo}
source={{
uri: `${Config.ACCESS_POINT}/admin/vendarfile/${this.state.DocumentATion}/${this.state.id}`,
}}
/> }
 </TouchableOpacity>
        )

      }
}

