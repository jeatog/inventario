import React from 'react';
import { StyleSheet, Text, View, Button, ScrollView } from 'react-native';

import { useNavigation } from '@react-navigation/native';

export default function Categoria( {route} ){
    const { almaElegido } = route.params;
    const navigation = useNavigation();


    return(
        <ScrollView style = { {backgroundColor: '#fff'} }>
            <View style={styles.container}>
                    <Text style={styles.titleText}> Conteo por categorías.</Text>
                    <Text style={styles.bodyText}> Selecciona una de las categorías del almacén { almaElegido.toUpperCase() }.</Text>
            </View>

            <View style={styles.lineStyle} />
            <View style={styles.lineStyle} />

            <View style={styles.container}>
                <Button title='Vinílicas' onPress={() => navigation.navigate("Categoria_elegida", { almaElegido, tipo_cat : "vinilicas" } )}/>
                <View style={styles.lineStyle} />
                <Button title='Esmaltes' onPress={() => navigation.navigate("Categoria_elegida", {almaElegido, tipo_cat : "esmaltes" } )}/>
                <View style={styles.lineStyle} />
                <Button title='Brochas' onPress={() => navigation.navigate("Categoria_elegida", {almaElegido, tipo_cat : "brochas" } )}/>
                <View style={styles.lineStyle} />
                <Button title='Impermeabilizantes' onPress={() => navigation.navigate("Categoria_elegida", {almaElegido, tipo_cat : "impermeabilizantes" } )}/>
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