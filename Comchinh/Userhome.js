import { Button, Image, StyleSheet, Text, TextInput, TouchableHighlight, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../Comphu/Home';
import Me from '../Comphu/Me';
import Search from '../Comphu/Search';
import ListPost from '../Comphu/ListPost';

const Tab = createBottomTabNavigator();
const Userhome = () =>{
    return(
      <Tab.Navigator>
      <Tab.Screen name="Home" component={Home}  options={{headerShown:false}}/>
      {/* <Tab.Screen name="Search" component={Search} options={{headerShown:false}}/> */}
      <Tab.Screen name="Me" component={Me} options={{headerShown:false}}/>
  </Tab.Navigator>
    )
}
export default Userhome