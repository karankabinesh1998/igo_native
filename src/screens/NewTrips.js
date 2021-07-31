import { View , Text, ScrollView , RefreshControl,BackHandler,Alert, StyleSheet} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import React, { useState , useEffect  } from 'react';
import CardView from 'react-native-cardview';
import { Header } from 'react-native-elements';
import Logo from '../components/Logo';
import LogoutScreen from '../components/Logout';
import AsyncStorage from "@react-native-community/async-storage";
import Stored from '../configuration/storageDetails';
import { TripsJsons } from '../configuration/functional';


export default  function NewTrips(navigation){
   
    const [TripsData, setTripsData] = useState({ value:[], error: '' })

    const dataa = async()=>{
        let Stored_Data = await AsyncStorage.getItem(Stored.TripsJsob);
        let  data1= Stored_Data !== null ? JSON.parse(Stored_Data) : []
        //   console.log(data1," hello");
          setTripsData({value:data1 , error:''})

        //   console.log(TripsData.value );
    }

    dataa();

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
        //  setName({ value: result[0].username, error: ''})
        //  setmobile({ value: result[0].mobile, error: '' })
        //  setEmail({ value:  result[0].email_id, error: '' })
        //  setAddress({ value:  result[0].address, error: '' })
        //  console.log( result,"Refrehjson");
        wait(5000).then(() => setRefreshing(false));
      }, []);



    return(
        
        <SafeAreaProvider>

<Header
      placement="left"
      statusBarProps={{ barStyle: 'light-content' }}
      barStyle="light-content"
      leftComponent={<Logo STYLE={ { width:110 , height: 100, marginBottom: 8, } } />}
      centerComponent={{ text: 'Igotaxy', style: { color: '#fff' } }}
      rightComponent={ <LogoutScreen  navigation ={navigation.navigation}   /> }
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
                <Text style={styles.para}>PickUp Location : {ival.pickuplocation_name}</Text>
                    <Text style={styles.para}>Drop Location : {ival.drop_location_name}</Text>
                    <Text style={styles.para}>Date: {ival.pickup_date}</Text>
                    <Text style={styles.para}>Cab Type : {ival.cab_type}</Text>
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
      height: 50 ,
     },
     cardViewStyle:{
 
        width: '96%', 
        height: 150,
        flexDirection: "column",
        marginTop:9,
        // marginLeft: 9,
     
      },
      Heading:{
          alignItems:"center"
      },
      para:{
          fontSize:15,
      }

})