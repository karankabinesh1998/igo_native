import { View , Text, ScrollView , Picker,ActivityIndicator,Alert, RefreshControl,BackHandler, StyleSheet} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import React, { useState , useEffect  } from 'react';
import CardView from 'react-native-cardview';
import { Header } from 'react-native-elements';
import Logo from '../components/Logo';
import WhatsappandCall from '../components/WhatsappandCall';
import { RefreshJsons , StartandEndTrip } from '../configuration/functional';
import Button from '../components/Button';
import SpinnerButton from 'react-native-spinner-button';

export default  function ActiveTrips(navigation){

    const [activeTrips,SetActiveTrips]=useState(navigation.route.params.userDetail.userDetail[0] ? JSON.parse(navigation.route.params.userDetail.userDetail[0].ActiveTrips) : null )

    const [id,setId]=useState(navigation.route.params.userDetail.userDetail[0].id ? navigation.route.params.userDetail.userDetail[0].id :null)
    
    // console.log(activeTrips,"activeTrips")

    


    const [activeIndicator1,setActiveindicator1] = useState(false)

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
      
       let result = await RefreshJsons(id);
            // console.log(,"kk")

            


       if(result){
           console.log(result[0],"Refresh JSON");

           SetActiveTrips(JSON.parse(result[0].ActiveTrips))
       }

        wait(5000).then(() => setRefreshing(false));
      }, []);

      const EndTrip = async(ival,i)=>{
        // onRefresh() 

        
        // StartandEndTrip
        setActiveindicator1(true)

        const NewData = activeTrips;

        NewData[i].activeindicator1 = true;

        SetActiveTrips(NewData)

        const formData=new FormData();
        // formData.append("vendor",id);
        formData.append("end",1);
        // formData.append("driver_mobile",mobile.value);

        let result = await StartandEndTrip(formData,ival.id,id);

        if(result){
            console.log(result,"FormData");
            SetActiveTrips(result);
            setActiveindicator1(false)
            onRefresh(); 
            Alert.alert(
                "Trip Completed Successfully",
                "Trip Completed Successfully!",
                [
                 
                  { text: "OK", onPress: () => console.log("OK Pressed") }
                ]
              )
        }

      }

      const StartTrip = async(ival,i)=>{

        const NewData = activeTrips;

        NewData[i].activeindicator = true;

        SetActiveTrips(NewData)

        const formData=new FormData();
        // formData.append("vendor",id);
        formData.append("start",1);
        // formData.append("driver_mobile",mobile.value);

        let result = await StartandEndTrip(formData,ival.id,id);

        if(result != false){

            console.log(result,"FormData");

            onRefresh() ; 

            // SetActiveTrips(result);

              

            Alert.alert(
                "Trip Started Successfully",
                "All the best for the Trip!",
                [
                 
                  { text: "OK", onPress: () => console.log("OK Pressed") }
                ]
              )
        }else{
            onRefresh() ; 
            Alert.alert(
                "Failed to Start",
                "Trip Failed to Start !",
                [
                 
                  { text: "OK", onPress: () => console.log("OK Pressed") }
                ]
              )
        }
          
      }

      const formatAMPM=(date)=> {
          console.log(date,"date")
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0'+minutes : minutes;
        var strTime = hours + ':' + minutes + ' ' + ampm;
        return strTime;
      }


      const getbeforedateandtimeFunction=async(pick)=>{
       
            let Split_it = pick.split(" ");

            let Split_date = Split_it[0].split("-");

            let Split_time = Split_it[1].split(":");

            let fullDate = `${Split_date[0]}-${Split_date[1]}-${Split_date[2]} ${Split_time[0]}:${Split_time[1]}`;

            let check = new Date(Date.UTC(Split_date[0],Split_date[1]-1,Split_date[2],Split_time[0],Split_time[1], 0))
            console.log(fullDate,"fullDate");
    
            // var today = new Date(fullDate);
            var hourago = new Date(check.getTime() - (1000*60*60)); 
            let past = formatAMPM(new Date(check.getTime() - (1000*60*60)))

            console.log(hourago,past,"yesterday");      
      }

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

{activeTrips.length ? activeTrips.map((ival,i)=>{
    

    let getbeforedateandtime = getbeforedateandtimeFunction(ival.pickup_date);



    return(
        <CardView
        cardElevation={5}
        cardMaxElevation={5}
        cornerRadius={5}
        style={styles.cardViewStyle}>

        <View style={styles.HeadHaed}>
            <Text style={styles.TextText}>
                Customer Details
            </Text>
        </View>

        <View style={styles.HeadData}>
            <Text style={styles.TextTrip}>Customer Name : {ival.customername}</Text>
        </View>

        <View style={styles.HeadData}>
            <Text style={styles.TextTrip}>Customer Mobile : {ival.customerMobile}</Text>
        </View>

        <View style={styles.HeadData}>
            <Text style={styles.TextTrip}>Customer Address : {ival.address}</Text>
        </View>

        <View style={styles.HeadHaed}>
            <Text style={styles.TextText}>
                Trip Details
            </Text>
        </View>

        <View style={styles.HeadData}>
            <Text style={styles.TextTrip}>Trip Id : {ival.Id_trip}</Text>
        </View>

        <View style={styles.HeadData}>
            <Text style={styles.TextTrip}>Trip Type : {ival.trip_type}</Text>
        </View>

        <View style={styles.HeadData}>
            <Text style={styles.TextTrip}>Cab Type : {ival.cab_type}</Text>
        </View>

        <View style={styles.HeadData}>
            <Text style={styles.TextTrip}>Pick-up Location : {ival.pickup_location}</Text>
        </View>

        <View style={styles.HeadData}>
            <Text style={styles.TextTrip}>Drop Location : {ival.droplocation}</Text>
        </View>

        <View style={styles.HeadData}>
            <Text style={styles.TextTrip}>Pick-up Date : {ival.pickup_date}</Text>
        </View>

        { ival.trip_type == "One Way" ? null : 
         <View style={styles.HeadData}>
            <Text style={styles.TextTrip}>Drop Date : {ival.drop_date}</Text>
        </View> }

        <View style={styles.HeadData}>
            <Text style={styles.TextTrip}>Trip Kms : {ival.trip_kms}</Text>
        </View>

        <View style={styles.HeadData}>
            <Text style={styles.TextTrip}>Trip Charges : Rs.{ival.trip_charges}</Text>
        </View>

        <View style={styles.HeadData}>
            <Text style={styles.TextTrip}>Extra Charges/Kms : Rs.{ival.extra_charge}</Text>
        </View>

        <View style={styles.HeadData}>
            <Text style={styles.TextTrip}>Total Fair : {ival.trip_amount}</Text>
        </View>

        <View style={styles.ButtView}>
        
        {/* {ival.start == 1 ? 
        
        <Button mode="contained" style={styles.buttonstarted} onPress={()=>EndTrip(ival)} >
        End Trip  
        </Button> :  <Button mode="contained" style={styles.button} onPress={()=>StartTrip(ival)} >Start Trip</Button> } */}

        { ival.start == 1 ? 
        
        <SpinnerButton
        buttonStyle={styles.buttonStyle,
        { backgroundColor: '#ce3232',width:300 }}
        isLoading={ival.activeindicator1}
        onPress={()=>EndTrip(ival,i)}
        indicatorCount={10}
        spinnerType='BarIndicator'
        disabled={false}
        animateHeight={50}
        animateWidth={200}
        animateRadius={10}
        >
        <Text style={styles.buttonText}>End Trip</Text>
        </SpinnerButton>

       : 
       
       <SpinnerButton
       buttonStyle={styles.buttonStyle,
       { backgroundColor: '#ce3232',width:300 }}
       isLoading={ival.activeindicator}
       onPress={()=>StartTrip(ival,i)}
       indicatorCount={10}
       spinnerType='BarIndicator'
       disabled={false}
       animateHeight={50}
       animateWidth={200}
       animateRadius={10}
       >
       <Text style={styles.buttonText}>Start Trip</Text>
       </SpinnerButton> }

        </View>

        </CardView>
    )
}) : 
    null   }

    {activeTrips.length == 0 ? 
    
    <CardView
    cardElevation={5}
    cardMaxElevation={5}
    cornerRadius={5}
    style={styles.cardViewStyle}>

    <View style={styles.HeadHaed}>
        <Text style={styles.TextText}>
            No Active Trips
        </Text>
    </View> 
    
    </CardView>

: null}


</ScrollView>

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
        height: 480,
        flexDirection: "column",
        marginTop:10,
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
          fontSize:15

      },
      TextTrip:{
          fontSize:10
      },
      buttonText:{
        fontSize: 15,
        textAlign: 'center',
        color: 'white',
        }

})