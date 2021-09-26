import React, { Component } from 'react';  
 import { Platform, StyleSheet, View, Text,  
 Image, TouchableOpacity,Animated, SafeAreaView ,ImageBackground , Dimensions } from 'react-native';

 import { SafeAreaProvider } from 'react-native-safe-area-context';

 export default class Splashscreen extends Component
{
   constructor(){
     super();
     this.state={
     isVisible : true,
     fadeAnim: new Animated.Value(0),
      imgWidth: 0,
      imgHeight: 0
    }
  }


   Hide_Splash_Screen=()=>{
    this.setState({
      isVisible : false
    });
  }

  checkLogIn = async () => {
    const width = 533; // set your local image with
    const height = 527; // set your local image height 
    // calculate image width and height
    const screenWidth = Dimensions.get("window").width;
    const scaleFactor = width / screenWidth;
    const imageHeight = height / scaleFactor;
    this.setState({ imgWidth: screenWidth, imgHeight: imageHeight });
  };

 async componentDidMount(){
    var that = this;

    Animated.timing(
      // Animate over time
      this.state.fadeAnim, // The animated value to drive
      {
        toValue: 1, // Animate to opacity: 1 (opaque)
        duration: 800, // Make it take a while
        useNativeDriver: true
      }
    ).start(this.checkLogIn);

    setTimeout(function(){
      that.Hide_Splash_Screen();
    }, 20000);


   }

//  // <View style={styles.SplashScreen_RootView}>
//  <View style={styles.container}>
//  <Image
//  style={{width:'100%',height: '100%'}}
//  source={require('../assets/main_img.jpg')}
//  // resizeMode='contain'
//  />
//  </View>
//  // </View>

    render()
    {

      const { imgWidth, imgHeight, fadeAnim } = this.state;

          let Splash_Screen = (
            <View style={ styles.container }>
            <Image source={require('../assets/main_img1.jpg')} style={styles.backgroundImage} />
            <View style={ styles.loginForm }>
            <Text>TEST</Text>
            </View>
            </View>
          )


          return(
          <SafeAreaView style={styles.container}>
          <ImageBackground

          source={require('../assets/main_img1.jpg')}
            resizeMode="stretch"
            style={{width:'100%',height:'100%'}}
          />
          </SafeAreaView>
          );
          }
          }


 const styles = StyleSheet.create(
{
    MainContainer:
    {
        flex: 1,
        paddingTop: ( Platform.OS === 'ios' ) ? 20 : 0
    },

    SplashScreen_RootView:
    {
        // justifyContent: 'center',
        flex:1,
        // margin: 17,
        // position: 'absolute',
        // width: '100%',
        // height: '100%',
      },

    SplashScreen_ChildView:
    {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ce3232',
        flex:1,
    },
    container: {
      flex: 1,
      padding: 0,
    },
    tinyLogo: {
      width: 500,
      height: 1000,
    },
    logo: {
      width: 66,
      height: 58,
    },
    imageContainer: {
      flex: 1,
      alignItems: 'stretch'
    },
    image: {
      flex: 1,
      // width:'100%',
      // height:"100%"
    }
   
});