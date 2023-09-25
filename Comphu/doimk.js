import React, { useState } from "react"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View,Text, Button,TextInput,StyleSheet } from "react-native"

const DOimk = (props) =>{
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
    const[mkupdate,setmkupdate]=useState("");
    const updatemk = () =>{
        let idupdate=loginInfor.id;
        let objUserupdate={pass:mkupdate,username:loginInfor.username};
        let url_update_user="http://10.24.46.249:3000/users/"+idupdate;
        fetch(url_update_user, {
            method: 'PUT',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(
              objUserupdate
            )
          }).then((res) =>{
            if(res.status==200){
              alert("Đã đổi mật khẩu")
            }
          }).catch((ex)=>{
            console.log(ex);
          })
    }
    return(
        <View style={{margin:20}}> 
            <Text style={{fontSize:25,color:"red"}}>Đổi mật khẩu</Text>
            <TextInput style={styles.textInput} placeholder="Nhập mật khẩu mới" onChangeText={(txt) => { setmkupdate(txt) }} />
            <Button title="Save" onPress={updatemk}/>
           
        </View>
    )
}
export default DOimk
const styles=StyleSheet.create({
    textInput: {
        height: 48,
        borderRadius: 10,
        borderWidth: 1,
        marginTop: 20,
        marginBottom:15
      }
})