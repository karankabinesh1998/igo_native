// import Stored from "./storageDetails";
import { ToastAndroid } from "react-native";
import Stored from '../configuration/storageDetails';
import AsyncStorage from "@react-native-community/async-storage";
import RNBackgroundDownloader from "react-native-background-downloader";
import RNFS from "react-native-fs";
import Config from "./config";

// export async function downloadedFiles(id, name, des, thumb) {
//   let downloadedData = await AsyncStorage.getItem(Stored.downloaded);
//   let parsedDownloadedData = downloadedData ? JSON.parse(downloadedData) : [];
//   await parsedDownloadedData.push({ id, name, des, thumb });
//   await AsyncStorage.setItem(
//     Stored.downloaded,
//     JSON.stringify(parsedDownloadedData)
//   );
//   return true;
// }
// export async function seenTimes(id) {
//   let storeddata = await AsyncStorage.getItem(Stored.seen);
//   let parsedData = storeddata ? JSON.parse(storeddata) : [];
//   await parsedData.push({ id, time: Date.now() });
//   await AsyncStorage.setItem(Stored.seen, JSON.stringify(parsedData));
//   return true;
// }

// export async function videoSeenTimes() {
//   let storeddata = await AsyncStorage.getItem(Stored.seen);
//   let parsedData = storeddata ? JSON.parse(storeddata) : [];
//   let value = await AsyncStorage.getItem("videoId");
//   if (value !== "0") {
//     value = JSON.parse(value);
//     await parsedData.push({
//       id: value.id,
//       time: Date.now(),
//       st: value.st,
//       et: value.et,
//       ed: value.ed,
//       pg: value.pg
//     });
//     await AsyncStorage.setItem(Stored.seen, JSON.stringify(parsedData));
//     await AsyncStorage.setItem("videoId", "0");
//   }
//   return true;
// }

// export async function toast(text) {
//   ToastAndroid.showWithGravityAndOffset(
//     text,
//     ToastAndroid.SHORT,
//     ToastAndroid.TOP,
//     0,
//     50
//   );
// }
// export async function downloadThumbnail(url, id) {
//   RNBackgroundDownloader.download({
//     id: id,
//     url: url,
//     destination: `${RNBackgroundDownloader.directories.documents}/${id}`
//   })
//     .begin(expectedBytes => {
//       console.warn(`Going to download ${expectedBytes} bytes!`);
//     })
//     .progress(percent => {
//       console.warn(`Downloaded: ${percent * 100}%`);
//     })
//     .done(() => {
//       console.warn("Download is done!");
//     })
//     .error(error => {
//       console.warn(`Download canceled due to ${error}`);
//     });
// }
// export async function deleteFiles(data) {
//   let path = `${RNBackgroundDownloader.directories.documents}/${data}`;
//   RNFS.unlink(path)
//     .then(() => {
//       console.warn("FILE DELETED");
//     })
//     .catch(err => {
//       console.warn(err.message);
//     });
// }
// export async function requestServer(result, goto) {
//   let results = JSON.parse(result);
//   let URL = config.ACCESS_POINT + config.GETUPDATES + results["userid"];
//   let request = await fetch(URL);
//   let requestJson = await request.json();
//   let serverResult = requestJson ? JSON.stringify(requestJson) : requestJson;
//   if (serverResult === false) {
//     let localData = await AsyncStorage.getItem(Stored.downloaded);
//     localData = await JSON.parse(localData);
//     if (localData && localData.length) {
//       localData.map((ival, i) => {
//         deleteFiles(ival.id);
//         deleteFiles(ival.thumb);
//       });
//     }
//     await AsyncStorage.clear();
//     goto.navigate("Auth");
//   } else if (result !== serverResult) {
//     await AsyncStorage.setItem(Stored.data, serverResult);
//     return serverResult;
//   } else {
//     return null;
//   }
// }
// export async function sendUserLog(userId) {
//   let localData = await AsyncStorage.getItem(Stored.seen);
//   if (localData) {
//     try {
//       let URL = config.ACCESS_POINT + config.USERLOG + userId;
//       let request = await fetch(URL, {
//         method: "POST",
//         headers: {
//           Accept: "application/json",
//           "Content-Type": "application/json"
//         },
//         body: localData
//       });
//       if (request.status === 200) {
//         AsyncStorage.setItem(Stored.seen, "");
//       }
//     } catch (error) {
//       toast("There was an error.");
//     }
//   }
// }

// export async function appProduct() {
//     try {
//       let data = []
// //      AsyncStorage.removeItem(Stored.product);
//       let URL = config.ACCESS_POINT + config.PRODUCTJSON;
//       let request = await fetch(URL);
//       let requestJson = await request.json();
//       if(requestJson){
//         data = JSON.stringify(requestJson.productList)
// //        console.log(data);
// //requestJson["productList"] ? JSON.stringify(requestJson.productList) : requestJson.productList;
//       }
// //      if(data){
// //        console.log(serverResult[""])
//       AsyncStorage.setItem(Stored.product,data);
// //      }
//       return requestJson.productList;
//         // fetch(URL, { method: "GET" })
//         //       .then(response => response.json())
//         //       .then(async responseJson => {
//         //                 data = JSON.stringify(responseJson.productList);
//         //                 if(data){
//         //                 }
//         //                return data;
//         //         })
//   //  console.log(key)
//     } catch (error) {
//       toast("There was an error.");
//     }
// }
// export async function sendUserAnswer() {
//   let localData = await AsyncStorage.getItem("quizAnswers");
//   if (localData) {
//     try {
//       let URL = config.ACCESS_POINT + config.MASTERINSERT + "tbl_quizAnswer";
//       let request = await fetch(URL, {
//         method: "POST",
//         headers: {
//           Accept: "application/json",
//           "Content-Type": "application/json"
//         },
//         body: localData
//       });
//       if (request.status === 200) {
//         AsyncStorage.setItem("quizAnswers", "");
//       }
//     } catch (error) {
//       toast("There was an error.");
//     }
//   }
// }
// export async function userDetails() {
//   let UserData = await AsyncStorage.getItem(Stored.data);
//   return JSON.parse(UserData).user[0];
// }
// export async function qrAttendance(eventId) {
//   eventId = eventId.split("#@");
//   if (eventId.length === 2) {
//     let data = await AsyncStorage.getItem(Stored.data);
//     data = JSON.parse(data);
//     const localData = {};
//     localData.userid = data.user[0].id;
//     localData.customerId = data.user[0].customerId;
//     localData.programid = eventId[1];
//     try {
//       let URL = config.ACCESS_POINT + config.ATTENDANCE;
//       let request = await fetch(URL, {
//         method: "POST",
//         headers: {
//           Accept: "application/json",
//           "Content-Type": "application/json"
//         },
//         body: JSON.stringify(localData)
//       });
//       if (request.status === 200) {
//         console.warn(request);
//         toast(`Attendance for ${eventId[0]} is registered, Thank you`);
//       }
//     } catch (error) {
//       toast("There was an error.");
//     }
//   } else {
//     toast("Invalid QR-code.");
//   }
// }
// export async function requestRedis(result, goto) {
//   let results = JSON.parse(result);
//   let URL = config.REDIS_ACCESS_POINT + config.GETSFADATA + results["userid"];
//   console.log(URL);
//   let request = await fetch(URL);
//   let requestJson = await request.json();
//   let requestRedis = requestJson ? JSON.stringify(requestJson) : requestJson;
//   if (requestRedis === false) {
//     let localData = await AsyncStorage.getItem(Stored.downloaded);
//     localData = await JSON.parse(localData);
//     if (localData && localData.length) {
//       localData.map((ival, i) => {
//         deleteFiles(ival.id);
//         deleteFiles(ival.thumb);
//       });
//     }
//     await AsyncStorage.clear();
//     goto.navigate("Auth");
//   } else if (result !== requestRedis) {
//     await AsyncStorage.setItem(Stored.data, requestRedis);
//     return requestRedis;
//   } else {
//     return null;
//   }
// }
// export async function NotificationRedis(result, goto) {
//   let results = JSON.parse(result);
//   let URL =
//     config.REDIS_ACCESS_POINT + config.SFANotification + results["userid"];
//   console.log(URL);
//   let request = await fetch(URL);
//   let requestJson = await request.json();
//   let requestRedis = requestJson ? JSON.stringify(requestJson) : requestJson;
//   if (requestRedis === false) {
//     let localData = await AsyncStorage.getItem(Stored.downloaded);
//     localData = await JSON.parse(localData);
//     if (localData && localData.length) {
//       localData.map((ival, i) => {
//         deleteFiles(ival.id);
//         deleteFiles(ival.thumb);
//       });
//     }
//     await AsyncStorage.clear();
//     goto.navigate("Auth");
//   } else if (result !== requestRedis) {
//     await AsyncStorage.setItem(Stored.notification, requestRedis);
//     return requestRedis;
//   } else {
//     return null;
//   }
// }
// export async function requestDFCars(result, goto) {
//   let results = JSON.parse(result);
//   let URL = config.ACCESS_POINT + config.DFCarsData + results["userid"];
//   console.log(URL);
//   let request = await fetch(URL);
//   let requestJson = await request.json();
//   let requestRedis = requestJson ? JSON.stringify(requestJson) : requestJson;
//   if (requestRedis === false) {
//     // await AsyncStorage.clear();
//     goto.navigate("Auth");
//   } else if (result !== requestRedis) {
//     // await AsyncStorage.clear();
//     await AsyncStorage.setItem(Stored.data, requestRedis);
//     return requestRedis;
//   } else {
//     return null;
//   }
// }

export async function RefreshJsons(id){
  let URL = Config.ACCESS_POINT + Config.AppLoginIgotaxy + `/${id}`;
  let request = await fetch(URL);
  let requestJson = await request.json();
   let data = JSON.stringify(requestJson)
  await AsyncStorage.setItem(Stored.userDetail,data);  
  AsyncStorage.setItem("Userdetail",JSON.stringify(requestJson))

  let Stored_Data = await AsyncStorage.getItem(Stored.userDetail);
  let  data1= Stored_Data !== null ? JSON.parse(Stored_Data) : []
  return data1

}

export async function TripsJsons(id=null){
  let URL = Config.ACCESS_POINT + Config.NewTripsJson;
  console.log(URL);
  let request = await fetch(URL);
  let requestJson = await request.json();
 let data = JSON.stringify(requestJson)
//  console.log(data,"trips json");
  await AsyncStorage.setItem(Stored.TripsJsob,data);  
  AsyncStorage.setItem("TripsJsob",JSON.stringify(requestJson))

  let Stored_Data = await AsyncStorage.getItem(Stored.TripsJsob);
  let  data1= Stored_Data !== null ? JSON.parse(Stored_Data) : []
  return data1

}


export async function UploadProfile(formData,id){
  let URL = Config.ACCESS_POINT + Config.UploadUserProfile+`/${id}`;
  console.log(URL);
  let request = await fetch(URL, {
    method: "POST",
    headers: {
      // "Accept": "application/json",
      'Content-Type': 'multipart/form-data'
    },
    body: formData
        });

        if(request.status == 200){

          let requestJson = await request.json();
          let data = JSON.stringify(requestJson)

          await AsyncStorage.setItem(Stored.userDetail,data);  
          AsyncStorage.setItem("Userdetail",JSON.stringify(requestJson))
        
          let Stored_Data = await AsyncStorage.getItem(Stored.userDetail);
          let  data1= Stored_Data !== null ? JSON.parse(Stored_Data) : [];
          console.log(data1);
          return data1

        }
}


export async function AddBidTrips(formData){
  let URL = Config.ACCESS_POINT + Config.AddBidTrips;
  console.log(URL);
  let request = await fetch(URL, {
    method: "POST",
    headers: {
      // "Accept": "application/json",
      'Content-Type': 'multipart/form-data'
    },
    body: formData
        });

        if(request.status == 200){

          let requestJson = await request.json();
          let data = JSON.stringify(requestJson);

          console.log(requestJson);

          await AsyncStorage.setItem(Stored.BiddingData,data);  
          AsyncStorage.setItem("BiddingData",JSON.stringify(requestJson))
        
          let Stored_Data = await AsyncStorage.getItem(Stored.BiddingData);
          let  data1= Stored_Data !== null ? JSON.parse(Stored_Data) : [];
          console.log(data1);
          return data1

        }
}


export async function UploadAppDocumentUpload(formData){
  let URL = Config.ACCESS_POINT + Config.AppDocumentUpload;
  console.log(URL);
  let request = await fetch(URL, {
    method: "POST",
    headers: {
      // "Accept": "application/json",
      'Content-Type': 'multipart/form-data'
    },
    body: formData
        });

        if(request.status == 200){

          let requestJson = await request.json();
          let data = JSON.stringify(requestJson)

          let Stored_Data = await AsyncStorage.getItem(Stored.userDetail);
          let  data1= Stored_Data !== null ? JSON.parse(Stored_Data) : [];

          data1[0].Documentation = data

          console.log(data1,"AsyncStorage");
          // await AsyncStorage.setItem(Stored.userDetail,JSON.stringify(data1));  
          // AsyncStorage.setItem("Userdetail",JSON.stringify(data1))
        
          
          // console.log(data1);
          return requestJson

        }
}
