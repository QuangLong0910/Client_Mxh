import React,{ useState } from "react"
import { View,Text, FlatList, Button } from "react-native"
const Listuser = (props) =>{
    const[isLoading,setisLoading]=useState(true);
    const[dssp,setdssp]=useState([]);
    const getListPost = async() =>{
        let url_post="http://10.24.46.249:3000/users";
        try {
            const response = await fetch(
              url_post,
            );
            const json = await response.json();
            setdssp(json);//đổ dữ liệu vào state
          } catch (error) {
            console.error(error);
          } finally{
            //kết thúc quá trình load dữ liệu
            setisLoading(false)
          }
    }
    
    const rendrPost = ({item}) =>{
        let url_delete="http://10.24.46.249:3000/users/"+item.id;
        const deletePost = () =>{
            fetch(url_delete, {
                method: 'DELETE',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                }
              }).then((res) =>{
                if(res.status==200){
                  alert("Xóa thành công");
                  getListPost();
                }
              }).catch((ex)=>{
                console.log(ex);
              })
        }
        return(
            <View style={{borderColor:"red",borderRightWidth:1,borderRadius:15}}>
                <Text style={{marginTop:10,marginLeft:10}}>Username: {item.username}</Text>
                <Text style={{marginTop:10,marginBottom:20,marginLeft:10}}>Password: {item.pass}</Text>
                <Button title="Xóa user" onPress={deletePost}/>
            </View>
        )
    }
    React.useEffect(() => {
        const unsubscribe = props.navigation.addListener('focus', () => {
          // do something
          //cập nhật giao diện ở đây
          getListPost();
        });
    
        return unsubscribe;
      }, [props.navigation]);
    return (
        <View>
            <Text style={{marginTop:15,marginLeft:10,fontSize:20}}>Danh sách tài khoản</Text>
            <FlatList data={dssp}
            keyExtractor={(item_post) =>{return item_post.id}}
            renderItem={rendrPost}/>
        </View>
    )
}
export default Listuser