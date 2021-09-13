import * as React from 'react';
import { View, useWindowDimensions,TouchableOpacity,StyleSheet,Text  } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Header_New from '../components/Header_New';
// import { RefreshJsons , AddBidTrips , ConfirmActiveTrip } from '../configuration/functional';
import ProfileScreen from './ProfileScreen';
import DocumentUpload from './DocumentUpload';
import Entypo from 'react-native-vector-icons/Entypo';
import {Provider } from 'react-native-paper';


export default function NewProfile({ navigation,route }) {
  // console.log(route.params.OtherPageRefersh,"katgah");
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'Personal' },
    { key: 'second', title: 'Documents' },
  ]);

  return (
    <SafeAreaProvider style={{backgroundColor:"lightgrey"}}> 
    <Provider>
    <Header_New subtitle="My Profile" navigation={navigation} />
    <TabView
      navigationState={{ index, routes }}
      renderScene={SceneMap({
        first:  () => <ProfileScreen userDetail={route.params.userDetail} OtherPageRefersh={route.params.OtherPageRefersh} navigation={navigation}  />, 
        second: ()=> <DocumentUpload userDetail={route.params.userDetail} OtherPageRefersh={route.params.OtherPageRefersh}  navigation={navigation} />, 
      })
    }
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
    />
    </Provider>
    <View style={styles.headerFooterStyle}>
<TouchableOpacity style={styles.iconstyle} onPress={()=>navigation.navigate('Dashboard')}>
<Entypo name="home" color={'#ce3232'}  size={22}  />
<Text style={{textAlign:"center",fontSize:10,marginTop:5,fontWeight:"bold",color:"#ce3232"}}>Home</Text>
</TouchableOpacity>
</View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
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