import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, Alert } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { useNavigation } from '@react-navigation/native';
 
export default function Scanner( {route} ) {
  const { almaElegido } = route.params;
  const { arreglo } = route.params;

  const navigation = useNavigation();

  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  console.log(arreglo);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const alerta = () => {
    return new Promise((resolve, reject) => {
      Alert.alert(
        "Error de lectura.",
        "El código leído no corresponde a un número. Inténtalo de nuevo.",
        [
          {
            text: "Leer de nuevo.",
            onPress: () => setScanned(false)
          },
        ],
        {
          cancelable : false
        }
      );
    })
    
  }

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    navigation.navigate("Libre", { almaElegido, idLeido : data, arrRecibido : arreglo});
    
  };

  
  if (hasPermission === null) {
    return <Text>Se necesita acceso a la camara.</Text>;
  }

  if (hasPermission === false) {
      return <Text>Acceso a la camara denegado.</Text>;
  }

  return(
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style = {StyleSheet.absoluteFillObject}
      />
      {scanned && <Button title = '' onPress={ () => setScanned(false) } />}
    </View>
    //{scanned && <Button title = '' onPress={ () => setScanned(false) } />}
  );

}

const styles = StyleSheet.create ({
  container:{
      flex : 1,
      flexDirection : 'column',
      justifyContent : 'center'
  }
})