import * as React from 'react';
import { View, useWindowDimensions  } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Header_New from '../components/Header_New';
// import { RefreshJsons , AddBidTrips , ConfirmActiveTrip } from '../configuration/functional';
import ProfileScreen from './ProfileScreen';
import DocumentUpload from './DocumentUpload';

const FirstRoute = () => (
  <View style={{ flex: 1, backgroundColor: 'red' }} />
);

const SecondRoute = () => (
  <View style={{ flex: 1, backgroundColor: '#673ab7' }} />
);

// const renderScene = SceneMap({
//   first:  () => <ProfileScreen ,
//   second: SecondRoute,
// });

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
    </SafeAreaProvider>
  );
}