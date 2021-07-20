import React, { Component } from 'react'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Button from '../components/Button'
import Paragraph from '../components/Paragraph'
import AsyncStorage from "@react-native-community/async-storage";
import Stored from '../configuration/storageDetails';

export default class StartScreen extends Component  {
  constructor(props){
    super(props)
    {
      this.state={

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
    }
  }

  render(){
  return (
    <Background>
      <Logo />
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
    </Background>
  )
  }
}
