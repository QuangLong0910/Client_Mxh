import { Button, Image, StyleSheet, Text, TextInput, TouchableHighlight, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Post from '../Comphu/Post';
import ListPost from '../Comphu/ListPost';
import Listuser from '../Comphu/listuser';
const Tab = createBottomTabNavigator();
const Adminhome = () =>{
    return(
      <Tab.Navigator>
      <Tab.Screen name="Post" component={Post}  options={{headerShown:false}}/>
      <Tab.Screen name="ListPost" component={ListPost} options={{headerShown:false}}/>
      {/* <Tab.Screen name="ListUser" component={Listuser} options={{headerShown:false}}/> */}
  </Tab.Navigator>
    )
}
export default Adminhome