import { View , Text, ScrollView ,TextInput , RefreshControl,BackHandler,Alert, StyleSheet} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import React, { useState , useEffect  } from 'react';
import CardView from 'react-native-cardview';
import { Header } from 'react-native-elements';
import Logo from '../components/Logo';
import WhatsappandCall from '../components/WhatsappandCall';
import AsyncStorage from "@react-native-community/async-storage";
import Stored from '../configuration/storageDetails';
import { TripsJsons } from '../configuration/functional';
import Button from '../components/Button';





export default  function NewTrips(navigation){
   
  
  // let TripsJson =  navigation.route.params.TripsJson;
  
  const [TripsData, setTripsData] = useState({ value: navigation.route.params.TripsJson, error: '' })

   console.log(TripsData.value,"TripsJsonTripsJson");
   
    // const dataa =async()=>{
    //     let Stored_Data = await AsyncStorage.getItem(Stored.TripsJsob);
    //     let  data1= Stored_Data !== null ? JSON.parse(Stored_Data) : []
    //     //   console.log(data1," hello");
    //       setTripsData({value:data1 , error:''})

    //     console.log(navigation.route.params.userDetail.userDetail,"userdeatilsuserdeatils");
    //     // console.log(navigation,"navigationnavigation");
    // }

    // dataa();

    const ApplyNewTrip = ()=>{

    }

    const [refreshing, setRefreshing] = React.useState(false);

    useEffect(() => {
        const backAction = () => {
            navigation.navigation.navigate('Dashboard')
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
      
       let result = await TripsJsons();
        let Stored_Data = await AsyncStorage.getItem(Stored.TripsJsob);
        let data1 = Stored_Data !== null ? JSON.parse(Stored_Data) : [];
         setTripsData({ value: result, error: ''})
        //  setmobile({ value: result[0].mobile, error: '' })
        //  setEmail({ value:  result[0].email_id, error: '' })
        //  setAddress({ value:  result[0].address, error: '' })
        //  console.log( result,"Refrehjson");
        wait(5000).then(() => setRefreshing(false));
      }, []);



    return(
        
        <SafeAreaProvider style={{backgroundColor:"lightgrey"}}>

<Header
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
      />
        
        <View style={styles.MainContainer} >

        <ScrollView
    // stickyHeaderIndices={[1]}
    showsVerticalScrollIndicator={false}
   refreshControl={
      <RefreshControl
        refreshing={refreshing}
        onRefresh={onRefresh}
      />
    }
    >



      {TripsData.value.length ? TripsData.value.map((ival,i)=>{
        //   console.log(ival,"ival");
          return(
            <CardView
            cardElevation={5}
            cardMaxElevation={5}
            cornerRadius={5}
            style={styles.cardViewStyle}>
    
                <View style={styles.Heading}>
                <Text style={styles.paraHeading}>PICKUP FROM:</Text>
                <Text style={styles.paraData}>{ival.pickuplocation_name}</Text>

                <Text style={styles.paraHeading}>DROP TO:</Text>
                <Text style={styles.paraData}>{ival.drop_location_name}</Text>

                <Text style={styles.paraHeading}>TRIP NO:</Text>
                <Text style={styles.paraData}>{ival.pickup_date}</Text>

                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <View style={{flex: 1, height: 1, backgroundColor: 'black'}} />
                </View>

                <View style={styles.ViewParallel}>

                <View style={styles.ParallelView}>
                <Text style={styles.paraHeading}>CAB TYPE:</Text>
                <Text style={styles.paraData}>{ival.cab_type}</Text>
                </View>

                <View style={styles.ParallelView}>
                <Text style={styles.paraHeading}>DUTY TYPE:</Text>
                <Text style={styles.paraData}>{ival.trip_type}</Text>
                </View>
                </View>

                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <View style={{flex: 1, height: 1, backgroundColor: 'black'}} />
                </View>

                <View style={styles.ViewParallel}>

                <View style={styles.ParallelView1}>

                <Text style={styles.paraHeading1}>TRIP KMS:</Text>
                <Text style={styles.paraData}>{ival.trip_kms}</Text>
                </View>

                <View style={styles.ParallelView1}>
                <Text style={styles.paraHeading1}>TRIP CHARGE:</Text>
                <Text style={styles.paraData}>{ival.trip_charges}</Text>
                </View>

                <View style={styles.ParallelView1}>
                <Text style={styles.paraHeading1}>EXTRACHARGE/KM:</Text>
                <Text style={styles.paraData}>{ival.extra_charge}</Text>
                </View>

                </View>



            <Button mode="contained" style={styles.button} onPress={ApplyNewTrip}>
            Request New Trip
            </Button>
            
               
           
{/* Request New Trip
</Button> */}

           
        
      {/* </View> */}



              



                    {/* <Text style={styles.paraHeading}>Drop Location : {ival.drop_location_name}</Text>
                    <Text style={styles.paraHeading}>Date: {ival.pickup_date}</Text>
                    <Text style={styles.paraHeading}>Cab Type : {ival.cab_type}</Text> */}
                </View>
    
            </CardView>
          )
      }) : null
    }

        </ScrollView>
        </View>
     

      </SafeAreaProvider>
    )
}

const styles = StyleSheet.create({
 
    MainContainer: {
   
      flex: 1,
      marginTop:4,
      marginLeft: 9,
      width: '100%', 
      height: 80 ,
     },
     cardViewStyle:{
 
        width: '96%', 
        height: 400,
        flexDirection: "column",
        marginTop:9,
        // marginLeft: 9,
     
      },
      Heading:{
          alignItems:"flex-start"
      },
      paraHeading:{
          fontSize:15,
          fontWeight:'bold',
          padding:5

      },
      paraHeading1:{
        fontSize:12,
        fontWeight:'bold',
        padding:5
      },
      paraData:{
        padding:5,
        fontSize:12,
        marginLeft:5
      },
      ParallelView:{
        flexDirection:"column",
        flex:1,
        marginLeft:20,
        // justifyContent:"center"
      },

      ParallelView1:{
        flexDirection:"column",
        // flex:1,
        marginLeft:5
        // marginLeft:20,
        // justifyContent:"center"
      },
      ViewParallel:{
      flexDirection:"row",
    },
    button:{
      backgroundColor:"#ce3232",
      width:"95%",
      marginLeft:'2%'

    },

})