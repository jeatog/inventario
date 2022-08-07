import React from 'react';
import 'react-native-gesture-handler';

import Inicio from './Pantallas/Inicio';
import Almacen from './Pantallas/Almacen';
import Categoria from './Pantallas/Categoria';
import General from './Pantallas/General';
import Aleatorio from './Pantallas/Aleatorio';
import Libre from './Pantallas/Libre';
import Categoria_elegida from './Pantallas/Categoria_elegida'
import Escaner from './Pantallas/Escaner';
import Scanner from './Pantallas/Scanner';
import Finalizar from './Pantallas/Finalizar';
import Fin from './Pantallas/Fin';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

function App() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Inicio" component={Inicio} />
      <Stack.Screen name="Almacen" component={Almacen} />
      <Stack.Screen name="Categoria" component={Categoria}/>
      <Stack.Screen name="General" component={General}/>
      <Stack.Screen name="Aleatorio" component={Aleatorio}/>
      <Stack.Screen name="Libre" component={Libre}/>
      <Stack.Screen name="Categoria_elegida" component={Categoria_elegida}/>
      <Stack.Screen name="Escaner" component={Escaner}/>
      <Stack.Screen name="Scanner" component={Scanner}/>
      <Stack.Screen name="Finalizar" component={Finalizar}/>
      <Stack.Screen name="Fin" component={Fin}/>
    </Stack.Navigator>
  );
}

export default () => {
  return (
    <NavigationContainer>
     
        <App />
      
    </NavigationContainer>
  )
}
