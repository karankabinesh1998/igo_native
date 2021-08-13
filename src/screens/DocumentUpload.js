import { View , Text, ScrollView ,Image , RefreshControl,BackHandler,Alert, StyleSheet} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import React, { useState , useEffect  } from 'react';
import CardView from 'react-native-cardview';
import { Header } from 'react-native-elements';
import Logo from '../components/Logo';
import WhatsappandCall from '../components/WhatsappandCall';
import AsyncStorage from "@react-native-community/async-storage";
import Stored from '../configuration/storageDetails';
import { RefreshJsons } from '../configuration/functional';
import Button from '../components/Button';
import DocumentImagePicker from '../components/DocumentImagePicker';


export default  function DocumentUpload(navigation){

  console.log(navigation.route.params.userDetail,"20202020")

    const [userDetail1, setuserDetail] = useState(navigation.route.params.userDetail.userDetail);
    const [ DocumentationArray , setDocumentationArray ] = useState(JSON.parse(userDetail1[0].Documentation));
    
    const [refreshing, setRefreshing] = React.useState(false);
    const [approval,setApproval] = useState(DocumentationArray.length ?  DocumentationArray[0].approval : 0 )
    const [showButton, setShowButton] = useState(DocumentationArray.length ? true : false);
    const [aadhar_front, setaadhar_front] = useState(DocumentationArray.length ? DocumentationArray[0].aadhar_front : null);
    const [aadhar_back, setaadhar_back] = useState(DocumentationArray.length ? DocumentationArray[0].aadhar_back : null);
    const [driving_licence_front, setdriving_licence_front] = useState(DocumentationArray.length ? DocumentationArray[0].driving_licence_front : null);
    const [driving_licence_back, setdriving_licence_back] = useState(DocumentationArray.length ? DocumentationArray[0].driving_licence_back : null);
    const [pancard_front, setpancard_front] = useState(DocumentationArray.length ? DocumentationArray[0].pancard_front : null);
    const [pancard_back, setpancard_back] = useState(DocumentationArray.length ? DocumentationArray[0].pancard_back : null);


    // setuserDetail(userDetail1[0][0]);

        // console.log(DocumentationArray,"DocumentUpload");
        // setuserDetail()
   
       


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


          const handleUserDeatils = (a,b)=>{

            if(a=='aadhar_front'){
              setaadhar_front(b);
              Alert.alert(
                `Aadhar Card Front`,
                "Aadhar Card Front Uploaded Successfully!",
                [
                 
                  { text: "OK", onPress: () => console.log("OK Pressed") }
                ]
              )
            }else if(a=='aadhar_back'){
              setaadhar_back(b);
              Alert.alert(
                `Aadhar Card Back`,
                "Aadhar Card Back Uploaded Successfully!",
                [
                 
                  { text: "OK", onPress: () => console.log("OK Pressed") }
                ]
              )
            }else if(a=='driving_licence_back'){
              setdriving_licence_back(b);
              Alert.alert(
                `Driving License Back`,
                "Driving License Back Uploaded Successfully!",
                [
                 
                  { text: "OK", onPress: () => console.log("OK Pressed") }
                ]
              )
            }else if(a=='driving_licence_front'){
              setdriving_licence_front(b)
              Alert.alert(
                `Driving License Front`,
                "Driving License Front Uploaded Successfully!",
                [
                 
                  { text: "OK", onPress: () => console.log("OK Pressed") }
                ]
              )
            }else if(a=='pancard_front'){
              setpancard_front(b)
              Alert.alert(
                `Pan Card Front`,
                "Pan Card Front Uploaded Successfully!",
                [
                 
                  { text: "OK", onPress: () => console.log("OK Pressed") }
                ]
              )
            }else if(a=='pancard_back'){
              setpancard_back(b)
              Alert.alert(
                `Pan Card Back`,
                "Pan Card Back Uploaded Successfully!",
                [
                 
                  { text: "OK", onPress: () => console.log("OK Pressed") }
                ]
              )
            }

           


          }

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }
  
  const onRefresh = React.useCallback(async() => {
  
    setRefreshing(true);
  
    let result = await RefreshJsons(userDetail1[0].id);
    let Stored_Data = await AsyncStorage.getItem(Stored.userDetail);
    let data1 = Stored_Data !== null ? JSON.parse(Stored_Data) : [];
     
    setDocumentationArray(JSON.parse(result[0].Documentation))
      setaadhar_front(DocumentationArray[0].aadhar_front)
      setaadhar_back(DocumentationArray[0].aadhar_back)
      setdriving_licence_front(DocumentationArray[0].driving_licence_front)
      setdriving_licence_back(DocumentationArray[0].driving_licence_back)
      setpancard_front(DocumentationArray[0].pancard_front)
      setpancard_back(DocumentationArray[0].pancard_back)
      setShowButton(DocumentationArray.length ? true : false)
      setApproval(DocumentationArray[0].approval)
     console.log(DocumentationArray ,"Refrehjson");
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

{showButton == true ? 

<>
{approval == 0  ? 
<CardView
cardElevation={5}
cardMaxElevation={5}
cornerRadius={5}
style={styles.cardViewStyle1}>

<View style={styles.HeadingView1}>
    <Text style={styles.TextView}>Waiting For Approval</Text> 
    {/* <DocumentImagePicker Profile={aadhar_front} docname={'aadhar_front'} id={userDetail1[0].id} handleUserDeatils={handleUserDeatils}/> */}
</View>

</CardView> :
<>
<CardView
cardElevation={5}
cardMaxElevation={5}
cornerRadius={5}
style={styles.cardViewStyle3}>

<View style={styles.HeadingView1}>
   <Text style={styles.TextView2}>Approved</Text> 
  </View>

</CardView>
</>
}

</>

: null}

<CardView
cardElevation={5}
cardMaxElevation={5}
cornerRadius={5}
style={styles.cardViewStyle}>

<View style={styles.HeadingView}>
    <Text style={styles.TextView}>Aadhar Front </Text>
    <DocumentImagePicker Profile={aadhar_front} docname={'aadhar_front'} id={userDetail1[0].id} handleUserDeatils={handleUserDeatils}/>

    <Text style={styles.TextView}>Aadhar Back </Text>
    <DocumentImagePicker Profile={aadhar_back} docname={'aadhar_back'} id={userDetail1[0].id} handleUserDeatils={handleUserDeatils} />
</View>

</CardView>    

{/* <CardView
cardElevation={5}
cardMaxElevation={5}
cornerRadius={5}
style={styles.cardViewStyle}>

<View style={styles.HeadingView}>
    
</View>

</CardView>   */}


<CardView
cardElevation={5}
cardMaxElevation={5}
cornerRadius={5}
style={styles.cardViewStyle}>

<View style={styles.HeadingView}>
    <Text style={styles.TextView}>Driving License Front </Text>
    <DocumentImagePicker Profile={driving_licence_front} docname={'driving_licence_front'} id={userDetail1[0].id} handleUserDeatils={handleUserDeatils} />

    <Text style={styles.TextView}>Driving License Back </Text>
    <DocumentImagePicker Profile={driving_licence_back} docname={'driving_licence_back'} id={userDetail1[0].id} handleUserDeatils={handleUserDeatils} />
</View>

</CardView>  

{/* 
<CardView
cardElevation={5}
cardMaxElevation={5}
cornerRadius={5}
style={styles.cardViewStyle}>

<View style={styles.HeadingView}>
    
</View>

</CardView>   */}


<CardView
cardElevation={5}
cardMaxElevation={5}
cornerRadius={5}
style={styles.cardViewStyle}>

<View style={styles.HeadingView}>
    <Text style={styles.TextView}>Pan Card Front </Text>
    <DocumentImagePicker Profile={pancard_front} docname={'pancard_front'} id={userDetail1[0].id} handleUserDeatils={handleUserDeatils} />

    <Text style={styles.TextView}>Pan Card Back </Text>
    <DocumentImagePicker Profile={pancard_back} docname={'pancard_back'} id={userDetail1[0].id} handleUserDeatils={handleUserDeatils} />
</View>

</CardView>  


{/* <CardView
cardElevation={5}
cardMaxElevation={5}
cornerRadius={5}
style={styles.cardViewStyle}>

<View style={styles.HeadingView}>
    
</View>

</CardView>   */}





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
        
       },
       cardViewStyle1:{
 
        width: '96%', 
        height: 50,
        flexDirection: "column",
        marginTop:9,
        justifyContent:"center",
        backgroundColor:"yellow"
        
       },
       cardViewStyle3:{
 
        width: '96%', 
        height: 50,
        flexDirection: "column",
        marginTop:9,
        justifyContent:"center",
        backgroundColor:"green"
        
       },
       TextView2:{
        textAlign:"center",
        fontSize:20,
        fontWeight:"500"
        // backgroundColor:"green"
       },
       TextView:{
           textAlign:"center",
           fontSize:20,
           fontWeight:"500"
       },
       HeadingView:{
           flex:1,
           flexDirection:"column"
       },
       HeadingView1:{
        // flex:1,
        // flexDirection:"column"
    }

    })