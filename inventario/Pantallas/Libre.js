import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, ScrollView, TextInput } from 'react-native';
import Objeto from './components/Objeto.js';

import { useNavigation } from '@react-navigation/native';

export default function Libre( {route} ){
  const { almaElegido } = route.params;
  const { idLeido } = route.params;
  const { arrRecibido } = route.params;

  const navigation = useNavigation();

  const [text, setText] = useState('');

  const [valores, setValores] = useState([]);
  const [arrElementos, setArrElementos] = useState([]);

  let datos = null;
  let filtrados = [];

  switch(almaElegido){
    case 'a' : 
              datos = require('./components/almacen_a.js');
              filtrados = datos.almacen_a.filter(elemento => elemento.id === idLeido.toString());
              break;
    case 'b' : 
              datos = require('./components/almacen_b.js');
              filtrados = datos.almacen_b.filter(elemento => elemento.id === idLeido.toString());   
              break;
    case 'c' : 
              datos = require('./components/almacen_c.js');
              filtrados = datos.almacen_c.filter(elemento => elemento.id === idLeido.toString());  
              break;
    case 'd' : 
              datos = require('./components/almacen_d.js');
              filtrados = datos.almacen_d.filter(elemento => elemento.id === idLeido.toString());  
              break;
    default : console.log("Error de almacén");
  }

  console.log(filtrados , arrElementos)

  const guardarConteo = () => {
    setValores( [...valores, text]  );
    setArrElementos([...arrElementos, filtrados[0]]);
    alert("Se guardaron los datos correctamente.");
  };

  if( filtrados === undefined || filtrados.length == 0 ){
    return(
      <View style={styles.container}>
          <Text style={styles.titleText}> No se encontró el producto o la lectura es inválida.</Text>
      </View>
    );
  }

  //console.log("Datos recibidos: " + almaElegido + " " + idLeido);

    return(
      <ScrollView style = { {backgroundColor: '#fff'} }>
      <View style={styles.container}>
        <Text style={styles.titleText}> Conteo Libre.</Text>
        <Text style={styles.bodyText}> Por favor, introduce la cantidad contada en el espacio en blanco.</Text>
      </View>

      <View style={styles.lineStyle} />
      <View style={styles.lineStyle} />

      <Objeto arreglo={filtrados[0]} ></Objeto>

      <View>
        <TextInput
          style={styles.input}
          onChangeText={item => setText(item)}
          placeholder="¿Cuánto contaste?"
          keyboardType="numeric"
        />
      </View>

      <View style={styles.container}>
        <View style={styles.lineStyle} />
        <Button title='Guardar conteo' onPress={ guardarConteo } />
        <View style={styles.lineStyle} />
        <Button title='Leer otro código' onPress={() => navigation.navigate("Scanner", {almaElegido : almaElegido, arreglo : arrElementos})}/>
        <View style={styles.lineStyle} />
        <Button title='Finalizar conteo' onPress={() => navigation.navigate("Finalizar", {conteo : valores, elementos : arrElementos})}/>
      </View>

      </ScrollView>
    );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleText: {
    fontSize : 35,
    fontWeight : "bold",
    textAlign : 'center'
  },
  bodyText: {
    fontSize : 20,
    textAlign : 'center'
  },
  lineStyle:{
    height: 10,
    width: "100%",
    borderColor:'black',
    margin:10,
  },
  contenido: {
    justifyContent: 'center',
  },
  scrollViewContainerStyle: {
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    height: 600
  },
  boton: {
    height: 50,
    width: 100,
    backgroundColor: '#0D0D0D',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textoBoton: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold'
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    textAlign: 'center'
  },
  });