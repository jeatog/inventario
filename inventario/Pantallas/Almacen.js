import React, { useState, useEffect }  from 'react';
import { StyleSheet, Text, View, Button, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
//import fetch from 'node-fetch'

export default function Almacen( {route} ){
    const { almaElegido } = route.params; 
    const navigation = useNavigation();

    function custom_sort(a, b) {
      return new Date(b.__last_update).getTime() - new Date(a.__last_update).getTime()
    }

    /*  ===   LA FUNCIÓN PARA RECUPERAR DEBE IR AQUÍ.   === */
    const token = 'access_token_1564a2ada7a2fa0c9eb27b897d0b6c976180d149'
    let URL = 'http://35.223.16.133/api/'

    async function getAlmacenes (){
      const model = 'stock.warehouse'
      const options = {
          'method': 'GET',
          'headers': {
            'Content-Type': 'multipart/form-data',
            'access-token': token,
          }
      };
      const params = new URLSearchParams({
          fields: ['id,name,code']
      })
      URL += model + '?' + params.toString();
      return fetch(URL, options)
      .then((resp) => resp.text())
          .then(function(data) {  
              //return data.data.sort(custom_sort)
              console.log( data )
      })
      .catch((error)=>{
          console.log(error)
      })
    }
    const almacenes = getAlmacenes();

    //console.log(almacenes);

    return(
        <ScrollView style = { {backgroundColor: '#fff'} }>
                <View style={styles.container}>
                    <Text style={styles.titleText}> Estás en el almacén {almaElegido.toUpperCase()}.</Text>
                    <Text style={styles.bodyText}> Por favor, elige cómo quieres hacer inventario.</Text>
                </View>

                <View style={styles.lineStyle} />
                <View style={styles.lineStyle} />

                <View style={styles.container}>
                    <Button title='Por categoría' onPress={() => navigation.navigate("Categoria", { almaElegido } )}/>
                    <View style={styles.lineStyle} />
                    <Button title='De forma general' onPress={() => navigation.navigate("General", {almaElegido } )}/>
                    <View style={styles.lineStyle} />
                    <Button title='Aleatoriamente' onPress={() => navigation.navigate("Aleatorio", {almaElegido } )}/>
                    <View style={styles.lineStyle} />
                    <Button title='Libremente' onPress={() => navigation.navigate("Escaner", {almaElegido } )}/>
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
      textAlignVertical : "top",
      alignItems: 'center',
      justifyContent: 'center'
    },
    bodyText: {
      fontSize : 20,
      textAlignVertical : "top",
      alignItems: 'center',
      justifyContent: 'center'
    },
    lineStyle:{
      height: 10,
      width: "100%",
      borderColor:'black',
      margin:10,
    },
    contenido: {
      justifyContent: 'center',
    }
  });