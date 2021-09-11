import React, { useState , useEffect  } from 'react';

import { Appbar } from 'react-native-paper';

import { Header } from 'react-native-elements';

export default  function Header_New({navigation,subtitle = null , showback = true }){


    const _goBack=()=>{
        navigation.navigate('Dashboard')
        return true;
      }


    return(
        <Appbar.Header style={{backgroundColor:"white",height:70}}>
            
        { showback ? <Appbar.BackAction onPress={_goBack}  color="#ce3232"/> : null }

        <Appbar.Content title={subtitle}  color="#ce3232"/>

        {/* <Appbar.Action icon="dots-vertical"  color="#ce3232"/> */}
        </Appbar.Header>

    //     <Header 
    //   placement="left"
    //   statusBarProps={{ barStyle: 'light-content' }}
    //   barStyle="light-content"
    //   leftComponent={{ text: 'Igotaxy', style: { color: '#ce3232',fontSize:30,fontWeight:"bold" } }}
    //   // centerComponent={{ text: 'Igotaxy', style: { color: '#fff' } }}
    //   rightComponent={{ text: subtitle, style: { color: '#ce3232',fontSize:15 ,margin:9} } }
    //   containerStyle={{
    //       backgroundColor: 'white',
    //       justifyContent: 'space-around',
    //       width:'100%',
    //       height:'14%'
    //     }}
    //   />
    )

}