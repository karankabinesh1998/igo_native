import { View , Text, ScrollView ,Alert, RefreshControl,BackHandler,Linking, StyleSheet ,TouchableOpacity } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import React, { useState , useEffect  } from 'react';
import CardView from 'react-native-cardview';
// import { Header } from 'react-native-elements';
// import Logo from '../components/Logo';
// import WhatsappandCall from '../components/WhatsappandCall';
import { RefreshJsons , StartandEndTrip } from '../configuration/functional';
import SwipeButton from 'rn-swipe-button';
// import SpinnerButton from 'react-native-spinner-button';
import Header_New from '../components/Header_New';
import {Provider } from 'react-native-paper';
import Entypo from 'react-native-vector-icons/Entypo';
import CountDown from 'react-native-countdown-component';

export default  function ActiveTrips({navigation,route}){

    const [activeTrips,SetActiveTrips]=useState(route.params.userDetail[0] ? JSON.parse(route.params.userDetail[0].ActiveTrips) : null )

    const [id,setId]=useState(route.params.userDetail[0].id ? route.params.userDetail[0].id :null)
    
    //  console.log(route.params.userDetail[0].ActiveTrips,"activeTrips")

  

    useEffect(async() => {
      // Update the document title using the browser API
      if(activeTrips.length==0){
        // SetActiveTrips(route.params.userDetail ? JSON.parse(route.params.userDetail[0].ActiveTrips) : null)
      }
      // SetActiveTrips(route.params.userDetail[0].ActiveTrips)  
      // await getbeforedateandtimeFunction(activeTrips);
      onRefresh()
    },[]);


    

    const [activeIndicator1,setActiveindicator1] = useState(false);

    const [refreshing, setRefreshing] = React.useState(false);


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
            // console.log(,"kk")
         if(result){
           console.log(result[0].ActiveTrips,"Refresh JSON");

           SetActiveTrips(JSON.parse(result[0].ActiveTrips))

          // await getbeforedateandtimeFunction(JSON.parse(result[0].ActiveTrips));
         }

         route.params.OtherPageRefersh("refresh");

        wait(5000).then(() => setRefreshing(false));
      }, []);



      const EndTrip = async(ival,i)=>{
         setActiveindicator1(true);

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

             

            // SetActiveTrips(result);
             Alert.alert( 
                "Trip Started Successfully",
                "All the best for the Trip!",
                [
                 
                  { text: "OK", onPress: () => onRefresh() }
                ]
              )
        }else{
            // onRefresh() ; 
            Alert.alert(
                "Failed to Start",
                "Trip Failed to Start !",
                [
                 
                  { text: "OK", onPress: () => onRefresh() }
                ]
              )
        }
          
      }



      const formatAMPM=(date)=> {
          
        var hours = date.getHours();
        console.log(hours,"hours")
        var minutes = date.getMinutes();
        var ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0'+minutes : minutes;
        var strTime = hours + ':' + minutes + ' ' + ampm;
        return strTime;
      }


      const getbeforedateandtimeFunction=async(Trips)=>{
          console.log(Trips);
        let arr = []

          if(Trips.length>0){

            Trips.map((ival,i)=>{
       
              let Split_it = ival.pickup_date.split("");
  
              let Split_date = Split_it[0].split("-");
  
              let Split_time = Split_it[1].split(":");
  
              let fullDate = `${Split_date[0]}/${parseInt(Split_date[1])+1}/${Split_date[2]} ${Split_time[0]}:${Split_time[1]}`;
  
              let check = new Date(fullDate)
               var hourago = new Date(check.getTime() - (1000*60*60)); 
               let CurrentDate = new Date();
               let timed = formatAMPM(hourago);

               ival.Will_visibleAt = `${hourago.getDate() > 9 ? hourago.getDate() : `0${hourago.getDate()}`}-${hourago.getMonth()>9 ? hourago.getMonth() : `0${hourago.getMonth()}`}-${hourago.getFullYear()} at ${timed}`
              
                 
                 console.log( CurrentDate.getDate() , hourago.getDate());

              if(
                CurrentDate.getFullYear()==hourago.getFullYear() &&
                CurrentDate.getMonth()+1 == hourago.getMonth() &&
                CurrentDate.getDate() >= hourago.getDate()  

              ){

                if( CurrentDate.getDate() == hourago.getDate() && CurrentDate.getHours() >= hourago.getHours() ){
                  ival.beforehour = true;
                }else{
                  ival.beforehour = true;
                }
                
                // ival.beforehour = true;

              }else{

                ival.beforehour = false;


              }
              




              let timeDiff = hourago.getTime() - CurrentDate.getTime()

                 ival.Count_down = Math.floor( parseInt(timeDiff) / 10000); 

                console.log(ival.Count_down,"hello"); 

              arr.push(ival)
            })

          // console.log(arr,"length")

          SetActiveTrips(arr);
          }
 }

 const callNumber = (phone) => {
  console.log('callNumber ----> ', phone);
  let phoneNumber = phone;
  if (Platform.OS !== 'android') {
    phoneNumber = `telprompt:${phone}`;
  }
  else  {
    phoneNumber = `tel:${phone}`;
  }
  Linking.canOpenURL(phoneNumber)
  .then(supported => {
    if (!supported) {
      Alert.alert('Phone number is not available');
    } else {
      return Linking.openURL(phoneNumber);
    }
  })
  .catch(err => console.log(err));
};

        

    return(

        <SafeAreaProvider style={{backgroundColor:"lightgrey"}}> 
<Provider>
<Header_New subtitle="Active Trips" navigation={navigation} />

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

<CardView
  cardElevation={5}
  cardMaxElevation={5}
  cornerRadius={5}
  style={styles.cardViewStyle12}>

<ScrollView
showsVerticalScrollIndicator={false}
refreshControl={
<RefreshControl
refreshing={refreshing}
onRefresh={onRefresh}
/>
}
>

{activeTrips.length ? activeTrips.map((ival,i)=>{
          console.log(ival.Will_visibleAt)
    return(
        <CardView
        key={`${ival.id}`}
        cardElevation={5}
        cardMaxElevation={5}
        cornerRadius={5}
        style={styles.cardViewStyle}>

        <View style={styles.HeadHaed}>
            <Text style={styles.TextText}>
                Customer Details
            </Text>
        </View>

       {
         ival.beforehour == true ? 
         <>

          <View style={styles.HeadData}>
            <Text style={styles.TextTripT}>Customer Name :{ival.customername}</Text>
          </View>

          {/* <View style={{flexDirection:"row"}}> 
          <Text style={styles.paraHeadingtrip_id}>CUSTOMER NAME :</Text>
          <Text style={styles.paraDatatrip_id}>{ival.trip_id}</Text>
          </View> */}

          <TouchableOpacity style={styles.HeadData} onPress={()=>callNumber(ival.customerMobile)}>
            <Text style={styles.TextTripT}>Customer Mobile : {ival.customerMobile}</Text>
          </TouchableOpacity>

          <View style={styles.HeadData}>
            <Text style={styles.TextTripT}>Customer Address : {ival.address}</Text>
          </View>
         
         </> :

          <View style={{height:80,flexDirection:"column"}}>
            <View>
            <Text style={{margin:5,fontSize:15,alignItems:"center"}}>Details Will be Visible on {ival.Will_visibleAt}</Text>
            </View>
            <View>
            <CountDown
            until={ival.Count_down}
            //  onPress={() => alert('hello')}
            size={13}
            style={{alignItems:"center"}}
            timeToShow={['D', 'H', 'M', 'S']}
            timeLabels={{d: 'Days', h: 'Hours', m: 'Minutes', s: 'Seconds'}}
             />
            </View>
          </View>

       }

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
            <Text style={styles.TextTrip}>Pick up Date : {ival.new_pickup_date}</Text>
        </View>

        { ival.trip_type == "One Way" ? null : 
         <View style={styles.HeadData}>
            <Text style={styles.TextTrip}>Drop Date : {ival.new_drop_date}</Text>
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

        { ival.start == 1 ? 
        
        

          <View style={{justifyContent:"center",marginLeft:5}}>
            <SwipeButton
          enableReverseSwipe
          onSwipeSuccess={()=>EndTrip(ival,i)}
          railBackgroundColor="#ce3232"
          railStyles={{
          backgroundColor: '#2f991f',
          borderColor: '#2f991f',
          }}
          thumbIconBackgroundColor="#FFFFFF"
          title="Swipe to End Trip"
          titleColor="white"
          width={320}
          />
          </View>

       : 
       
      
      <View style={{justifyContent:"center",marginLeft:5}}>
      <SwipeButton
          onSwipeSuccess={()=>StartTrip(ival,i)}
          railBackgroundColor="#ce3232"
          disabled={ival.beforehour==true ? false : true }
          railStyles={{
          backgroundColor: '#2f991f',
          borderColor: '#2f991f',
          }}
          shouldResetAfterSuccess={true}
          thumbIconBackgroundColor="#FFFFFF"
          title="Swipe to Start Trip"
          titleColor="white"
          width={320}
    />
    </View>
    }

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
</CardView>
</View>
</Provider>
<View style={styles.headerFooterStyle}>
<TouchableOpacity style={styles.iconstyle} onPress={()=>navigation.navigate('Dashboard')}>
<Entypo name="home" color={'#ce3232'}  size={22}  />
<Text style={{textAlign:"center",fontSize:10,marginTop:5,fontWeight:"bold",color:"#ce3232"}}>Home</Text>
</TouchableOpacity>
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
        height: 515,
        flexDirection: "column",
        marginTop:10,
        marginLeft: 9,
     
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
          // flex:1,
          flexDirection:"row"
      },
        FileUploadView:{
        flexDirection:"row",
        margin:5,
        
    },
    cardViewStyle12:{
      width: '96%', 
      height: '95%',
      flexDirection: "column",

       // backgroundColor:"lightgrey"
      // alignContent:"center",
      // marginTop:9,
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
          fontSize:12,
          color:"black"
      },
      TextTripT:{
        fontSize:14,
        color:"skyblue",
        fontWeight:"bold"
      },
      buttonText:{
        fontSize: 15,
        textAlign: 'center',
        color: 'white',
        }
        ,
      headerFooterStyle: {
        width: '100%',
        height: 45,
        backgroundColor: '#ffff',
        position: 'absolute', left: 0, right: 0, bottom: 0
      },
      textStyle: {
        textAlign: 'center',
        color: '#fff',
        fontSize: 18,
        padding: 7,
      },
      iconstyle:{
        alignItems:"center",
        flexDirection:"column",
        // flex:1
      }
})