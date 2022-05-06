import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import * as AuthSession from "expo-auth-session";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import api from "../services/api";
import * as WebBrowser from "expo-web-browser";
import { useNavigation } from "@react-navigation/native";
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';

import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  TouchableOpacity,
  Link,
  Alert,
  Platform,
} from "react-native";

WebBrowser.maybeCompleteAuthSession();

import { useFonts } from "expo-font";
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
import { getLogedUser } from "../services/auth";

export function Login() {
  const [id, setId] = useState("");
  const [idUser, setIdUser] = useState(0);
  const [email, setEmail] = useState("");
  const [nome, setNome] = useState("");
  const [sobrenome, setSobrenome] = useState("");
  const [foto, setFoto] = useState("");

  let navigation = useNavigation();

  useEffect(() => {
    if (getLogedUser !== null) {
      navigation.navigate("Home");
    }
  }, []);

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
    Poppins_700Bold,
    Poppins_700Bold_Italic,
    Poppins_800ExtraBold,
    Poppins_800ExtraBold_Italic,
    Poppins_900Black,
    Poppins_900Black_Italic,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  const handleLogedUser = async (user) => {
    const jsonUser = JSON.stringify(user);

    await AsyncStorage.setItem("logedUser", jsonUser);
  };

  const handleUser = async (responseUser) => {
    setId(responseUser.id);
    setEmail(responseUser.email);
    setNome(responseUser.given_name);
    setSobrenome(responseUser.family_name);
    setFoto(responseUser.picture);
  };

  async function handleSignIn() {
    // const CLIENT_ID =
    //   "341611321921-3e98v9sp3ibprm6831ldq96v9s9kl86h.apps.googleusercontent.com";
    const CLIENT_ID = "341611321921-vjoq5m34b30chn057ftp2it3mheb9c2u.apps.googleusercontent.com"
    // const REDIRECT_URI = "https://auth.expo.io/@zennitte/InteliHealth-App";
    const REDIRECT_URI = "https://auth.expo.io/@zennitte/intelihealth";
    const RESPONSE_YPES = "token";
    const SCOPE = encodeURI("profile email openid");

    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_YPES}&scope=${SCOPE}`;
    const { type, params } = await AuthSession.startAsync({ authUrl });

    if (type === "success") {
      await fetch(
        `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${params.access_token}`
      )
        .then((response) => response.json())
        .then((response) => {
          handleUser(response);
        });

      await api
        .post("/Login", {
          IdGoogle: id,
          Email: email,
          Nome: nome,
          Sobrenome: sobrenome,
          Foto: foto,
        })
        .then((usuario) => {
          handleLogedUser(usuario.data);
        });

      navigation.navigate("Home");
    }
  }

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../assets/bg-login.png")}
        style={StyleSheet.absoluteFillObject}
      >
        <View style={styles.container}>
          <Image
            source={require("../../assets/InteliHealth-Logo.png")}
            style={styles.mainImgLogin}
          />

          <TouchableOpacity style={styles.btnLogin} onPress={handleSignIn}>
            <Text
              style={{
                fontFamily: "Regular",
                fontSize: 18,
                color: "#FFFFFF",
              }}
            >
              Entrar com Google
            </Text>
            <Image
              source={require("../../assets/icon-google.png")}
              style={styles.ImageButton}
            />
          </TouchableOpacity>
        </View>
        <Image
          source={require("../../assets/arvore-bg.png")}
          style={styles.arvore}
        />
      </ImageBackground>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
    alignItems: "center",
    // justifyContent: 'center',
  },
  mainImgLogin: {
    height: 250, //altura
    width: 250, //largura img nao é quadrada
    marginTop: 50, // tira espacamento pra cima
    //marginLeft: 90, //tira espacamento pra cima
  },
  btnLoginText: {
    fontSize: 10, //aumentar um pouco
    color: "#FFFFFF", //mesma cor identidade
    letterSpacing: 6, //espacamento entre as letras
    textTransform: "uppercase", //estilo maiusculo
  },
  btnLogin: {
    marginTop: 150,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 65,
    width: 270,
    backgroundColor: "transparent",
    borderColor: "#FC7B20",
    borderWidth: 1,
    borderRadius: 50,
    shadowOffset: { height: 1, width: 1 },
  },
  ImageButton: {
    height: 30,
    width: 30,
    marginLeft: 10,
  },
  arvore: {
    // marginTop: 150,
    width: 220,
    height: 147,
    alignSelf: "flex-end",
  },
});
