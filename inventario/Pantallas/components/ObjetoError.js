import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';

export default function ObjetoError( { arreglo } ){
    const objetos = arreglo;

    return (
    <View style={styles.container}>
        <Image
            style={ styles.tinyLogo }
            source={ {uri : (objetos.image).toString() } }>
        </Image>
        <Text>
            <Text style = {{fontWeight: "bold"}}>ID del elemento: </Text>
            <Text> {objetos.id} </Text>
        </Text>
        <Text>
            <Text style = {{fontWeight: "bold"}}>Categoría: </Text>
            <Text> {objetos.categoria} </Text>
        </Text>
        <Text>
            <Text style = {{fontWeight: "bold"}}>Nombre del producto: </Text>
            <Text> {objetos.name} </Text>
        </Text>
    </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: Dimensions.get("window").width,
        height: 200,
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        textAlign: 'center'
      },
    tinyLogo: {
        width: 50,
        height: 100,
    },
    texto: {
        textAlign: "center",

    }
});

//export default Objeto;