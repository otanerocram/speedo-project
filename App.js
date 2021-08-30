import React, {useState, useEffect} from "react";
import { 
  View, 
  Text,
  StyleSheet,
  Image,
  Button,
  Alert,
  Touchable,
  TouchableOpacity ,
  Platform
} from "react-native";
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

const App = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMessage] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Se ha denegado el Permiso de Ubicación');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  let openImagePickerAsync = async () => {
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync()

    if (permissionResult.granted === false){
      alert("Premission required to access Media Library");
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync()
    console.log(pickerResult);
  }

  return (
    <View style={estilos.contenedor}>
      <Text style={estilos.title}>Speedo Aguila Control</Text>

      <Text style={estilos.title}>Location</Text>
      <Image 
        source={{uri: 'https://picsum.photos/200'}}
        style={estilos.image}
      />
      <Button
        title='Titulos'
        color='#456'
        onPress={()=> {
          console.log("Hola Munto");
          Alert.alert("Bienvenido");
        }}
      />
      <TouchableOpacity
        style={estilos.boton}
        onPress={openImagePickerAsync}
      >
        <Text>Press Here</Text>
      </TouchableOpacity>

      
      
    </View>
  );

}

const estilos = StyleSheet.create({
  contenedor: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: 'dimgray'
  },
  title: {
    fontSize:30, 
    color:'#FFF'
  },
  image: {
    width:100,
    height:100,
    borderRadius:50
  },
  boton:{
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10,
    width: 100,
    marginTop: 10,
    borderRadius:20
  }
})

export default App;