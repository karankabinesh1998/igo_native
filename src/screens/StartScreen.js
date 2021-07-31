import React, { Component } from 'react'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Button from '../components/Button'
import Paragraph from '../components/Paragraph'
import AsyncStorage from "@react-native-community/async-storage";
import Stored from '../configuration/storageDetails';
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center"
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10
  }
});

export default class StartScreen extends Component  {
  constructor(props){
    super(props)
    {
      this.state={
          spinner : true
      } 
    }
  }

 async componentDidMount(){

    await AsyncStorage.getItem(Stored.userDetail)
    // console.log(this.props.navigation);
    // await AsyncStorage.removeItem(Stored.userDetail);
    let Stored_Data = await AsyncStorage.getItem(Stored.userDetail);
    let data = Stored_Data !== null ? JSON.parse(Stored_Data) : []
    // console.log(data);
    if(data.length){
      this.props.navigation.navigate('Dashboard')
    }else{
        this.setState({
          spinner : false
        })
    }

  }

  render(){
  return (
    <Background>
      <Logo />
      
      { this.state.spinner == false ? <> 
      
        <Header>Igotaxy Car Rentals</Header>
      <Paragraph>
      The easiest way to start your online travels.
      </Paragraph>
      <Button
        mode="contained"
        style={{backgroundColor:"#ce3232"}}
        onPress={() => this.props.navigation.navigate('LoginScreen')}
      >
        Login
      </Button>
      <Button
        mode="contained"
        style={{backgroundColor:"#ce3232"}}
        onPress={ () => this.props.navigation.navigate('RegisterScreen')}
      >
        Sign Up
      </Button>

       </> : 
       
       <View style={[styles.container, styles.horizontal]}>
         <ActivityIndicator size="large" color="#00ff00" />
      </View>
       
       }
      
    </Background>
  )
  
  }
  
}
