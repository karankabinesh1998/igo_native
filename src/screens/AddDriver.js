import { View , Text, ScrollView ,ActivityIndicator, Modal ,Pressable, RefreshControl,BackHandler,Alert,Image ,StyleSheet} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import React, { useState , useEffect  } from 'react';
import CardView from 'react-native-cardview';
import { Header } from 'react-native-elements';
import Header1 from '../components/Header';
import Logo from '../components/Logo';
import WhatsappandCall from '../components/WhatsappandCall';
import AsyncStorage from "@react-native-community/async-storage";
import Stored from '../configuration/storageDetails';
import { RefreshJsons , AddBidTrips } from '../configuration/functional';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import { AddDriverdata } from '../configuration/functional';
import  Config from '../configuration/config';
import DocumentDriverPicker from '../components/DocumentDriverPicker';




export default  function AddDriver(navigation){

    const [id,setId]=useState(navigation.route.params.userDetail.userDetail[0].id ? navigation.route.params.userDetail.userDetail[0].id :null);
    // const [id,setId]=useState(navigation.route.params.userDetail.userDetail[0].id ? navigation.route.params.userDetail.userDetail[0].id :null)
    const [vendorDrivers,setvendorDrivers]=useState(JSON.parse(navigation.route.params.userDetail.userDetail[0].vendorDrivers))
    const [name, setName] = useState({ value: '', error: '' })
    const [mobile, setmobile] = useState({ value: '', error: '' })
    const [email, setEmail] = useState({ value:'', error: '' });
    const [d_front, setd_front] = useState({ value:null, error: '' });
    const [d_front1, setd_front1] = useState('');

    const [d_back, setd_back] = useState({ value:null, error: '' });
    const [d_back1, setd_back1] = useState('');

    const [police_verify, setpolice_verify] = useState({ value:null, error: '' });
    const [police_verify1, setpolice_verify1] = useState('');

    const [ exp , setexp ] = useState(0);
    const [activeIndicator,setActiveindicator] = useState(false)
    
    const [refreshing, setRefreshing] = React.useState(false);

    // console.log(vendorDrivers,"AddDreiver");
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


  const handleChange=(e)=>{
    console.log(e,"4747");
    setd_front({value:e,error:''});
    setd_front1(e.name);
  }

  const handleChange1=(e)=>{
    console.log(e,"4747");
    setd_back({value:e,error:''});
    setd_back1(e.name);
    setActiveindicator(false)
  }

  const handleChange2=(e)=>{
    console.log(e,"4747");
    setpolice_verify({value:e,error:''});
    setpolice_verify1(e.name);
  }

  const Submit=async()=>{

    setActiveindicator(true)

    const formData=new FormData();
    formData.append("vendor",id);
    formData.append("driver_name",name.value);
    formData.append("driver_mobile",mobile.value);
    formData.append("driver_email",email.value);
    formData.append("driving_license_front",d_front1);
    formData.append("driving_license_back",d_back1);
    formData.append("police_verify",police_verify1);
    formData.append("overall_exp",exp);
    formData.append("file",JSON.stringify(["file1","file2","file3"]))
    formData.append("file1",d_front.value)
    formData.append("file2",d_back1.value)
    formData.append("file3",police_verify.value)


    console.log(formData);

    let result = await AddDriverdata(formData);

    if(result){

        console.log(result);

        setvendorDrivers(result)
        setActiveindicator(false)

        setName({ value: '', error: '' })
        setmobile({ value: '', error: '' })
        setEmail({ value:'', error: '' });
        setd_front({ value:null, error: '' });
        setd_front1('');

        setd_back({ value:null, error: '' });
        setd_back1('');

        setpolice_verify({ value:null, error: '' });
        setpolice_verify1('');

        setexp(0);

    }

  }

  const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }
  
  const onRefresh = React.useCallback(async() => {
  
    setRefreshing(true);
  
   let result = await RefreshJsons(id);
//    console.log();
    setvendorDrivers(JSON.parse(result[0].vendorDrivers))
    // let Stored_Data = await AsyncStorage.getItem(Stored.TripsJsob);
    // let data1 = Stored_Data !== null ? JSON.parse(Stored_Data) : [];
    //  setTripsData({ value: result, error: ''})
    //  setmobile({ value: result[0].mobile, error: '' })
    //  setEmail({ value:  result[0].email_id, error: '' })
    //  setAddress({ value:  result[0].address, error: '' })
     console.log(JSON.parse(result[0].vendorDrivers),"Refrehjson");
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
          rightComponent={ <WhatsappandCall/> }
          containerStyle={{
              backgroundColor: 'white',
              justifyContent: 'space-around',
              width:'100%',
              height:'15%'
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



<CardView
cardElevation={5}
cardMaxElevation={5}
cornerRadius={5}
style={styles.cardViewStyle12}>


<Header1 style={styles.heading}>Add Your Driver</Header1>

<TextInput
        label="Name"
        returnKeyType="next"
        container={styles.InputText}
        value={name.value}
        onChangeText={(text) => setName({ value: text, error: '' })}
        error={!!name.error}
        errorText={name.error}
      />

        <TextInput
        label="Mobile"
        keyboardType="numeric"
        // style={[styles.textInput, { width: '100%' }]}
        container={styles.InputText}
        value={mobile.value}
        placeholder='mobile number'
        onChangeText={(value) => setmobile({ value: value, error: '' })} 
        error={!!mobile.error}
        errorText={mobile.error}
        />

    {/* <Input
      label="Password"
      style={styles.InputText}
      underlineColor="transparent"
        mode="outlined"
      secureTextEntry
      right={<Input.Icon name="eye" />}
    /> */}

            <TextInput
              label="Email"
              returnKeyType="next"
              value={email.value}
              container={styles.InputText}
              onChangeText={(text) => setEmail({ value: text, error: '' })}
              error={!!email.error}
              errorText={email.error}
              autoCapitalize="none"
              autoCompleteType="email"
              textContentType="emailAddress"
              keyboardType="email-address"
            />

<TextInput
        label="Experience"
        keyboardType="numeric"
        // style={[styles.textInput, { width: '100%' }]}
        container={styles.InputText}
        value={exp}
        placeholder='Experience'
        onChangeText={(value) => setexp(value)} 
        // error={!!exp.error}
        // errorText={exp.error}
        />

<View style={styles.FileUploadView}>
<Text style={{fontSize:16}}>Upload Driving Licence Front : </Text>    
</View>    
            <View style={styles.FileUploadView}>
             <DocumentDriverPicker Profile={d_front} handleChange={handleChange}/>
            <Text style={{margin:6,fontSize:12}}>{d_front1 ? d_front1.substring(0,14) : null } </Text>
            </View>

<View style={styles.FileUploadView}>
<Text style={{fontSize:16}}>Upload Driving Licence Back : </Text>    
</View>    
<View style={styles.FileUploadView}>
<DocumentDriverPicker Profile={d_front} handleChange={handleChange1}/>
<Text style={{margin:6,fontSize:12}}>{d_back1 ? d_back1.substring(0,14) : null } </Text>
</View>

<View style={styles.FileUploadView}>
<Text style={{fontSize:16}}>Upload Police Certificate : </Text>    
</View>    
<View style={styles.FileUploadView}>
<DocumentDriverPicker Profile={police_verify} handleChange={handleChange2}/>
<Text style={{margin:6,fontSize:12}}>{police_verify1 ? police_verify1.substring(0,14) : null } </Text>
</View>

{ activeIndicator ?

<View style={[styles.container, styles.horizontal]}>
<ActivityIndicator size="large" color="#ce3232" />
</View>

: <Button mode="contained" style={styles.button} onPress={Submit}>
        Add Driver
</Button> }

{ vendorDrivers.length ? vendorDrivers.map((ival,i)=>{
console.log(ival,"246");
    return(
        <CardView
    cardElevation={5}
    cardMaxElevation={5}
    cornerRadius={5}
    style={styles.cardViewStyle}>

{ival.status==0 ?  

<View style={{backgroundColor:'yellow',alignItems:"center"}}>
    <Text style={{alignItems:"center", fontSize:20}}>
        Waiting
    </Text>
</View>

:
 <View style={{backgroundColor:'green',alignItems:"center"}}>
<Text style={{alignItems:"center", fontSize:20}}>
    Approved
</Text>
</View> }

<View style={styles.DriverHead}>
    <Text style={styles.DriverText}>
    Driver Name : {ival.driver_name}
    </Text>
</View>

<View style={styles.DriverHead}>
    <Text style={styles.DriverText}>
    Driver Mobile : 
    </Text>
    <Text style={styles.DriverText1}>
    {ival.driver_mobile} 
    </Text>
</View>

<View style={styles.DriverHead}>
    <Text style={styles.DriverText}>
    Driver Email : 
    </Text>

    <Text style={styles.DriverText1}>
    {ival.driver_email} 
    </Text>
   
</View>

<View style={styles.DriverHead}>
    <Text style={styles.DriverText}>
    Driving Experience : 
    </Text>

    <Text style={styles.DriverText1}>
    {ival.overall_exp} 
    </Text>
   
</View>

<View style={styles.DriverHead}>
    <Text style={styles.DriverText}>
    Driving License Front :  
    </Text>

    <Image
style={styles.tinyLogo}
source={{
uri: `${Config.ACCESS_POINT}/admin/vendarfile/${ival.driving_license_front}/${id}`,
}}
/>
   
</View>

<View style={styles.DriverHead}>
    <Text style={styles.DriverText}>
    Driving License Back : 
    </Text>

    <Image
style={styles.tinyLogo}
source={{
uri: `${Config.ACCESS_POINT}/admin/vendarfile/${ival.driving_license_back}/${id}`,
}}
/>
  
</View>


<View style={styles.DriverHead}>
    <Text style={styles.DriverText}>
    Police Verify Certificate : 
    </Text>

<Image
style={styles.tinyLogo}
source={{
uri: `${Config.ACCESS_POINT}/admin/vendarfile/${ival.police_verify}/${id}`,
}}
/>
  
</View>

  </CardView>
    )
}) :null  }
    
</CardView>






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
        FileUploadView:{
            flexDirection:"row",
            margin:5
        },
        FileUploadButton:{
            width:'50%',
            alignContent:"flex-end"
        },
        MainContainer: {
       
            flex: 1,
            marginTop:4,
            marginLeft: 9,
            width: '100%', 
            height: 80 ,
           },
           cardViewStyle12:{
            width: '96%', 
            height: '100%',
            flexDirection: "column",
            // alignContent:"center",
            marginTop:9,
           },
           cardViewStyle:{
     
            width: '96%', 
            height: 400,
            flexDirection: "column",
            // alignContent:"center",
            marginTop:9,
            marginLeft: 9,
         
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
          TextTrip:{
              fontSize:15
          },
          DriverHead:{
              alignItems:"flex-start",
              margin:5,
              marginLeft:7,
              flexDirection:"row"
          },
          DriverText:{
              fontSize:17,
              fontWeight:"500"
          },
          DriverText1:{
            fontSize:15,
            margin:3
            // fontWeight:"500"
          },
          InputText:{
            width: '95%',
             marginVertical: 5,
             marginLeft:5,
            alignContent:"center"
          },
          heading:{
            alignSelf:'center',
            fontSize:30,
            color:'#ce3232',
            fontWeight: 'bold',
            // position:'absolute'
      
          },
          button:{
            backgroundColor:"#ce3232",
            width:"95%",
            marginLeft:'2%'
      
          },
          tinyLogo:{
              width:100,
              height:50,
              marginLeft:3
          }
    })