import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MenuScreen from './screens/MenuScreen';
import HomeScreen from './screens/HomeScreen';
import CommentsScreen from './screens/CommentsScreen'; 
import PhotoScreen from './screens/PhotoScreen'; 
import AlbumScreen from './screens/AlbumScreen'; 
import PhotoGridScreen from './screens/PhotoGridScreen'

const Stack = createNativeStackNavigator();

const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Menu">
                <Stack.Screen name="Menu" component={MenuScreen} />
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="Comments" component={CommentsScreen} /> 
                <Stack.Screen name="Photos" component={PhotoScreen} />
                <Stack.Screen name="AlbumScreen" component={AlbumScreen} />
                <Stack.Screen name="PhotoGridScreen" component={PhotoGridScreen} />

            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;
