import { View } from 'native-base';
import { StyleSheet , StatusBar , BackHandler ,Alert } from 'react-native';
import React , { useEffect } from 'react'
import CardView from 'react-native-cardview';
import SimpleImagePicker from '../components/ImagePicker';

// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
 


export default function ProfileSCreen({ navigation , userDetail  }) {

    console.log(userDetail ,"Pressed");

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

            <View>
           
           
        

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
        width: '95%', 
        marginTop:10,
        height: '50%',
    }
})
