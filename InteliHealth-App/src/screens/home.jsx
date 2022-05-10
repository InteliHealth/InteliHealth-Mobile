import { StatusBar } from "expo-status-bar";
import DropDownPicker from "react-native-dropdown-picker";
import Svg, { SvgUri } from "react-native-svg";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  FlatList,
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
import api from "../services/api";
import { getLogedUser } from "../services/auth";

export function Home() {
  const [open, setOpen] = useState(false);
  const navigation = useNavigation();
  const [idUser, setIdUser] = useState(0);
  const [username, setUsername] = useState("");
  const [nome, setNome] = useState("");
  const [icone, setIcone] = useState("");
  const [listaTopico, setListaTopico] = useState([]);
  const [visible, SetVisible] = useState(false);
  const [loadingImg, setLoadingImg] = useState(
    "https://raw.githubusercontent.com/InteliHealth/InteliHealth-Images/1d98cf8e13ce334a6d72bdf18ab19d9ab3a54eb9/Loading/loading-svgrepo-com.svg"
  );

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    listTopic();
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

  async function getUser() {
    const { idUsuario, nome } = await getLogedUser();
    setIdUser(idUsuario);
    console.log(idUser);
    setUsername(nome);
    console.log(username);
  }

  const closeModal = async () => {
    setIcone("");
    setNome("");
    SetVisible(false);
    setOpen(false);
  };

  const createTopic = async () => {
    await api
      .post("/Topicos", {
        idUsuario: idUser,
        nome: nome,
        icone: icone,
      })
      .then((response) => {
        if (response.status === 201) {
          setIcone("");
          setNome("");
          SetVisible(false);
        }
      })
      .then(() => {
        listTopic();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  async function listTopic() {
    const { idUsuario } = await getLogedUser();

    await api("/Topicos/Meus/" + idUsuario)
      .then((response) => {
        if (response.status === 200) {
          setListaTopico(response.data);
          console.log(listaTopico);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <ScrollView style={styles.main}>
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
              Bem-<Text style={{ color: "#FE7B1D" }}>Vindo, </Text>
              {username}
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
              <Text style={{ color: "#FE7B1D" }}> hábitos</Text> e{" "}
              <Text style={{ color: "#FE7B1D" }}> metas</Text> para melhorar sua
              qualidade de vida
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
        <View style={styles.objetivos}></View>
        <Modal
          isVisible={visible}
          swipeDirection={["right", "left"]}
          animationIn={"fadeIn"}
          animationInTiming={600}
          onSwipeComplete={() => {
            closeModal();
          }}
          onBackdropPress={() => {
            closeModal();
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
              dropDownContainerStyle={{
                backgroundColor: "#292929",
                borderColor: "#FE7B1D",
              }}
              labelStyle={{ color: "#FFFFFF" }}
              placeholderStyle={{
                backgroundColor: "#292929",
                color: "#FFFFFF",
              }}
              style={{ backgroundColor: "#292929", borderColor: "#FE7B1D" }}
              dropDownStyle={{
                backgroundColor: "#292929",
                borderColor: "#FE7B1D",
              }}
              arrowIconStyle={{ backgroundColor: "#FE7B1D" }}
              items={[
                {
                  label: "Correr",
                  value:
                    "https://raw.githubusercontent.com/InteliHealth/InteliHealth-Images/092e1693ba0315c6e08778ff89aee6a53cd65c63/Running/running-svgrepo-com.svg",
                  icon: () => (
                    <FontAwesome5
                      name="running"
                      size={24}
                      color="black"
                      style={{ color: "#FE7B1D" }}
                    />
                  ),
                  labelStyle: { color: "#fff" },
                  selectable: true,
                },
                {
                  label: "Dormir",
                  value:
                    "https://raw.githubusercontent.com/InteliHealth/InteliHealth-Images/092e1693ba0315c6e08778ff89aee6a53cd65c63/Sleep/sleep-svgrepo-com.svg",
                  icon: () => (
                    <MaterialCommunityIcons
                      name="sleep"
                      size={24}
                      color="black"
                      style={{ color: "#FE7B1D" }}
                    />
                  ),
                  labelStyle: { color: "#fff" },
                  selectable: true,
                },
                {
                  label: "Medicamentos",
                  value:
                    "https://raw.githubusercontent.com/InteliHealth/InteliHealth-Images/092e1693ba0315c6e08778ff89aee6a53cd65c63/Medical/briefcase-medical-svgrepo-com.svg",
                  icon: () => (
                    <FontAwesome5
                      name="briefcase-medical"
                      size={24}
                      color="black"
                      style={{ color: "#FE7B1D" }}
                    />
                  ),
                  labelStyle: { color: "#fff" },
                  selectable: true,
                },
                {
                  label: "Exercícios",
                  value:
                    "https://raw.githubusercontent.com/InteliHealth/InteliHealth-Images/092e1693ba0315c6e08778ff89aee6a53cd65c63/Dumbell/dumbell-svgrepo-com.svg",
                  icon: () => (
                    <FontAwesome5
                      name="dumbbell"
                      size={24}
                      color="black"
                      style={{ color: "#FE7B1D" }}
                    />
                  ),
                  labelStyle: { color: "#fff" },
                  selectable: true,
                },
                {
                  label: "Meditar",
                  value:
                    "https://raw.githubusercontent.com/InteliHealth/InteliHealth-Images/092e1693ba0315c6e08778ff89aee6a53cd65c63/Meditate/meditation-meditate-mindful-mindfulness-svgrepo-com.svg",
                  icon: () => (
                    <MaterialCommunityIcons
                      name="meditation"
                      size={24}
                      color="black"
                      style={{ color: "#FE7B1D" }}
                    />
                  ),
                  labelStyle: { color: "#fff" },
                  selectable: true,
                },
                {
                  label: "Estudos",
                  value:
                    "https://raw.githubusercontent.com/InteliHealth/InteliHealth-Images/092e1693ba0315c6e08778ff89aee6a53cd65c63/School/school-svgrepo-com.svg",
                  icon: () => (
                    <FontAwesome5
                      name="school"
                      size={24}
                      color="black"
                      style={{ color: "#FE7B1D" }}
                    />
                  ),
                  labelStyle: { color: "#fff" },
                  selectable: true,
                },
                {
                  label: "Leitura",
                  value:
                    "https://raw.githubusercontent.com/InteliHealth/InteliHealth-Images/main/Book/book-svgrepo-com.png",
                  icon: () => (
                    <FontAwesome5
                      name="book"
                      size={24}
                      color="black"
                      style={{ color: "#FE7B1D" }}
                    />
                  ),
                  labelStyle: { color: "#fff" },
                  selectable: true,
                },
                {
                  label: "Água",
                  value:
                    "https://raw.githubusercontent.com/InteliHealth/InteliHealth-Images/092e1693ba0315c6e08778ff89aee6a53cd65c63/Water/water-svgrepo-com.svg",
                  icon: () => (
                    <Ionicons
                      name="water"
                      size={24}
                      color="black"
                      style={{ color: "#FE7B1D" }}
                    />
                  ),
                  labelStyle: { color: "#fff" },
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
              placeholder="Nome"
              placeholderTextColor={"#FFF"}
              value={nome}
              onChangeText={(nome) => setNome(nome)}
            ></TextInput>
            <TouchableOpacity style={styles.btn_criar} onPress={createTopic}>
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
        <View>
          {listaTopico.map((topico) => {
            return (
              <View key={topico.idTopico}>
                <TouchableOpacity>
                  <View>
                    <SvgUri width="50" height="50" uri="http://thenewcode.com/assets/images/thumbnails/homer-simpson.svg" color="#fff"/>
                  </View>
                </TouchableOpacity>
                <Text
                  style={{
                    fontFamily: "Bold",
                    fontSize: 16,
                    textAlign: "center",
                    color: "#FE7B1D",
                    marginTop: 5,
                  }}
                >
                  {topico.nome}
                </Text>
              </View>
            );
          })}
        </View>

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
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: "#3F3F3F",
  },
  container: {
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
    marginLeft: 275,
    backgroundColor: "#393939",
    // borderWidth: 1,
    // borderColor: '#FE7B1D',
    backgroundColor: "#272727",
    position: "absolute",
    // display: "flex",
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
