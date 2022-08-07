import React, { useRef, useState } from 'react';
import { StyleSheet, Text, View, Button, ScrollView, Dimensions, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ObjetoError from './components/ObjetoError.js';

let incremento = 0;                           // Para manejar los productos mal contados dentro de un condicional.

export default function Finalizar({ route }) {
  const { conteo } = route.params;            // Recepción del arreglo de cuántas unidades se contaron de cada elemento. 
  const { elementos } = route.params;         // Recepción del arreglo de elementos contados.
  const navigation = useNavigation();       // Para manejar el llamado a la siguiente pantalla.

  const [numInputs, setNumInputs] = useState(1);  // Para guardar el número de input texts (recuadros).
  const [text, setText] = useState('');           // Para guardar el texto introducido en el recuadro.
  const refInputs = useRef([text]);               // Para guardar el estado de lo que se va escribiendo en el recuadro.

  const [numInputs2, setNumInputs2] = useState(1);
  const [text2, setText2] = useState('');
  const refInputs2 = useRef([text2]);

  const titulo = [];                        // Para guardar el encabezado.
  const resultados = [];                    // Para guardar los elementos mal contados.
  let errores = [];                         // Para guardar temporalmente los productos mal contados.
  let erroresConteo = [];                   // Para guardar temporalmente el conteo erróneo del producto.

  const anchoPantalla = Dimensions.get("window").width;     // Obtención del ancho de la pantalla para ajustar el ScrollView
  const refScrollView = useRef(null);             // La referencia del ScrollView para controlar la posición de scrolleo.

  let numErrores = 0;                             // Para manejar un contador de cuántos productos se contaron mal.

  console.log("Pantalla de finalizado: " + conteo)          // Se muestra el arreglo de las unidades contadas de cada elemento.
  console.log("Pantalla de finalizado 2: ", elementos)      // Se muestra el arreglo de los elementos contados.

  const inputs = [];              // Para guardar los recuadros.
  const inputs2 = [];              // Para guardar los recuadros.
  let fin = [];                    // Para guardar el botón de finalizar operación.

  /* ===== INICIO DE LAS FUNCIONES PRINCIPALES ===== */

  /* --- CONDICIONAL POR SI HUBO UN ERROR CON LOS ARREGLOS RECIBIDOS. ESTO DARÍA UN ERROR INTERNO (DE LA APP). --- */
  if (elementos === undefined || elementos.length == 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.titleText}> No se realizó correctamente el conteo. </Text>
      </View>
    );
  }

  /* --- SE INICIALIZAN LOS ARREGLOS TEMPORALES. --- */
  for (let i = 0; i < elementos.length; i++) {
    if ((elementos[i].cant).toString() !== (conteo[i]).toString()) {
      numErrores += 1;
      errores.push(elementos[i]);
      erroresConteo.push(conteo[i]);
    }
  }

  const [comentarios, setComentarios] = useState(Array(conteo.length).fill(""));       // Para guardar los comentarios realizados.

  /* --- SE RENDERIZA EL TÍTULO SI ES QUE NO HUBO NINGÚN PRODUCTO MAL CONTADO. --- */
  if (numErrores === 0) {
    return (
      <View style={styles.container} key={100}>
        <Text style={styles.titleText}> Todo correcto.</Text>
        <Text style={styles.bodyText}> No hubo discrepancias en el conteo. Haz clic para continuar. </Text>
        <View style={styles.lineStyle} />
        <Button style={styles.boton} title='Ver resumen.' onPress={() => navigation.navigate("Fin", { conteo: conteo, elementos: elementos })} />
      </View>
    );
  }

  /* --- SE RENDERIZA EL TÍTULO PARA CUANDO HUBO PRODUCTOS MAL CONTADO. ---*/
  for (let i = 0; i < errores.length; i++) {
    if ((errores[i].cant).toString() !== (erroresConteo[i]).toString()) {
      titulo.push(
        <View style={styles.container} key={i + 10}>
          <Text style={styles.titleText}> Hubo discrepancias.</Text>
          <Text style={styles.bodyText}> Verifica que los siguientes productos estén bien contados. Si tienes algún comentario, hazlo.</Text>
        </View>
      );
      break;
    }
  }

  /* --- SE GENERAN EL NÚMERO DE RECUADROS SEGÚN CUÁNTOS ELEMENTOS SE HAYAN CONTADO. --- */
  for (let i = 0; i < numInputs; i++) {
    inputs.push(
      <View key={i}>
        <TextInput
          style={styles.input}
          onChangeText={valor => setInputValue(i, valor)}
          value={refInputs.current[i]}
          placeholder="Nuevo conteo"
          keyboardType="numeric"
        />
      </View>
    );
  }

  /* --- SE GENERAN EL NÚMERO DE RECUADROS SEGÚN CUÁNTOS ELEMENTOS SE HAYAN CONTADO. --- */
  for (let i = 0; i < numInputs2; i++) {
    inputs2.push(
      <View key={i + 200}>
        <TextInput
          style={styles.input}
          onChangeText={x => setInputValue2(i, x)}
          value={refInputs2.current[i]}
          placeholder="¿Algún comentario?"
          keyboardType="default"
        />
      </View>
    );
  }

  /* --- SE AGREGA DENTRO DEL RECUADRO LO QUE ESCRIBE EL TECLADO PARA QUE LA ESCRITURA SEA NATURAL. --- */
  const setInputValue = (index, valor) => {
    const inputs = refInputs.current;
    inputs[index] = valor;
    setText(valor);
  }

  /* --- SE AGREGA DENTRO DEL RECUADRO LO QUE ESCRIBE EL TECLADO PARA QUE LA ESCRITURA SEA NATURAL. --- */
  const setInputValue2 = (index, x) => {
    const inputs2 = refInputs2.current;
    inputs2[index] = x;
    setText2(x);
  }

  /* --- SE RENDERIZA UN NUEVO RECUADRO. --- */
  const agregarInput = () => {
    refInputs.current.push('');
    setNumInputs(value => value + 1);
    incremento = numInputs - 1;
  }

  /* --- SE RENDERIZA UN NUEVO RECUADRO. --- */
  const agregarInput2 = () => {
    refInputs2.current.push('');
    setNumInputs2(value => value + 1);
  }

  const nuevoComentarios = [...comentarios];

  /* --- FUNCIÓN PARA CUANDO SE CLICKEA EL BOTÓN DE SIGUIENTE. --- */
  const siguientePagina = () => {
    agregarInput();                                       // Llamada a la función anterior.
    agregarInput2();
    //setValores( [...valores, text]  )

    //setComentarios( [...comentarios, text2.toString()] );

    /*nuevoComentarios[numInputs] = text2.toString();
    setComentarios(nuevoComentarios);*/

    for (let i = incremento; i < errores.length; i++) {
      for (let j = incremento; j < conteo.length; j++) {
        if ((conteo[j]).toString() === (erroresConteo[i]).toString()) {

          nuevoComentarios[j] = text2.toString();         // Se guarda el comentario en un nuevo arreglo temporal en la posición donde corresponde, para posteriormente
          setComentarios(nuevoComentarios);               // ese arreglo temporal mandarlo al principal de vuelta. Tiene que ser así.

          conteo[j] = text;                              // Se recorre el arreglo de las unidades contadas de cada elemento
          break;                                         // y se compara con lo que se guardó en el temporal, para luego
        }                                                // reemplazar el valor anterior por el nuevo.
      }
    }

    refScrollView.current?.scrollTo({ x: anchoPantalla * numInputs, animated: true });    // Se scrollea al siguiente producto (si hay).
  };

  /* --- SE AGREGA EL BOTÓN DE FIN CUANDO SE TERMINARON DE CONTAR NUEVAMENTE LOS PRODUCTOS MAL CONTADOS. --- */
  if (numInputs > numErrores) {
    fin.push(
      <View key={numInputs} style={styles.container}>
        <Button style={styles.boton} title='Fin' onPress={() => navigation.navigate("Fin", { conteo: conteo, elementos: elementos, comentarios: comentarios })} />
      </View>

    );
  }

  /* --- EN ESTA PARTE SE GENERA LA VISTA DE LOS OBJETOS QUE TUVIERON DISCREPANCIAS CON LA CANTIDAD EN ALMACÉN. --- */
  for (let i = 0; i < errores.length; i++) {
    if ((errores[i].cant).toString() !== (erroresConteo[i]).toString()) {
      incremento += 1;
      //console.log("incremento: " + incremento);

      /* --- AQUÍ SE RENDERIZAN LOS PRODUCTOS MAL CONTADOS CON SUS RESPECTIVOS RECUADROS DE TEXTO PARA CONTEO Y COMENTARIO, RESPECTIVAMENTE. --- */
      /* --- DESPUÉS, EL BOTÓN PARA GUARDAR LOS INPUTS Y EJECUTAR LA FUNCIÓN QUE LE CORRESPONDE. --- */
      resultados.push(
        <View style={styles.container} key={i + 30}>
          <ObjetoError
            arreglo={errores[i]}
          />
          {inputs[i]}
          {inputs2[i]}
          <Button style={styles.boton} title='Guardar conteo' onPress={siguientePagina} />
        </View>
      );
    }
  }

  /*console.log(" Nuevo Comentarios: ");
  console.log(nuevoComentarios);*/

  /* --- SALIDA Y RENDERIZADO GENERAL DE LA PANTALLA ACTUAL. --- */
  return (
    <View>
      <ScrollView style={{ backgroundColor: '#fff' }}>
        <View style={styles.container}>
          {titulo}
        </View>

        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          scrollViewContainerStyle={styles.scrollViewContainerStyle}
          scrollEnabled={false}
          ref={refScrollView}
        >

          {resultados}
        </ScrollView>

        <View style={styles.lineStyle} />

        {fin}
      </ScrollView>
    </View>
  );
}

/* --- ESTILOS UTILIZADOS. --- */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleText: {
    fontSize: 35,
    fontWeight: "bold",
    textAlign: 'center'
  },
  bodyText: {
    fontSize: 20,
    textAlign: 'center'
  },
  lineStyle: {
    height: 10,
    width: "100%",
    borderColor: 'black',
    margin: 10,
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