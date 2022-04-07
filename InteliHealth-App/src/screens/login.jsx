import { StatusBar } from "expo-status-bar";
import * as AuthSession from 'expo-auth-session';
import { useNavigation } from "@react-navigation/native";

import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  TouchableOpacity,
  Link,
  Alert
} from "react-native";
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

export function Login() {
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

  let navigation = useNavigation();

  async function handleSignIn() {
    const CLIENT_ID = '341611321921-3e98v9sp3ibprm6831ldq96v9s9kl86h.apps.googleusercontent.com';
    const REDIRECT_URI = 'https://auth.expo.io/@zennitte/InteliHealth-App';
    const RESPONSE_YPES = 'token';
    const SCOPE = encodeURI('profile email openid');

    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_YPES}&scope=${SCOPE}`;
    const {type, params} = await AuthSession
      .startAsync({ authUrl });

    if (type === 'success') {
      navigation.navigate('Home', {token: params.access_token});
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
