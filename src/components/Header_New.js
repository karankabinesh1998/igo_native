import React, { useState , useEffect  } from 'react';

import { Appbar } from 'react-native-paper';

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
    )

}