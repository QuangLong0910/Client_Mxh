import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button, Image, StyleSheet, Text, TextInput, TouchableHighlight, View } from 'react-native';
const Login = (props) =>{
  const[usernamedn,setUsernamedn]=useState("");
  const[passdn,setpassdn]=useState("");
  const dangnhap = async () => {
    if (usernamedn.length == 0) {
      alert("Không được để trống username");
      return;
    }
    if (passdn.length == 0) {
      alert("Không được để trống password");
      return;
    }
    if(usernamedn=="Admin"&&passdn=="123"){
      props.navigation.navigate('Admin');
      return;
    } else{
      let url_user = "http://10.24.46.249:3000/users?username=" +usernamedn;
    fetch(url_user).then((res) => { return res.json(); })
      .then(async (res_login) => {
        if (res_login.length != 1) {
          alert("Sai username hoặc lỗi trùng lặp dữ liệu");
          return;
        }
        else {
          let objU = res_login[0];
          if (objU.pass != passdn) {
            alert("Sai pass")
            return;
          } else {
            try {
              await AsyncStorage.setItem('loginIfo', JSON.stringify(objU));
              // props.navigation.navigate("dki");
              alert("Đăng nhập thành công");
              props.navigation.navigate('User');
            } catch (e) {
              // saving error
              console.log(e);
            }
          }
        }
      })
    }
    

  }
  const dangki = () =>{
    props.navigation.navigate("Signup");
  }
    return(
        <View style={styles.cotainer}>
      <Text style={styles.text}>Wellcome to the app</Text>
      <Text style={styles.text2}>Login</Text>
      <Text>User name</Text>
      <TextInput style={styles.textInput} placeholder="Nhập username" onChangeText={(txt) => { setUsernamedn(txt) }} />
      <Text style={{ marginTop: 20 }}>Pass Word</Text>
      <TextInput style={styles.textInput} textContentType="password" placeholder="Nhập password" onChangeText={(txt) => { setpassdn(txt) }} />
      <View style={styles.login}>
        <TouchableHighlight activeOpacity={0.6}
          onPress={dangnhap}>
          <Text style={styles.chu25} >Login</Text>
        </TouchableHighlight>

      </View>
      <View style={styles.viewdangky}>
        <Text style={styles.text4}>Do you have account?</Text>
        <Text style={styles.text5} onPress={dangki}>Register</Text>
      </View>
    </View>
    )
}
export default Login
const styles = StyleSheet.create({
    cotainer: {
      flex: 1,
      marginTop: 120,
      marginStart: 10,
      marginEnd: 10,
      flexDirection: 'column'

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