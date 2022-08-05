import React, { useState, useRef } from 'react';
import { StyleSheet, Text, View, Button, ScrollView, TextInput, Dimensions } from 'react-native';
import Objeto from './components/Objeto.js';

import { useNavigation } from '@react-navigation/native';

export default function Aleatorio( {route} ){
  const { almaElegido } = route.params;
  const { tipo_cat } = route.params;
  const refScrollView = useRef(null);
  const anchoPantalla = Dimensions.get("window").width;

  const [text, setText] = useState('');
  const [numInputs, setNumInputs] = useState(1);
  const refInputs = useRef([text]);

  const datos = require('./components/almacen_a.js');
  const filtrados = datos.almacen_a;

  console.log(almaElegido)

  const inputs = [] ;
  const views = [];
  let fin = [];
  const [valores, setValores] = useState([]);
  //let [nums, setNums] = useState([]);
  let nums = [];

  for(let i=0; i<numInputs; i++){
    inputs.push(
      <View key={i}>
        <TextInput
          style={styles.input}
          onChangeText={valor => setInputValue(i, valor)}
          value={refInputs.current[i]}
          placeholder="¿Cuánto contaste?"
          keyboardType="numeric"
        />
      </View>
    );
  }

  const setInputValue = (index, valor) => {
    const inputs = refInputs.current;
    inputs[index] = valor;
    setText(valor);
  }

  const agregarInput = () => {
    refInputs.current.push('');
    setNumInputs(value => value+1);
  }

  if( filtrados === undefined || filtrados.length == 0 ){
    return(
      <View style={styles.container}>
          <Text style={styles.titleText}> No existen elementos en esta categoría.</Text>
        </View>
    );
  }

  const siguientePagina = () => {
    agregarInput();
    setValores( [...valores, text]  );
    //console.log("índice: " + numInputs + ". Número hijo: " + valores);
    refScrollView.current?.scrollTo({x: anchoPantalla*numInputs, animated: true});
  };


  if(numInputs > filtrados.length){
    fin.push(
      <View key={numInputs} style={styles.container}>
        <Button style={styles.boton} title='Finalizar' onPress={console.log(valores)}/>
      </View>
      
    );
  }

  const generarRandom = (nums) => {
    /*let aleatorios = [];
    let i = nums.length;
    let j = 0;

    while(i--){
      j = Math.floor( Math.random() * nums.length );
      aleatorios.push(nums[j]);
      nums.splice(j,i);
    }

    return aleatorios;*/
    for (let i= nums.length-1; i > 0; i--){
      let j = Math.floor(Math.random() * (i+1));
      [ nums[i], nums[j] ] = [ nums[j], nums[i] ];
    }
    return nums;
  }

  for (let i=0; i<filtrados.length; i++){

    nums.push(i);
    let random = generarRandom(nums);
    console.log(random[1]);

    views.push(
      <View  style={styles.container} key={i}>

        <Objeto 
          arreglo={filtrados[random[0]]}
        />

        {inputs[i]}

        <Button style={styles.boton} title='Guardar conteo' onPress = { siguientePagina }  />
      </View>
    );
  }

  return(

    <View>
      <ScrollView style = { {backgroundColor: '#fff'} }>
        <View style={styles.container}>
          <Text style={styles.titleText}> Conteo General.</Text>
          <Text style={styles.bodyText}> Almacén actual: {almaElegido.toUpperCase()}.</Text>
        </View>

        <View style={styles.lineStyle} />
        <View style={styles.lineStyle} />

        <ScrollView 
          horizontal
          showsHorizontalScrollIndicator={false}
          scrollViewContainerStyle={styles.scrollViewContainerStyle}
          scrollEnabled={false}
          ref={refScrollView}
        >

          {views}

        </ScrollView>

        <View style={styles.lineStyle} />
        {fin}

      </ScrollView>
    </View>
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