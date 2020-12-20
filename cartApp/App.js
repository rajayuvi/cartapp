import 'react-native-gesture-handler';
import * as React from 'react';
import { Provider } from 'react-redux';
import configureStore from './src/redux/store'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './src/components/home'
import Mycart from './src/components/mycart'
const Stack = createStackNavigator();
const store = configureStore()
function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          headerMode="none"
          screenOptions={{
            headerTintColor: 'white',
            headerStyle: { backgroundColor: 'tomato' },
          }}
        >
          <Stack.Screen
            name="Home"
            component={Home} />
          <Stack.Screen
            name="Mycart"
            component={Mycart} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;