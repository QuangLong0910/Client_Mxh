import { useState } from 'react';
import {  StyleSheet, Text, TextInput, TouchableHighlight, View } from 'react-native';
const Signup = () =>{
    const [userdk,setuserdki]=useState("");
    const [passdk,setpassdki]=useState("");
    const saveUser =() =>{
        let url_user_dki="z";
        let obj_user={username:userdk,pass:passdk};
        fetch(url_user_dki, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(
            obj_user
          )
        }).then((res) =>{
          if(res.status==201){
            alert("Đăng ký thành công")
          }
        }).catch((ex)=>{
          console.log(ex);
        })
    }
    return(
        <View style={styles.cotainer}>
      <Text style={styles.text}>Wellcome to the app</Text>
      <Text style={styles.text2}>Signup</Text>
      <Text>User name</Text>
      <TextInput style={styles.textInput} placeholder="Username" onChangeText={(txt) => { setuserdki(txt) }} />
      <Text style={{ marginTop: 20 }}>Pass Word</Text>
      <TextInput textContentType='password'placeholder='Password' style={styles.textInput} onChangeText={(txt) => { setpassdki(txt) }} />
      <View style={styles.login}>
        <TouchableHighlight activeOpacity={0.6}
          onPress={saveUser}>
          <Text style={styles.chu25} >Sign up</Text>
        </TouchableHighlight>

      </View>
    </View>
    )
}
export default Signup
const styles = StyleSheet.create({
    cotainer: {
      flex: 1,
      marginTop: 30,
      marginStart: 10,
      marginEnd: 10,
      flexDirection: 'column',
    },
    text: {
      fontFamily: 'Popins',
      fontSize: 28,
      color: 'blue',
      fontWeight: 'bold'
    },
    text2: {
      marginTop: 50,
      textAlign: 'center',
      fontSize: 30,
      color: 'red',
      marginBottom: 40,
    },
    textInput: {
      height: 48,
      borderRadius: 10,
      borderWidth: 1,
      marginTop: 10,
    },
    textbutton: {
      marginTop: 50,
      alignItems: 'center',
      height: 50,
      backgroundColor: 'blue',
      borderRadius: 10,
      justifyContent: 'center'
  
    },
    login: {
      width: 370,
      height: 50,
      backgroundColor: 'green',
      alignItems: 'center',
      borderRadius: 5,
      marginTop: 15,
    },
    textLogin: {
      textAlign: 'center',
      fontSize: 23,
      fontWeight: 'bold',
      color: '#fff',
      alignItems: 'center',
    },
    viewdangky: {
      marginTop: 10,
      flexDirection: 'row'
    },
    text4: {
      fontSize: 15,
      marginRight: 10,
    },
    text5: {
      fontSize: 15,
      marginRight: 10,
      color: 'green',
    },
    chu25: {
      fontSize: 25,
      fontStyle: 'bold',
      color: 'white',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 5,
    },
  })