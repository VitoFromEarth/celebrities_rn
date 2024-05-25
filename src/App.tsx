/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {MainStack} from './router/router.tsx';
import {DetailsScreen} from './screens/details/Details.tsx';
import {HomeScreen} from './screens/home/Home.tsx';

function App() {
  return (
    <NavigationContainer>
      <MainStack.Navigator initialRouteName="Home">
        <MainStack.Screen
          name="Home"
          component={HomeScreen}
          options={{title: 'Celebrities List', headerShown: false}}
        />
        <MainStack.Screen name="Details" component={DetailsScreen} />
      </MainStack.Navigator>
    </NavigationContainer>
  );
}

export default App;
