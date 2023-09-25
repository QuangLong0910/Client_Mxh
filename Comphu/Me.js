import { View,Text,Image } from "react-native"
import AsyncStorage from '@react-native-async-storage/async-storage';
import React,{ useState } from "react";
const Me = (props) =>{
    const[loginInfor,setLoginIfor]=useState({});

    const getuser = async() =>{
        try {
            const value = await AsyncStorage.getItem('loginIfo')
            if(value !== null) {
              // value previously stored
              setLoginIfor(JSON.parse(value));
            }
          } catch(e) {
            // error reading value
            console.log(e);
          }
    }
    React.useEffect(() => {
        const unsubscribe = props.navigation.addListener('focus', () => {
          // do something
          //cập nhật giao diện ở đây
          getuser();
        });
    
        return unsubscribe;
      }, [props.navigation]);
    const doimk = () =>{
        props.navigation.navigate("doimk");
    }
    const dx =()=>{
      props.navigation.navigate("Login");
    }
    return (
        <View style={{marginTop:20,borderWidth:1,backgroundColor:"#fff",borderRadius:15,justifyContent:'center',alignItems:'center',marginTop:250}}>
          <Image  style={{width: 100, height: 100, marginLeft:10,borderRadius:20,marginTop:10}} source={require('../assets/14.jpg')}  />
            <Text style={{fontSize:20,margin:10}}>{loginInfor.username}</Text>
            <Text style={{marginTop:15,fontSize:20,margin:10}} onPress={doimk}>Đổi mật khẩu</Text>
            <Text style={{marginTop:15,fontSize:20,margin:10}} onPress={dx}>Đăng xuất</Text>
        </View>
    )
}
export default Me