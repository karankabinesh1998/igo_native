import React, { useState , useEffect  } from 'react';

import { Appbar } from 'react-native-paper';

import { Header } from 'react-native-elements';

export default  function Header_New({navigation,subtitle = null , showback = true , Wallet=0 }){


    const _goBack=()=>{
        navigation.navigate('Dashboard')
        return true;
      }

      
        return(
          
            <Appbar.Header style={{backgroundColor:"white",height:70}}>
            
            { showback ? <Appbar.BackAction onPress={_goBack}  color="#ce3232"/> : null }
    
            <Appbar.Content title={subtitle} titleStyle={{fontSize:25}}  color="#ce3232"/>
    
    
            {subtitle=="IGOTAXY" ? <Appbar.Content title={`Wallet : Rs:${Wallet}`} titleStyle={{fontSize:15,marginLeft:10}} color="#ce3232"/> : null }
            
    
            </Appbar.Header>

        )
      

}