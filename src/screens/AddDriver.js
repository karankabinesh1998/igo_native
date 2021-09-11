import { View , Text, ScrollView,
   Modal ,KeyboardAvoidingView, 
   RefreshControl,BackHandler,TouchableWithoutFeedback,
   Keyboard , Alert ,StyleSheet} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import React, { useState , useEffect  } from 'react';
import CardView from 'react-native-cardview';
import { Header,Rating } from 'react-native-elements';
import Header1 from '../components/Header';
// import Logo from '../components/Logo';
// import WhatsappandCall from '../components/WhatsappandCall';
import { DeleteDriver, EditDriverdata, RefreshJsons} from '../configuration/functional';
import TextInput from '../components/TextInput';
import { AddDriverdata } from '../configuration/functional';
// import  Config from '../configuration/config';
import DocumentDriverPicker from '../components/DocumentDriverPicker';
// import AccordionTab from '../components/AccordionTab';
import Button from '../components/Button';
import { FAB, Portal, Provider } from 'react-native-paper';
import SpinnerButton from 'react-native-spinner-button';
import { nameValidator } from '../helpers/nameValidator';
import { mobileValidator } from '../helpers/mobileValidator';
import { emailValidator } from '../helpers/emailValidator';
import { driving_license_numberValidator } from '../helpers/driving_license_numberValidator';
import Header_New from '../components/Header_New';
import { TouchableOpacity , Linking } from 'react-native';



export default  function AddDriver({navigation,route}){

      const [state, setState] = React.useState({ open: false });

      const onStateChange = ({ open }) => setState({ open });

      const { open } = state;

    const [id,setId]=useState(route.params.userDetail[0].id ? route.params.userDetail[0].id :null);
    // const [id,setId]=useState(navigation.route.params.userDetail.userDetail[0].id ? navigation.route.params.userDetail.userDetail[0].id :null)
    const [vendorDrivers,setvendorDrivers]=useState(JSON.parse(route.params.userDetail[0].vendorDrivers))
    const [name, setName] = useState({ value: '', error: '' })
    const [mobile, setmobile] = useState({ value: '', error: '' })
    const [email, setEmail] = useState({ value:'', error: '' });
    const [d_front, setd_front] = useState({ value:null, error: '' });
    const [d_front1, setd_front1] = useState('');
    const [driver_image, setdriver_image] = useState({ value:null, error: '' });
    const [driver_image1, setdriver_image1] = useState('');
    
    const [modalVisible, setModalVisible] = useState(false);
    const [driving_license_number,Setdriving_license_number]=useState({value:'',error:''})
    const [d_back, setd_back] = useState({ value:null, error: '' });
    const [d_back1, setd_back1] = useState('');
    const [driverid,setdriverid]=useState(null)

    const [police_verify, setpolice_verify] = useState({ value:null, error: '' });
    const [police_verify1, setpolice_verify1] = useState('');

    const [ exp , setexp ] = useState(0);
    const [activeIndicator,setActiveindicator] = useState(false)
    const [ onEditstate , SetEditstate ] = useState(false)
    
    const [refreshing, setRefreshing] = React.useState(false);

   const ratingCompleted =(rating)=>{

      console.log("Rating is: " + rating)
    }

    // console.log(vendorDrivers,"AddDreiver");
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


  const handleChange=(e)=>{
    // console.log(e,"4747");
    setd_front({value:e,error:''});
    setd_front1(e.name);
  }

  const handleChange1=(e)=>{
    // console.log(e,"4747");
    setd_back({value:e,error:''});
    setd_back1(e.name);
    // setActiveindicator(false)
  }

  const handleChange2=(e)=>{
    // console.log(e,"4747");
    setpolice_verify({value:e,error:''});
    setpolice_verify1(e.name);
  }

  const handleChange3=(e)=>{
    console.log(e,"4747");
    setdriver_image({value:e,error:''});
    setdriver_image1(e.name);
  }
 

  const Update = async()=>{

    const nameError = nameValidator(name.value)
    const mobileError = mobileValidator(mobile.value)
    const emailError = emailValidator(email.value)
    const Driving = driving_license_numberValidator(driving_license_number.value)
  
    if (emailError || nameError || mobileError || Driving ) {
      setName({ ...name, error: nameError })
      setmobile({...mobile,error:mobileError})
      setEmail({ ...email, error: emailError })
      Setdriving_license_number({...driving_license_number,error:Driving})
      return
    }

    setActiveindicator(true)

    const formData=new FormData();
    formData.append("vendor",id);
    formData.append("driver_name",name.value);
    formData.append("driver_mobile",mobile.value);
    formData.append("driver_email",email.value);
    formData.append("driving_license_number",driving_license_number.value);
    formData.append("driver_image",driver_image1);
    formData.append("driving_license_front",d_front1);
    formData.append("driving_license_back",d_back1);
    formData.append("police_verify",police_verify1);
    formData.append("overall_exp",exp);
    // formData.append("file",JSON.stringify(["d_front","d_back","police_c"]))
    formData.append("d_front",d_front.value)
    formData.append("d_back",d_back.value)
    formData.append("police_c",police_verify.value)
    formData.append("driver_image1",driver_image.value)

    let result = await EditDriverdata(formData,driverid);

    console.log(result);

    if(result !== false){

        console.log(result);

        // setvendorDrivers(result)
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
        setdriver_image({ value:null, error: '' });
        setdriver_image1('');
        setexp(0);
        Setdriving_license_number({ value: '', error: '' })
        setModalVisible(false)
        SetEditstate(false)
        setdriverid(null)
        
        Alert.alert(
          "Successfully Updated",
          "The Driver was Updated successfully!",
          [
           
            { text: "OK", onPress: () => onRefresh() }
          ]
        )

    }else{
      
      Alert.alert(
        "Already Exists",
        "The Driver was already Exists!",
        [
         
          { text: "OK", onPress: () =>onRefresh()}
        ]
      )

    }
  }

  const Submit=async()=>{


    const nameError = nameValidator(name.value)
    const mobileError = mobileValidator(mobile.value)
    const emailError = emailValidator(email.value)
    const Driving = driving_license_numberValidator(driving_license_number.value)
  
    if (emailError || nameError || mobileError || Driving ) {
      setName({ ...name, error: nameError })
      setmobile({...mobile,error:mobileError})
      setEmail({ ...email, error: emailError })
      Setdriving_license_number({...driving_license_number,error:Driving})
      return
    }

    setActiveindicator(true)

    const formData=new FormData();
    formData.append("vendor",id);
    formData.append("driver_name",name.value);
    formData.append("driver_mobile",mobile.value);
    formData.append("driver_email",email.value);
    formData.append("driver_image",driver_image1);
    formData.append("driving_license_number",driving_license_number.value)
    formData.append("driving_license_front",d_front1);
    formData.append("driving_license_back",d_back1);
    formData.append("police_verify",police_verify1);
    formData.append("overall_exp",exp);
    formData.append("file",JSON.stringify(["file1","file2","file3","file4"]))
    formData.append("file1",d_front.value)
    formData.append("file2",d_back.value)
    formData.append("file3",police_verify.value)
    formData.append("file4",driver_image.value)


    console.log(formData);

    let result = await AddDriverdata(formData);

    if(result !== false){

        console.log(result);

        setvendorDrivers(result)
        setActiveindicator(false)

        setName({ value: '', error: '' })
        setmobile({ value: '', error: '' })
        setEmail({ value:'', error: '' });

        setdriver_image({ value:null, error: '' });
        setdriver_image1('');

        setd_front({ value:null, error: '' });
        setd_front1('');

        setd_back({ value:null, error: '' });
        setd_back1('');

        setpolice_verify({ value:null, error: '' });
        setpolice_verify1('');

        setexp(0);
        Setdriving_license_number({ value: '', error: '' })
        setModalVisible(false)
        onRefresh()
        Alert.alert(
          "Successfully Added",
          "The Driver was added successfully!",
          [
           
            { text: "OK", onPress: () => onRefresh() }
          ]
        )

    }else{
      
      Alert.alert(
        "Already Exists",
        "The Driver was already Exists!",
        [
         
          { text: "OK", onPress: () =>onRefresh()}
        ]
      )

    }

  }

  const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }
  
  const onRefresh = React.useCallback(async() => {
  
    setRefreshing(true);
  
   let result = await RefreshJsons(id);
     setvendorDrivers(JSON.parse(result[0].vendorDrivers))
     route.params.OtherPageRefersh("refresh");
    wait(5000).then(() => setRefreshing(false));
  }, []);


  const ResetModal = () =>{
    setName({ value: '', error: '' })
    setmobile({ value: '', error: '' })
    setEmail({ value:'', error: '' });
    setd_front({ value:null, error: '' });
    setd_front1('');
    setd_back({ value:null, error: '' });
    setd_back1('');
    setdriver_image({ value:null, error: '' });
        setdriver_image1('');

    setpolice_verify({ value:null, error: '' });
    setpolice_verify1('');
    setdriverid(null)
    setexp(0);
    setActiveindicator(false)
    setModalVisible(false)

    SetEditstate(false)
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


const EditDriver =(ival)=>{
  Alert.alert(
    "Are You Sure!!",
    `Do you want to Edit ${ival.driver_name} ?`,
    [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel"
      },
      { text: "OK", onPress: () => EditDriverFromVendor(ival) }
    ]
  );
}

const EditDriverFromVendor=async(ival)=>{

  try {

    console.log(ival);

    setModalVisible(true)

    setName({ value: ival.driver_name, error: '' })
    // const [name, setName] = useState({ value: '', error: '' })
    setmobile({ value: ival.driver_mobile, error: '' })

    setEmail({ value:ival.driver_email, error: '' });

    // setd_front({ value:null, error: '' });
    setd_front1(ival.driving_license_front);

    
    Setdriving_license_number({value:ival.driving_license_number,error:''})

    // const [d_back, setd_back] = useState({ value:null, error: '' });
    setd_back1(ival.driving_license_back);

    // const [police_verify, setpolice_verify] = useState({ value:null, error: '' });

    setpolice_verify1(ival.police_verify);

    setexp(ival.overall_exp);

    SetEditstate(true)

    setdriverid(ival.id)

    console.log(modalVisible)
    
  } catch (error) {
    console.log(error)
  }
}

const DeleteDriverFromVendor = async(ival)=>{

    console.log(ival,"fghddfh")

  try {

    let result = await DeleteDriver(ival.id)

    if(result != null){
        
        Alert.alert(
          "Driver Deleted",
          "Driver Deleted Successfully!",
          [
           
            { text: "OK", onPress: () => onRefresh()}
          ]
        )
    }
    
  } catch (error) {
    console.log(error);
  }
}

const OnDeleteDriver = (ival)=>{
  Alert.alert(
    "Are You Sure!!",
    `Do you want to delete ${ival.driver_name} ?`,
    [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel"
      },
      { text: "OK", onPress: () => DeleteDriverFromVendor(ival) }
    ]
  );
}
   
return(
    <SafeAreaProvider style={{backgroundColor:"lightgrey"}}> 
<Provider>
<Portal>
        <FAB.Group
          open={false}
          color="white"
          fabStyle={{backgroundColor:"#ce3232"}}
          icon={open ? 'plus' : 'plus'}
          actions={[
            { icon: 'plus', onPress: () => console.log('Pressed add') },
            {
              icon: 'star',
              label: 'Star',
              onPress: () => console.log('Pressed star'),
            },
            {
              icon: 'email',
              label: 'Email',
              onPress: () => console.log('Pressed email'),
            },
            {
              icon: 'bell',
              label: 'Remind',
              onPress: () => console.log('Pressed notifications'),
              small: false,
            },
          ]}
          onStateChange={onStateChange}
          onPress={() => setModalVisible(!modalVisible)}
        />
      </Portal>

      <Modal
  animationType="fade"
  transparent={true}
  visible={modalVisible}
  onRequestClose={() => ResetModal()}
  >

  <View style={styles.centeredView1}>
  <View style={styles.modalView}>
  <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
  <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
  <ScrollView showsVerticalScrollIndicator={false}>
  <Header1 style={styles.heading}>{onEditstate==true ? "Update Driver" : "Add Driver"}</Header1>

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
        container={styles.InputText}
        value={mobile.value}
        maxLength = {10}
        placeholder='mobile number'
        onChangeText={(value) => setmobile({ value: value, error: '' })} 
        error={!!mobile.error}
        errorText={mobile.error}
        />

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
        label="Driving License Number"
        returnKeyType="next"
        container={styles.InputText}
        value={driving_license_number.value}
        onChangeText={(text) => Setdriving_license_number({ value: text, error: '' })}
        error={!!driving_license_number.error}
        errorText={driving_license_number.error}
      />

        <TextInput
        label="Experience"
        keyboardType="numeric"
         container={styles.InputText}
        value={exp}
        placeholder='Experience'
        onChangeText={(value) => setexp(value)} 
        />

<View style={styles.FileUploadView}>
<Text style={{fontSize:16}}>Driver Image  : </Text>    
</View>   

<View style={styles.FileUploadView}>
  <DocumentDriverPicker Profile={driver_image} handleChange={handleChange3}/>
<Text style={{margin:6,fontSize:12}}>{driver_image1 ? driver_image1.substring(0,14) : null } </Text>
</View>


<View style={styles.FileUploadView}>
<Text style={{fontSize:16}}>Driving Licence Front : </Text>    
</View>   

    <View style={styles.FileUploadView}>
      <DocumentDriverPicker Profile={d_front} handleChange={handleChange}/>
    <Text style={{margin:6,fontSize:12}}>{d_front1 ? d_front1.substring(0,14) : null } </Text>
    </View>

<View style={styles.FileUploadView}>
<Text style={{fontSize:16}}>Driving Licence Back : </Text>    
</View>    
<View style={styles.FileUploadView}>
<DocumentDriverPicker Profile={d_back} handleChange={handleChange1}/>
<Text style={{margin:6,fontSize:12}}>{d_back1 ? d_back1.substring(0,14) : null } </Text>
</View>

<View style={styles.FileUploadView}>
<Text style={{fontSize:16}}>Police Certificate : </Text>    
</View>    
<View style={styles.FileUploadView}>
<DocumentDriverPicker Profile={police_verify} handleChange={handleChange2}/>
<Text style={{margin:6,fontSize:12}}>{police_verify1 ? police_verify1.substring(0,14) : null } </Text>
</View>


<SpinnerButton
    buttonStyle={styles.buttonStyle,
      { backgroundColor: '#ce3232',width:300 }}
    isLoading={activeIndicator}
    onPress={onEditstate==true ? Update : Submit}
    indicatorCount={10}
    spinnerType='BarIndicator'
    disabled={false}
    animateHeight={50}
    animateWidth={200}
    animateRadius={10}
  >
    <Text style={styles.buttonText}>{onEditstate==true ? "Update Driver" : "Add Driver" }</Text>
  </SpinnerButton>

</ScrollView>
</TouchableWithoutFeedback>
</KeyboardAvoidingView>
  </View>
  </View>          

    </Modal>

    {/* <Header
    placement="left"
    statusBarProps={{ barStyle: 'light-content' }}
    barStyle="light-content"
    leftComponent={<Logo STYLE={ { width:110 , height: 90, marginBottom: 8, } } />}
    centerComponent={{ text: 'Igotaxy', style: { color: '#fff' } }}
    rightComponent={ <WhatsappandCall/> }
    containerStyle={{
    backgroundColor: 'white',
    justifyContent: 'space-around',
    width:'100%',
    height:'15%'
    }}
    /> */}

<Header_New subtitle="Drivers" navigation={navigation} />
    
<View style={styles.MainContainer}>


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

<View style={{fontSize:10,marginLeft:20,alignItems:"center"}}>
  <Text style={{fontWeight:"bold",fontSize:20,color:"#ce3232"}}>
    Drivers List 
  </Text>
</View>  

{ vendorDrivers.length ? vendorDrivers.map((ival,i)=>{
    // console.log(ival,"246");

if(ival.hide_show == 1 ){    

return(
       


<CardView 
cardElevation={5}
cardMaxElevation={5}
cornerRadius={5}
style={styles.cardViewStyle}

>
<View>
    
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
  
      <Rating
      type='custom'
      ratingCount={5}
      imageSize={20}
      readonly={true}
      startingValue={ival.rating==null ? 0 : ival.rating } 
      onFinishRating={ratingCompleted}
      />
      
      <View style={styles.DriverHead}>
         <Text style={styles.Driver_driver_name}>
          {ival.driver_name}
          </Text>
      </View>
      
      <View  >
      <TouchableOpacity style={styles.DriverHead} onPress={()=>callNumber(ival.driver_mobile)} >
          <Text style={styles.DriverText}>
            Mobile : 
          </Text>
          <Text style={styles.DriverText1}>
          {ival.driver_mobile} 
          </Text>
          </TouchableOpacity>
      </View>
      
      <View style={styles.DriverHead}>
          <Text style={styles.DriverText}>
           Email : 
          </Text>
      
          <Text style={styles.DriverText1}>
          {ival.driver_email} 
          </Text>
         
      </View>
      
      <View style={styles.DriverHead}>
          <Text style={styles.DriverText}>
          Driver Joining Date : 
          </Text>
      
          <Text style={styles.DriverText1}>
          {ival.driver_created_at} 
          </Text>
         
      </View>
      
      {/* <View style={styles.DriverHead}>
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
        
      </View> */}

      <View style={{flexDirection:"row"}}>
        <Button mode="contained" style={styles.buttonstyle} onPress={()=>EditDriver(ival)} >
        Edit
        </Button>
        <Button mode="contained" style={styles.buttonstyle} onPress={()=>OnDeleteDriver(ival)} >
        Delete
        </Button>
      </View>

      </View>
</CardView>
  
    )
}

}) :null  }
    
</CardView>






</ScrollView>

</View>

</Provider>

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
        container: {
          flex: 1
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
            height: 250,
            flexDirection: "column",
            // alignContent:"center",
            // alignItems:"center",
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
              fontSize:15,
              fontWeight:"500"
          },
          DriverText1:{
            fontSize:15,
            marginLeft:2,
            color:"#ce3232"
            // margin:3
            // fontWeight:"500"
          },
          Driver_driver_name:{
            fontSize:20,
            fontWeight:"bold",
            marginLeft:2,
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
          buttonstyle:{
            backgroundColor:"#ce3232",
            width:150,
            marginLeft:12
          },
          tinyLogo:{
              width:100,
              height:40,
              marginLeft:3
          },
          centeredView1: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            marginTop: 22,
            
          },
          modalView: {
            margin: 20,
            backgroundColor: "#e6e6e6",
            borderRadius: 20,
            padding: 15,
            shadowColor: "#000000",
            shadowOffset: {
              width: 5,
              height: 2
            },
            width:330,
            height:650,
        
            shadowOpacity: 0.15,
            shadowRadius: 10,
            elevation: 25
          },
           modalText1: {
           textAlign: "center",
           },
          modelHead:{
            alignItems:"center",
           },
          modalText: {
            textAlign: "center",
            fontWeight:"700",
            fontSize:25,
            color:"#ce3232"
          }, 
          buttonText:{
            fontSize: 15,
            textAlign: 'center',
            color: 'white',
            }
        
    })