import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Login from './Comchinh/Login';
import Signup from './Comchinh/Signup';
import Adminhome from './Comchinh/Adminhome';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Userhome from './Comchinh/Userhome';
import DOimk from './Comphu/doimk';
import UpdatePost from './Comphu/UpdatePost';
const Stackass=createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
    <Stackass.Navigator  initialRouteName='Login'>
      <Stackass.Screen name='Login' component={Login} options={ {headerShown: false}} />
      <Stackass.Screen name='Signup' component={Signup} options={ {headerShown: false}} />
      <Stackass.Screen name='Admin' component={Adminhome} options={ {headerShown: false}} />
      <Stackass.Screen name='User' component={Userhome} options={ {headerShown: false}} />
      <Stackass.Screen name='doimk' component={DOimk} options={ {headerShown: false}} />
      <Stackass.Screen name='Update' component={UpdatePost} options={{ headerShown: false }} />
{/* viết tiếp các màn hình khác vào đây */}
    </Stackass.Navigator>
</NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
