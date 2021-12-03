import React, { Component } from 'react'
import AsyncStorage from "@react-native-community/async-storage";
import Stored from '../configuration/storageDetails';
import Config from '../configuration/config';

export default function RefreshJson(id) {
  let data = [];
  let URL = Config.ACCESS_POINT + Config.AppLoginIgotaxy + `/${id}`;
  //   console.log(URL);
  fetch(URL, {
    method: "GET",

  })
    .then(response => response.json())
    .then(async responseJson => {
      if (responseJson.length) {
        data = JSON.stringify(responseJson)

        await AsyncStorage.setItem(Stored.userDetail, data);
        AsyncStorage.setItem("Userdetail", JSON.stringify(responseJson))

        let Stored_Data = await AsyncStorage.getItem(Stored.userDetail);
        let data1 = Stored_Data !== null ? JSON.parse(Stored_Data) : []



        if (data1) {
          //    console.log(data1,"FFFF");
          return data1
        }
      }



    }
    )



}

