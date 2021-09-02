import React, { Component } from 'react';  
 import { Platform, StyleSheet, View, Text,  
 Image, TouchableOpacity, Alert } from 'react-native';



 export default class Splashscreen extends Component
{
   constructor(){
     super();
     this.state={
     isVisible : true,
    }
  }


   Hide_Splash_Screen=()=>{
    this.setState({
      isVisible : false
    });
  }

 async componentDidMount(){
    var that = this;
    setTimeout(function(){
      that.Hide_Splash_Screen();
    }, 20000);
   }

    render()
    {
          let Splash_Screen = (
          <View style={styles.SplashScreen_RootView}>
              <View style={styles.container}>
          <Image
          style={{width:'90%',height: '100%', resizeMode: 'contain'}}
          source={require('../assets/sublogo.jpg')}
          />
          </View>
          </View> )


          return(


          <View style = { styles.MainContainer }>
             {Splash_Screen}
            </View>
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
        justifyContent: 'center',
        flex:1,
        margin: 17,
        position: 'absolute',
        width: '100%',
        height: '100%',
      },

    SplashScreen_ChildView:
    {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ce3232',
        flex:1,
    },
    container: {
      paddingTop: 0,
    },
    tinyLogo: {
      width: 500,
      height: 1000,
    },
    logo: {
      width: 66,
      height: 58,
    },
   
});