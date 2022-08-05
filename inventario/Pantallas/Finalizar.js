import React, { useRef, useState } from 'react';
import { StyleSheet, Text, View, Button, ScrollView, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';


export default function Finalizar( {route} ){
    const {conteo} = route.params;
    const {elementos} = route.params;
    const resultados = [];

    const navigation = useNavigation();

    console.log("Pantalla de finalizado: " + conteo)
    console.log("Pantalla de finalizado 2: ", elementos)

    if( elementos === undefined || elementos.length == 0 ){
      return(
        <View style={styles.container}>
            <Text style={styles.titleText}> No se realizó correctamente el conteo. </Text>
          </View>
      );
    }

    for (let i=0; i<conteo.length; i++){
        resultados.push(
            <View style={styles.container} key={i}>
                <Text>
                    <Text style = {{fontWeight: "bold"}}>ID del producto: </Text>
                    <Text> {elementos[i].id} </Text>
                </Text>
                <Text>
                    <Text style = {{fontWeight: "bold"}}>Nombre del elemento: </Text>
                    <Text> {elementos[i].name} </Text>
                </Text>
                <Text>
                    <Text style = {{fontWeight: "bold"}}>Cantidad en almacén: </Text>
                    <Text> {elementos[i].cant} </Text>
                </Text>
                <Text>
                    <Text style = {{fontWeight: "bold"}}>Tu conteo: </Text>
                    <Text> {conteo[i]} </Text>
                </Text>
                <View style={styles.lineStyle} />
            </View>
        );
    }

    return(
        <View>
            <ScrollView style = { {backgroundColor: '#fff'} }>
                <View style={styles.container}>
                    <Text style={styles.titleText}> Resultados de conteo.</Text>
                    <Text style={styles.bodyText}> Más abajo están los resultados de tu conteo. Por favor, revisa que todo esté en orden.</Text>
                
                    <View style={styles.lineStyle} />
                    <View style={styles.lineStyle} />
                    <Text style={styles.bodyText}> Ordenaste: { conteo.length } productos.</Text>

                    <View style={styles.lineStyle} />
                    <View style={styles.lineStyle} />

                    {resultados}

                    <View style={styles.lineStyle} />
                    <Button style={styles.boton} title='Pantalla principal' onPress={() => navigation.navigate("Inicio" )/*console.log(valores)*/  }/>

                </View>
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