import { View , Text, ScrollView , FlatList ,Alert, RefreshControl,BackHandler, StyleSheet} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import React, { useState , useEffect  } from 'react';
import CardView from 'react-native-cardview';
// import { Header } from 'react-native-elements';
import Header1 from '../components/Header';
// import Logo from '../components/Logo';
// import WhatsappandCall from '../components/WhatsappandCall';
import { RefreshJsons , StartandEndTrip } from '../configuration/functional';
// import Button from '../components/Button';  
import MultiSelectExample from '../components/MultiSelect';
import Header_New from '../components/Header_New';
import Button from '../components/Button';
// import SelectMultiple from 'react-native-select-multiple'


export default  function MyLocations({navigation,route}){

    console.log(route.params.userDetail[0].state,"Mylocation"); 

    const [state,Setstate]=useState(route.params.userDetail[0] ? JSON.parse(route.params.userDetail[0].state) : null )
    const [id,setId]=useState(route.params.userDetail[0].id ? route.params.userDetail[0].id :null)
    const [refreshing, setRefreshing] = React.useState(false);
    const [selectedItems,SetselectedItems]=useState(route.params.userDetail[0] ? JSON.parse(route.params.userDetail[0].travel_location) : [] )

    useEffect(() => {
        const backAction = () => {
            navigation.navigate('Dashboard')
          return true;
        };
    
        const backHandler = BackHandler.addEventListener(
          "hardwareBackPress",
          backAction
        ); 
    
        return () => backHandler.remove();
      }, []);


      const wait = (timeout) => {
        return new Promise(resolve => setTimeout(resolve, timeout));
      }
      
      const onRefresh = React.useCallback(async() => {
      
        setRefreshing(true);
      
       let result = await RefreshJsons(id);
        if(result){

           console.log(result[0].state,"Refresh JSON");

        Setstate(JSON.parse(result[0].state))
       }
       route.params.OtherPageRefersh("refresh");
        wait(5000).then(() => setRefreshing(false));
      }, []);

      const HandleSelect = async(a)=>{
          // console.log(a);
          Setstate(JSON.parse(a[0].state))
          Alert.alert(
            "Location Updated!",
            "Location Updated Successfully",
            [
             
              { text: "OK", onPress: () => console.log("OK Pressed") }
            ]
          )
      }


    return(
        <SafeAreaProvider style={{backgroundColor:"lightgrey"}}> 

        <Header_New subtitle="My Location" navigation={navigation} />

        {/* <Header
              placement="left"
              statusBarProps={{ barStyle: 'light-content' }}
              barStyle="light-content"
              leftComponent={<Logo STYLE={ { width:110 , height: 100, marginBottom: 8, } } />}
              centerComponent={{ text: 'Igotaxy', style: { color: '#fff' } }}
              rightComponent={ <WhatsappandCall  navigation ={navigation.navigation}   /> }
              containerStyle={{
                  backgroundColor: 'white',
                  justifyContent: 'space-around',
                  width:'100%',
                  height:'16%'
                }}
              /> */}

<View style={styles.MainContainer} >


{/* <Header style={styles.heading}>Your Profile</Header> */}




<CardView
cardElevation={5}
cardMaxElevation={5}
cornerRadius={5}
style={styles.cardViewStyle}>

<ScrollView
// stickyHeaderIndices={[1]}
showsVerticalScrollIndicator={false}
// refreshControl={
// <RefreshControl
// refreshing={refreshing}
// onRefresh={onRefresh}
// />
// }
> 

<Header1 style={styles.heading}>Preferred Location </Header1>



<MultiSelectExample state={state} id={id} HandleSelect={HandleSelect} selectedItems={selectedItems}/>

{/* <Button mode="contained" style={styles.button} >Submit</Button> */}

</ScrollView>
</CardView>



</View>


              </SafeAreaProvider>
    )

}

const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22,
      // width:'100%'
    },
    MainContainer: {
   
        flex: 1,
        marginTop:4,
        marginLeft: 9,
        width: '100%', 
        height: 80 ,
       },
       cardViewStyle:{
 
        width: '96%', 
        height: 1300,
        flexDirection: "column",
        marginTop:9,
        // marginLeft: 9,
     
      },
      button:{
        backgroundColor:"green",
        width:"95%",
        marginLeft:10,
        height:60
  
      },
      buttonstarted:{
        backgroundColor:"red",
            width:"95%",
        marginLeft:10,
        height:60,
        // fontSize:15
      },
      ButtView:{
          flex:1,
          flexDirection:"row"
      },
        FileUploadView:{
        flexDirection:"row",
        margin:5,
        
    },

      Headings:{
          backgroundColor:"#008000",
          alignItems:"center"
      },
      Status:{
          fontSize:25
      },
      HeadData:{
        margin:5
      },
      HeadHaed:{
          alignItems:"center",
          backgroundColor:'yellow'
      },
      TextText:{
          fontSize:25

      },
      TextTrip:{
          fontSize:15
      },
      heading:{
        alignSelf:'center',
        fontSize:30,
        color:'#ce3232',
        fontWeight: 'bold',
        // position:'absolute'
  
      },

})