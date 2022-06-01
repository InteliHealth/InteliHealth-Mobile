import { StatusBar } from "expo-status-bar";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { RFPercentage } from "react-native-responsive-fontsize";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions
} from "react-native";
import { useFonts } from "expo-font";
import { useNavigation } from "@react-navigation/native";
import AppLoading from "expo-app-loading";
import {
  Poppins_100Thin,
  Poppins_100Thin_Italic,
  Poppins_200ExtraLight,
  Poppins_200ExtraLight_Italic,
  Poppins_300Light,
  Poppins_300Light_Italic,
  Poppins_400Regular,
  Poppins_400Regular_Italic,
  Poppins_500Medium,
  Poppins_500Medium_Italic,
  Poppins_600SemiBold,
  Poppins_600SemiBold_Italic,
  Poppins_700Bold,
  Poppins_700Bold_Italic,
  Poppins_800ExtraBold,
  Poppins_800ExtraBold_Italic,
  Poppins_900Black,
  Poppins_900Black_Italic,
} from "@expo-google-fonts/poppins";

export default function Perfil() {
  const [nome, setNome] = useState("");
  const [sobrenome, setSobrenome] = useState("");
  const [foto, setFoto] = useState("");
  const [id, setId] = useState();
  const [email, setEmail] = useState("");

  const logOut = async () => {
    await AsyncStorage.removeItem("logedUser");
    navigation.navigate("Login");
  };

  const getLogedUser = async () => {
    const jsonUser = await AsyncStorage.getItem("logedUser");
    return jsonUser != null ? JSON.parse(jsonUser) : null;
  };

  const desestrutcureUser = async () => {
    const { nome, sobrenome, email, foto, idUsuario } = await getLogedUser();
    setNome(nome);
    setSobrenome(sobrenome);
    setEmail(email);
    setFoto(foto);
    setId(idUsuario);
  };

  useEffect(() => {
    desestrutcureUser();
  }, [nome, sobrenome, email, foto, id]);

  const navigation = useNavigation();

  let [fontsLoaded] = useFonts({
    Poppins_100Thin,
    Poppins_100Thin_Italic,
    Poppins_200ExtraLight,
    Poppins_200ExtraLight_Italic,
    Poppins_300Light,
    Poppins_300Light_Italic,
    Regular: Poppins_400Regular,
    Poppins_400Regular_Italic,
    Poppins_500Medium,
    Poppins_500Medium_Italic,
    Poppins_600SemiBold,
    Poppins_600SemiBold_Italic,
    Black: Poppins_700Bold,
    Poppins_700Bold_Italic,
    Poppins_800ExtraBold,
    Poppins_800ExtraBold_Italic,
    Poppins_900Black,
    Poppins_900Black_Italic,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  function home() {
    navigation.navigate("Home");
  }

  return (
    <View style={styles.background}>
      <View>
        <View style={styles.header}></View>
        <View style={styles.container}>
          <TouchableOpacity
            onPress={home}
            style={styles.buttonsetaStyle}
            activeOpacity={0.5}
          >
            <Image
              source={require("../../assets/seta.png")}
              style={styles.seta}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.container_pessoa}>
          <Image source={{ uri: foto }} style={styles.logo_pessoa} />
        </View>
        <View style={styles.container_dados}>
          <View style={styles.info}>
            <Text style={styles.nome}>
              {nome} {sobrenome}
            </Text>
          </View>
        </View>
        <View style={styles.container_dados}>
          <View style={styles.info}>
            <Text style={styles.email}>{email}</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.btnLogin} onPress={logOut}>
          <Text
            style={{
              fontFamily: "Regular",
              fontSize: RFPercentage(2.5),
              color: "#FFFFFF",
            }}
          >
            Sair
          </Text>
        </TouchableOpacity>
        {/* <View style={styles.container_detalhe}>
          <Image
            source={require("../../assets/detalhe.png")}
            style={styles.logo_detalhe}
          />
        </View> */}
      </View>
      <StatusBar style="light" backgroundColor="#000" />
    </View>
  );
}

if (Dimensions.get("window").height > 700) {
  var styles = StyleSheet.create({
    background: {
      flex: 1,
      backgroundColor: "#393939",
      width: "100%",
      marginTop: 20,
      // height: 48,
    },

    logo_header: {
      height: 25,
      marginLeft: 305,
      marginTop: 15,
    },

    header: {
      width: "100%",
      height: 30,
    },

    head: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginTop: 15,
    },

    container: {
      flexDirection: "row",
    },

    seta: {
      marginLeft: 45,
      height: 15,
      width: 23,
      marginTop: 15,
    },

    buttonsetaStyle: {
      marginLeft: 10,
      marginTop: 10,
    },

    buttonCompartilharStyle: {
      marginLeft: 225,
      marginTop: 15,
    },

    compartilhar: {
      height: 21,
      width: 21,
    },

    container_pessoa: {
      justifyContent: "center",
      alignItems: "center",
      marginTop: 30,
      maxWidth: "50%",
      maxHeight: "50%",
      alignSelf: "center",
    },

    logo_pessoa: {
      height: 120,
      width: 120,
      borderRadius: 30,
    },

    container_dados: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      marginTop: 0,
      // border: 1px solid #FC791C;
    },

    container_dados1: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      marginTop: 25,
    },
    container_dados: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      marginTop: 30,
      textAlign: "center",
    },

    nome: {
      color: "#ffffff",
      width: "100%",
      textAlign: "center",
      fontFamily: "Regular",
      fontSize: RFPercentage(2),
      alignItems: "center",
    },
    email: {
      color: "#ffffff",
      width: "100%",
      textAlign: "center",
      fontFamily: "Regular",
      fontSize: RFPercentage(2),
      alignItems: "center",
    },
    info: {
      borderColor: "#FC791C",
      borderWidth: 1,
      width: "70%",
      marginTop: "5%",
      borderRadius: 10,
      height: 60,
      alignItems: "center",
      justifyContent: "center",
      textAlignVertical: "center",
    },

    campo: {
      color: "#ffffff",
      borderBottomColor: "#FC791C",
      fontFamily: "Regular",
      borderBottomWidth: 1,
      width: 223,
      marginTop: 10,
    },

    lapis: {
      height: 21,
      width: 21,
    },

    btnLogin: {
      marginTop: "20%",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      width: "40%",
      height: "8.5%",
      backgroundColor: "transparent",
      borderColor: "#FC7B20",
      alignSelf: "center",
      borderWidth: 1,
      borderRadius: 50,
      shadowOffset: { height: 1, width: 1 },
    },

    containter_detalhe: {
      marginTop: 30,
    },

    logo_detalhe: {
      justifyContent: "flex-end",
      alignItems: "flex-end",
      // marginTop: 180,
      // alignContent: "center",
      width: 360,
      height: 120,
      alignSelf: "center",
    },
  });
} else {
  var styles = StyleSheet.create({
    background: {
      flex: 1,
      backgroundColor: "#393939",
      width: "100%",
      marginTop: 20,
      // height: 48,
    },

    logo_header: {
      height: 25,
      marginLeft: 305,
      marginTop: 15,
    },

    header: {
      width: "100%",
      height: 30,
    },

    head: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginTop: 15,
    },

    container: {
      flexDirection: "row",
    },

    seta: {
      marginLeft: 45,
      height: 15,
      width: 23,
      marginTop: 15,
    },

    buttonsetaStyle: {
      marginLeft: 10,
      marginTop: 10,
    },

    buttonCompartilharStyle: {
      marginLeft: 225,
      marginTop: 15,
    },

    compartilhar: {
      height: 21,
      width: 21,
    },

    container_pessoa: {
      justifyContent: "center",
      alignItems: "center",
      marginTop: 30,
    },

    logo_pessoa: {
      height: 120,
      width: 120,
      borderRadius: 30,
    },

    container_dados: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      marginTop: 0,
      // border: 1px solid #FC791C;
    },

    container_dados1: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      marginTop: 25,
    },
    container_dados: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      marginTop: 30,
      textAlign: "center",
    },

    nome: {
      color: "#ffffff",
      width: 223,
      textAlign: "center",
      fontFamily: "Regular",
      fontSize: 16,
      alignItems: "center",
    },
    email: {
      color: "#ffffff",
      width: 223,
      textAlign: "center",
      fontFamily: "Regular",
      fontSize: 14,
      alignItems: "center",
    },
    info: {
      borderColor: "#FC791C",
      borderWidth: 1,
      width: 250,
      marginTop: 20,
      borderRadius: 10,
      height: 50,
      alignItems: "center",
      justifyContent: "center",
    },

    campo: {
      color: "#ffffff",
      borderBottomColor: "#FC791C",
      fontFamily: "Regular",
      borderBottomWidth: 1,
      width: 223,
      marginTop: 10,
    },

    lapis: {
      height: 21,
      width: 21,
    },

    btnLogin: {
      marginTop: 60,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      height: 50,
      width: 130,
      backgroundColor: "transparent",
      borderColor: "#FC7B20",
      alignSelf: "center",
      borderWidth: 1,
      borderRadius: 50,
      shadowOffset: { height: 1, width: 1 },
    },

    containter_detalhe: {
      marginTop: 30,
    },

    logo_detalhe: {
      justifyContent: "flex-end",
      alignItems: "flex-end",
      // marginTop: 180,
      // alignContent: "center",
      width: 360,
      height: 120,
      alignSelf: "center",
    },
  });
}
