import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MenuScreen from './screens/MenuScreen';
import HomeScreen from './screens/HomeScreen';
import CommentsScreen from './screens/CommentsScreen'; // Importar a nova tela

const Stack = createNativeStackNavigator();

const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Menu">
                <Stack.Screen name="Menu" component={MenuScreen} />
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="Comments" component={CommentsScreen} /> 
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;
