import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './src/pages/home';
import { Header, Button} from 'react-native-elements'
import Save from './src/pages/home/save';

const Stack = createStackNavigator();

function App() {
  return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
          <Stack.Screen name="Save" component={Save} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
  );
}

export default App;

