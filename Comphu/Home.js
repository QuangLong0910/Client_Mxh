import React,{ useState } from "react";
import {View, Text,Image, Button, ActivityIndicator,Dimensions,TouchableOpacity, TextInput} from "react-native";
import { FlatList } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";



const Home = (props) =>{

 const [isloading, setisloading] = useState(true);
 const [dssp,setdssp] = useState([]);
 const [cmt, setcmt] = useState('');


 const getListPro = async () =>{
    let url_api = "http://10.24.46.249:3000/Post"

    try {
        const response = await fetch(
          url_api
);
        const json = await response.json();
        // Đổ dữ liệu vào State
       setdssp(json);
      } catch (error) {
        console.error(error);
      } finally{
        setisloading(false); // Trạng thái đã load thành công
      }
 }

const renderProduct = ({item}) =>{

    // console.log(row);
   
    const XoaSP = () => {
      // if(! confirm ('Có đồng ý xóa không?') )
      //     return; 

      let url_api = "http://10.24.46.249:3000/Post/"+item.id;

      fetch(url_api , {
        
        method: 'DELETE', // POST: Thêm mới, PUT: Sửa, DELETE: xóa, GET: lấy thông tin
        
        headers: { // Định dạng dữ liệu gửi đi
        Accept: 'application/json',
        'Content-Type': 'application/json',
        
        },
       
    })
  
    .then ( (response )=>{
        console.log(response.status);
        // nếu log là 201 thì là tạo thành công
        if(response.status==200)
        
        alert("Xóa thành công");
        
getListPro;
    })
    .catch( (err)=>{  // catch để bắt lỗi ngoại lệ
        console.log(err);
       
    }) ;
   
  }
 
    return(
     
      
        <View style={{ margin:10, borderWidth:1, borderColor:'#000',borderRadius:10,}}>
       
       <View style={{flexDirection:'row',marginTop:10}}>
            <Image  style={{width: 60, height: 60, marginLeft:10,borderRadius:20}} source={require('../assets/14.jpg')}  />
            <View style={{flexDirection:'column'}}>
            <Text style={{fontSize:20,fontWeight:'bold', marginLeft:20,width:200}}>{item.author}</Text>
            <Text style={{marginLeft:20}}> {item.status}</Text>
            </View>
          
          
            
           
            </View>
            <View style={{width:'100%',height:0,borderWidth:0.2,marginTop:5}}></View>
            <View style={{flexDirection:'column'}} >
            <Text style={{fontSize:16, marginLeft:10}}> {item.title}  </Text> 
            <View style={{ padding:15, borderRadius:10, padding:5, margin:5}}>
              <Image
                  style={{width: 350, height: 350}}
                  source={{uri: item.image}}
                />
              <Text> {item.content}</Text>
          
          
              </View>
       <View style={{width:'100%',height:0,borderWidth:0.2}}></View>
              <View style={{flexDirection:'row',marginBottom:5,marginTop:5}}>
            <Image source={require('../assets/like.png')} style={{width:20,height:20, marginLeft:20}}/>
            <Text style={{marginLeft:5}}>Like</Text>
            <Image source={require('../assets/cmt.png')} style={{width:20,height:20, marginLeft:50}}/>
            <Text style={{marginLeft:5}} onPress={{}}>Comment</Text>
            <Image source={require('../assets/share.png')} style={{width:20,height:20, marginLeft:50}}/>
            <Text style={{marginLeft:5}}>Share</Text>
            </View> 
            </View>
           
         
            
        </View>
    );
}



// Gọi hàm load dữ liệu
React.useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
     getListPro();
    });

    return unsubscribe;
  }, [props.navigation]);


    return(
        <View >
            <Text style={{fontSize:30, textAlign:"center",marginTop:10}}>
            Danh sách bài viết
            </Text>
           
            {/* <Button title="Thêm mới" onPress={() => { props.navigation.navigate('Addproduct') }}/> */}
          {
            (isloading) ? (
                <ActivityIndicator/>
            ) : (
                <FlatList data={dssp} keyExtractor={(item) =>{return item.id;}}
                renderItem = { renderProduct} />
               
            )

            
          } 
           



        </View>
    );
} 
export default Home ;