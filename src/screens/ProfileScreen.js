import { View } from 'native-base';
import { StyleSheet , StatusBar,ScrollView ,Image, RefreshControl, BackHandler ,Alert } from 'react-native';
import React , { useEffect , useState } from 'react'
import CardView from 'react-native-cardview';
// import SimpleImagePicker from '../components/ImagePicker';
import Button from '../components/Button';
import Header from '../components/Header';
import TextInput from '../components/TextInput';
import  Config from '../configuration/config';
import { RefreshJson } from './RefreshJson';
import AsyncStorage from "@react-native-community/async-storage";
import Stored from '../configuration/storageDetails';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
 import { RefreshJsons } from '../configuration/functional'
 

export default function ProfileSCreen({ navigation , userDetail  }) {
         
    let userDetail_ = userDetail.userDetail[0];
    
    // console.log(RefreshJsons(userDetail_.id),"21221");
    let Profile = userDetail_.profile_dp
  const [name, setName] = useState({ value: userDetail_.username, error: '' })
  const [mobile, setmobile] = useState({ value: userDetail_.mobile, error: '' })
  const [email, setEmail] = useState({ value:userDetail_.email_id, error: '' })
  const [address, setAddress] = useState({ value:userDetail_.address, error: '' })

  const [refreshing, setRefreshing] = React.useState(false);


    // console.log(userDetail_ ,"Pressed");
// console.log(`${Config.ACCESS_POINT}/admin/profile/${Profile}`);

const onUpdatePressed =()=>{    }

const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}

const onRefresh = React.useCallback(async() => {

  setRefreshing(true);

 let result = await RefreshJsons(userDetail_.id);
  let Stored_Data = await AsyncStorage.getItem(Stored.userDetail);
  let data1 = Stored_Data !== null ? JSON.parse(Stored_Data) : [];
   setName({ value: result[0].username, error: ''})
   setmobile({ value: result[0].mobile, error: '' })
   setEmail({ value:  result[0].email_id, error: '' })
   setAddress({ value:  result[0].address, error: '' })
  // console.log( result,"Refrehjson");
  wait(5000).then(() => setRefreshing(false));
}, []);

    useEffect(() => {
        const backAction = () => {
          Alert.alert("Hold on!", "Are you sure you want to close the app?", [
            {
              text: "Cancel",
              onPress: () => null,
              style: "cancel"
            },
            { text: "YES", onPress: () => BackHandler.exitApp() }
          ]);
          return true;
        };
    
        const backHandler = BackHandler.addEventListener(
          "hardwareBackPress",
          backAction
        );
    
        return () => backHandler.remove();
      }, []);
    return (
        <View style={styles.container}>

        <CardView
        cardElevation={5}
        cardMaxElevation={5}
        cornerRadius={5}
        style={styles.cardViewStyle}>

            <View style={styles.ViewcardBelow}>

    <ScrollView
    // stickyHeaderIndices={[1]}
    showsVerticalScrollIndicator={false}
    refreshControl={
      <RefreshControl
        refreshing={refreshing}
        onRefresh={onRefresh}
      />}
    >
           
            <Header style={styles.heading}>Your Profile</Header>
            <View style={styles.ViewcardBelow1}>
{Profile == null ? 
<Image source={require('../assets/profile_img.jpg')} style={styles.tinyLogo} /> : <Image
style={styles.tinyLogo}
source={{
uri: `${Config.ACCESS_POINT}/admin/profile/${Profile}`,
}}
/> }
</View>



            <TextInput
        label="Name"
        returnKeyType="next"
        value={name.value}
        // container={styles.InputText}
        onChangeText={(text) => setName({ value: text, error: '' })}
        error={!!name.error}
        errorText={name.error}
      />

          <TextInput
          label="Mobile"
          keyboardType="numeric"
          // style={[styles.textInput, { width: '100%' }]}
          // container={styles.InputText}
          value={mobile.value}
          placeholder='mobile number'
          onChangeText={(value) => setmobile({ value: value, error: '' })} 
          error={!!mobile.error}
          errorText={mobile.error}
          />

            <TextInput
              label="Email"
              returnKeyType="next"
              value={email.value}
              // container={styles.InputText}
              onChangeText={(text) => setEmail({ value: text, error: '' })}
              error={!!email.error}
              errorText={email.error}
              autoCapitalize="none"
              autoCompleteType="email"
              textContentType="emailAddress"
              keyboardType="email-address"
            />
{/* 
              <TextInput
              // multiline={true}
              label="Address"
              returnKeyType="next"
              container={styles.InputText}
              // numberOfLines={4}
              error={!!name.error}
              errorText={name.error}
              onChangeText={(text) => setAddress({value: text, error: ''})}
              value={address.value}/> */}

          <TextInput
            label="Address"
            multiline={true}
            returnKeyType="next"
            numberOfLines={4}
            value={address.value}
            // container={styles.InputText}
            onChangeText={(text) => setAddress({ value: text, error: '' })}
            error={!!address.error}
            errorText={address.error}
          />


<Button mode="contained" style={{backgroundColor:"#ce3232"}} onPress={onUpdatePressed}>
        Update Profile
</Button>
          
        
        </ScrollView>
             </View>

          

       </CardView> 

       {/* <SimpleImagePicker/> */}

        </View>


    )
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: 'lightgray',
        alignItems:"center"
    },
    cardViewStyle:{
        width: '100%', 
        marginTop:18,
        height: '96%',
    },
    InputText:{
      width: '95%',
       marginVertical: 12,
       marginLeft:3
    }, 
    ViewcardBelow:{
      alignItems:'center'
    },
    ViewcardBelow1:{
      marginTop:5,
      height:150,
      position:'relative'
    },
    heading:{
      alignSelf:'center',
      fontSize:30,
      color:'#ce3232',
      fontWeight: 'bold',
      // position:'absolute'

    },
     tinyLogo: {
      width: 100,
      // marginTop:5,
      height: 100,
      alignSelf:'center',
      // position:'absolute'
     
      
    },
    header:{
      backgroundColor: "#00BFFF",
      height:200,
      
    },
    avatar: {
      width: 130,
      height: 130,
      borderRadius: 63,
      borderWidth: 4,
      borderColor: "white",
      marginBottom:10,
      alignSelf:'center',
      position: 'absolute',
      marginTop:130
    },
    name:{
      fontSize:22,
      color:"#FFFFFF",
      fontWeight:'600',
    },
    body:{
      marginTop:40,
    },
    bodyContent: {
      flex: 1,
      alignItems: 'center',
      padding:30,
    },
    name:{
      fontSize:28,
      color: "#696969",
      fontWeight: "600"
    },
    info:{
      fontSize:16,
      color: "#00BFFF",
      marginTop:10
    },
    description:{
      fontSize:16,
      color: "#696969",
      marginTop:10,
      textAlign: 'center'
    },
    buttonContainer: {
      marginTop:10,
      height:45,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom:20,
      width:250,
      borderRadius:30,
      backgroundColor: "#00BFFF",
    },
})
