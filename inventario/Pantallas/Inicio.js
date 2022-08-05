import React from 'react';
import { StyleSheet, Text, View, Button, ScrollView } from 'react-native';

import { useNavigation } from '@react-navigation/native';

export default function Inicio() {
    const navigation = useNavigation();

  return (
    <ScrollView style = { {backgroundColor: '#fff'} }>
      
      <View style={styles.container}>
        <Text style={styles.titleText}> Bienvenido, usuario.</Text>
        <Text style={styles.bodyText}> Por favor, elige un almacén.</Text>
      </View>

      <View style={styles.lineStyle} />
      <View style={styles.lineStyle} />

      <View style={styles.container}>
        <Button title='Almacén A' onPress={() => navigation.navigate("Almacen", {almaElegido : "a"} )}/>
        <View style={styles.lineStyle} />
        <Button title='Almacén B' onPress={() => navigation.navigate("Almacen", {almaElegido : "b"} )}/>
        <View style={styles.lineStyle} />
        <Button title='Almacén C' onPress={() => navigation.navigate("Almacen", {almaElegido : "c"} )}/>
        <View style={styles.lineStyle} />
        <Button title='Almacén D' onPress={() => navigation.navigate("Almacen", {almaElegido : "d"} )}/>
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
