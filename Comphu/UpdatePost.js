import React, { useState } from "react"
import { View, TextInput, Text, StyleSheet, Button,Image, Alert } from "react-native"
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
const UpdatePost = (props) => {
 
  const [title, settitle] = useState('');
  const [author, setauthor] = useState('');
  const [content, setcontent] = useState('');
  const [image, setimage] = useState('');
  const [status, setstatus] = useState('');

  const [img_source, setimg_source] = useState (null);
  const [img_base64, setiimg_base64] = useState (null);
  const pickImage = async () => {
         
    // Đọc ảnh từ thư viện thì không cần khai báo quyền
    let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3], // khung view cắt ảnh 
        quality: 1,
    });


    console.log(result);


    if (!result.canceled) {
        setimg_source(result.assets[0].uri);
        // chuyển ảnh thành base64 để upload lên json
        let _uri = result.assets[0].uri;  // địa chỉ file ảnh đã chọn
        let file_ext = _uri.substring(_uri.lastIndexOf('.') + 1); // lấy đuôi file


        FileSystem.readAsStringAsync(result.assets[0].uri, { encoding: 'base64' })
            .then((res) => {
    // phải nối chuỗi với tiền tố data image
                setiimg_base64("data:image/" + file_ext + ";base64," + res); 
                console.log(img_base64);
    // upload ảnh lên api thì dùng PUT có thể viết ở đây
            });


    }


}
  const savePost = () => {
    let _id=props.route.params.item_post.id;
   
    let obj_post = { title:title,author:author,content:content,image:img_base64,status:status };
    let url_post = "http://10.24.46.249:3000/Post/"+_id;
    fetch(url_post, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(
        obj_post
      )
    }).then((res) =>{
      if(res.status==200){
        alert("Sửa thành công")
      }
    }).catch((ex)=>{
      console.log(ex);
    });
    settitle(''),
    setauthor('');
    setiimg_base64(null);
    setcontent('');
    setstatus('');
  }
  React.useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
     settitle(props.route.params.item_post.title);
     setauthor(props.route.params.item_post.author);
     setcontent(props.route.params.item_post.content);
    //  setimage(props.route.params.item_post.image);
     setstatus(props.route.params.item_post.status);
    });

    return unsubscribe;
  }, [props.navigation]);

  return (
    <View >
        <Text style={{justifyContent:'center', textAlign:'center', fontSize:30}}>Thêm bài viết</Text>
        {/* <View style={{flexDirection:'row'}}>
        <Image  style={{width: 60, height: 60, marginLeft:10}} source={require('../assets/14.jpg')}  />
        <View style={{flexDirection:'column'}}>
        <Text style={{fontSize:20,fontWeight:'bold', marginLeft:20}}>Bùi Quang Long</Text>
       
        </View>
     
        </View>
        
      */}
       
      <TextInput placeholder="Title Bài báo " onChangeText={ (txt)=>{ settitle (txt)}} value={title} />
          <Text onPress={pickImage} style={{fontSize: 20, marginTop:20}}>Ảnh/Video</Text>
          <View style={{width: 400, height: 400, alignSelf: 'center'}}>
          <Image
            style={{width: 350, height: 350,marginLeft:25}}
            source={{uri: img_base64}}
            // value={image}
          />
        </View>
        
        <TextInput placeholder="Status" onChangeText={ (txt)=>{ setstatus(txt)}} value={status}/>
        <TextInput placeholder="Tác giả" onChangeText={ (txt)=>{ setauthor(txt)}} value={author}/>
        <TextInput placeholder="Bạn đang nghĩ gì ?" onChangeText={ (txt)=>{ setcontent (txt)}} value={content}/>
       
        <Button title="Save" onPress={savePost}/>

    </View>
);
  
}
export default UpdatePost;
const styles = StyleSheet.create({
  cotainer: {
    flex: 1,
    marginTop: 30,
    marginStart: 10,
    marginEnd: 10,
    flexDirection: 'column'
  }
  // header: {
  //   height: 50,
  //   backgroundColor: 'aqua',
  //   flexDirection: 'row'
  // },
  // noidung: {
  //   height: 550,
  //   backgroundColor: '#fff',
  //   borderColor: 'green',
  // }
})