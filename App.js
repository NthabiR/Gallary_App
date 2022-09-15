import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Gallary from './components/gallary';
import CameraPage from './components/camera';
const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Gallary}
          options={{ title: 'Gallary' }}
        />
        <Stack.Screen name='CameraPage' component={CameraPage} options={{ title: 'Camera' }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;