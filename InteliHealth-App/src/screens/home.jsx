import { StatusBar } from "expo-status-bar";
import DropDownPicker from "react-native-dropdown-picker";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { useFonts } from "expo-font";
import { useNavigation } from "@react-navigation/native";
import AppLoading from "expo-app-loading";
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import Modal from "react-native-modal";

import IconPicker from "./components/picker/picker";
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
import { useState, useEffect } from "react";

export function Home() {
  const [open, setOpen] = useState(false);
  const navigation = useNavigation();
  const [icone, setIcone] = useState("");

  const [visible, SetVisible] = useState(false);

  useEffect(() => {
    progress();
  }, [icone]);

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
    Bold: Poppins_700Bold,
    Poppins_700Bold_Italic,
    ExtraBold: Poppins_800ExtraBold,
    Poppins_800ExtraBold_Italic,
    Black: Poppins_900Black,
    Poppins_900Black_Italic,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  function perfil() {
    navigation.navigate("Perfil");
  }
  function lembretes() {
    navigation.navigate("Lembretes");
  }

  function progress() {
      console.log(icone)
  }

  DropDownPicker.setTheme("DARK");


  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require("../../assets/text-logo.png")}
          style={styles.logo_header}
        />
        <TouchableOpacity onPress={perfil}>
          <Image
            source={require("../../assets/perf-button.png")}
            style={styles.perfil}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.banner}>
        <View>
          <Text
            style={{
              fontFamily: "Bold",
              fontSize: 18,
              color: "#FFFFFF",
              marginLeft: 20,
              marginTop: 10,
            }}
          >
            Bem-<Text style={{ color: "#FE7B1D" }}>Vindo,</Text>Nome
          </Text>
          <Text
            style={{
              fontFamily: "Regular",
              fontSize: 14,
              color: "#FFFFFF",
              width: 150,
              height: 170,
              marginLeft: 20,
              marginTop: 10,
            }}
          >
            Comece por aqui a organizar seus
            <Text style={{ color: "#FE7B1D" }}> hábitos</Text> preparamos alguns
            para você começar
          </Text>
        </View>
        <Image
          source={require("../../assets/bg-banner.png")}
          style={{
            width: 135,
            height: 107,
            alignSelf: "flex-end",
          }}
        />
      </View>
      <View style={styles.objetivos}>
        <TouchableOpacity onPress={lembretes}>
          <View style={styles.card}>
            <FontAwesome5 name="running" size={55} color="#FE7B1D" />
          </View>
          <Text
            style={{
              fontFamily: "Bold",
              fontSize: 16,
              textAlign: "center",
              color: "#FE7B1D",
              marginTop: 5,
            }}
          >
            Exercícios
          </Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <View style={styles.card}>
            <MaterialCommunityIcons name="sleep" size={50} color="#FE7B1D" />
          </View>

          <Text
            style={{
              fontFamily: "Bold",
              fontSize: 16,
              textAlign: "center",
              color: "#FE7B1D",
              marginTop: 5,
            }}
          >
            Sono
          </Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <View style={styles.card}>
            <FontAwesome5 name="briefcase-medical" size={45} color="#FE7B1D" />
          </View>

          <Text
            style={{
              fontFamily: "Bold",
              fontSize: 16,
              textAlign: "center",
              color: "#FE7B1D",
              marginTop: 5,
            }}
          >
            Remédios
          </Text>
        </TouchableOpacity>
      </View>
      <Modal
        isVisible={visible}
        swipeDirection={["up", "right", "down", "left"]}
        animationIn={"fadeIn"}
        animationInTiming={600}
        onSwipeComplete={() => {
          SetVisible(false);
        }}
        onBackdropPress={() => {
          SetVisible(false);
        }}
      >
        <View style={styles.cadastro}>
          <DropDownPicker
            placeholder="Selecione um ícone"
            open={open}
            onPress={() => setOpen(!open)}
            value={icone}
            setValue={(icone) => setIcone(icone)}
            onClose={() => setOpen(false)}
            items={[
              {
                label: "Correr",
                value: "Correr",
                icon: () => (
                  <FontAwesome5 name="running" size={24} color="black" />
                ),
                selectable: true,
              },
              {
                label: "Dormir",
                value: "Dormir",
                icon: () => (
                  <MaterialCommunityIcons
                    name="sleep"
                    size={24}
                    color="black"
                  />
                ),
                selectable: true,
              },
              {
                label: "Medicamentos",
                value: "Medicamentos",
                icon: () => (
                  <FontAwesome5
                    name="briefcase-medical"
                    size={24}
                    color="black"
                  />
                ),
                selectable: true,
              },
              {
                label: "Fazer Exercícios",
                value: "Fazer Exercícios",
                icon: () => (
                  <FontAwesome5 name="dumbbell" size={24} color="black" />
                ),
                selectable: true,
              },
            ]}
          />
          <TextInput
            style={{
              fontFamily: "Regular",
              fontSize: 16,
              color: "#FFFFFF",
              width: 150,
              height: 170,
              marginLeft: 20,
              marginTop: 10,
              borderBottomColor: "#FE7B1D",
              borderBottomWidth: 1,
              height: 35,
            }}
          >
            Nome
          </TextInput>
          <TouchableOpacity style={styles.btn_criar}>
            <Text
              style={{
                fontFamily: "Regular",
                fontSize: 16,
                color: "#FFFFFF",
              }}
            >
              Criar
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>
      <TouchableOpacity
        onPress={() => {
          SetVisible(true);
        }}
        title="cadastro_modal"
        style={styles.add}
      >
        <Ionicons name="add" size={55} color="#FE7B1D" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#3F3F3F",
    alignItems: "center",
    // justifyContent: 'center',
  },
  header: {
    width: "100%",
    height: 65,
    backgroundColor: "#292929",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logo_header: {
    width: 128,
    height: 18,
    marginLeft: 40,
  },
  perfil: {
    width: 28,
    height: 28,
    marginRight: 40,
  },
  banner: {
    width: 340,
    height: 185,
    backgroundColor: "#545454",
    borderWidth: 1,
    borderColor: "#FE7B1D",
    borderRadius: 20,
    marginTop: 50,
    flexDirection: "row",
  },
  objetivos: {
    width: 340,
    marginTop: 30,
    flexDirection: "row",
    justifyContent: "space-between",
    maxWidth: 340,
  },
  card: {
    backgroundColor: "#393939",
    borderWidth: 1,
    borderColor: "#FE7B1D",
    width: 90,
    height: 90,
    borderRadius: 13,
    alignItems: "center",
    justifyContent: "center",
    elevation: 10,
  },
  add: {
    marginTop: 50,
    backgroundColor: "#393939",
    // borderWidth: 1,
    // borderColor: '#FE7B1D',
    backgroundColor: "#272727",
    position: "absolute",
    bottom: 20,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 13,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000000",
    elevation: 10,
  },
  cadastro: {
    width: 260,
    height: 320,
    backgroundColor: "#292929",
    borderRadius: 20,
    justifyContent: "space-evenly",
    alignItems: "center",
    alignSelf: "center",
  },
  btn_criar: {
    height: 45,
    width: 120,
    backgroundColor: "transparent",
    borderColor: "#FC7B20",
    borderWidth: 1,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
});
