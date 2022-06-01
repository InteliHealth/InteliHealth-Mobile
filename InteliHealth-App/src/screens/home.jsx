import { StatusBar } from "expo-status-bar";
import DropDownPicker from "react-native-dropdown-picker";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Dimensions,
} from "react-native";
import { useFonts } from "expo-font";
import { useNavigation } from "@react-navigation/native";
import AppLoading from "expo-app-loading";
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import Modal from "react-native-modal";
import { RFPercentage } from "react-native-responsive-fontsize";

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
  const [deleteVisible, setDeleteVisible] = useState(false);
  const [deleteId, setDeleteId] = useState(0);

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    if (getLogedUser === null) {
      navigation.navigate("Home");
    }
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

  const closeDeleteModal = () => {
    setDeleteVisible(false);
    setDeleteId(0);
  };

  const openDeleteModal = (id) => {
    setDeleteId(id);
    console.log(deleteId);
    setDeleteVisible(true);
  };

  const deleteTopic = () => {
    api
      .delete("/Topicos/" + deleteId)
      .then(() => {
        setDeleteVisible(false);
      })
      .then(() => {
        listTopic();
      })
      .catch((error) => {
        console.log(error);
      });
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
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const handleLembrete = (id) => {
    navigation.navigate("Lembretes", { id });
  };

  return (
    <ScrollView style={styles.main}>
      <View style={styles.header_margin} />
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
            {Dimensions.get("window").width > 700 ? (
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
                labelStyle={{
                  color: "#FFFFFF",
                  fontFamily: "Regular",
                  fontSize: 20,
                }}
                placeholderStyle={{
                  backgroundColor: "#292929",
                  color: "#FFFFFF",
                  fontFamily: "Regular",
                  fontSize: 18,
                }}
                style={{
                  backgroundColor: "#292929",
                  borderColor: "#FE7B1D",
                  minHeight: 75,
                }}
                dropDownStyle={{
                  backgroundColor: "#292929",
                  borderColor: "#FE7B1D",
                }}
                arrowIconStyle={{
                  backgroundColor: "#FE7B1D",
                  height: 35,
                  width: 35,
                }}
                items={[
                  {
                    label: "Correr",
                    value:
                      "https://lh3.googleusercontent.com/hDMjoOvJS3ow7Uw2qU4p2wNLYHDQ3eEr_KIjvqmklSN-ySHip4MhWo824-w9sNrGucKX3uO8mB-aBJjixfXQJiPBLXIdNjbi3KRDgQYDu16BHVMrAn3t4Fa9H25uWEf6w2hvB6vq=w2400",
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
                      "https://lh3.googleusercontent.com/pmG_M5SPv0RdAI6q5COIz34MZobbJGMh4rh9I2FBBtwzN3oFkg5jsn_Hy6kP4JbWt9QiruCj9L7ktUARS5CSPD-VeFG_IO812WYxun8iQfEBMD9nWxh0v2ZoZKnzGoUzwSzisY6E=s76-p-k",
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
                      "https://lh3.googleusercontent.com/uWsD6OLoU5rgNJFPzwGwD3yEz_EkKJIRK4Vy0J-I3BNP32ZKTTgkIPyfRMx_cLdW1-BANKzVVaQO-E98MZBO09XQQ30eBy-6ZkHudDVHwWp9v1A38b2urrmkbeOJJkj-4Pm7eXmu=w2400",
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
                      "https://lh3.googleusercontent.com/-AGSqgkRpT1DV29TMP0XS4y0c5MZrKYZf4QsIpJakpH0K51dnFLC-wjHGqe6KCq7sOjDrNZ4F4kLqBlDwrNqB5tXjGQPvIhBwQ2Zpz-_PJ3TuBGKutONisihGODlAy9KajbRuLbH=w2400",
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
                      "https://lh3.googleusercontent.com/B2INGkDd_y9h-DLAIZ0SEP-tviXHnYRhR2BjaGn7KpcRp3KYACynBDv1bDdOW2czO79M7f7YzfOlvuP1ima7aUe268tAtah3H1DWM6FGUUKsMExmUtcPoH570bi610mqT1jah-UE=s256-p-k",
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
                      "https://lh3.googleusercontent.com/qzG-R4qxX4savPyjlmy3sTOwvKhTdmKrga3YPZXC8yjRNH6O2aZjytFJE0mk9oHaCBhqSQHqmTETGaIZrB8tFQxCPdfsetp76SRarOu5_jXMO0O3SBbjI7AtQrpPJBp7_TO4teNx=w2400",
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
                      "https://lh3.googleusercontent.com/x-GP7gkF1LBLyWQhp9t2gauFGEQHG2sR3q2adXbtm2XBYUL59kQUZPfUywlsU7Ke68sH6I0s9Nn0N_-G4RjYV-It-ozZBvj528YyESpA53ENP2_wFQln3C4tfitTFh4u9fEXIGd4=w2400",
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
                      "https://lh3.googleusercontent.com/_3MK9WaAdkFDnas_3Fm0dGEAA7XzlTEEzHI8fRs1-57hJcTV16YIS-m0YaxhHvg7WOOi_ZooEUhRtNmiVDmK6iUg_LpU3Ct3mjQjuB1FYT3rOou_5eP0DRfsM15vmoevt1nXlCsv=w2400",
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
            ) : (
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
                labelStyle={{
                  color: "#FFFFFF",
                  fontFamily: "Regular",
                  fontSize: 16,
                }}
                placeholderStyle={{
                  backgroundColor: "#292929",
                  color: "#FFFFFF",
                  fontFamily: "Regular",
                  fontSize: 14,
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
                      "https://lh3.googleusercontent.com/hDMjoOvJS3ow7Uw2qU4p2wNLYHDQ3eEr_KIjvqmklSN-ySHip4MhWo824-w9sNrGucKX3uO8mB-aBJjixfXQJiPBLXIdNjbi3KRDgQYDu16BHVMrAn3t4Fa9H25uWEf6w2hvB6vq=w2400",
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
                      "https://lh3.googleusercontent.com/pmG_M5SPv0RdAI6q5COIz34MZobbJGMh4rh9I2FBBtwzN3oFkg5jsn_Hy6kP4JbWt9QiruCj9L7ktUARS5CSPD-VeFG_IO812WYxun8iQfEBMD9nWxh0v2ZoZKnzGoUzwSzisY6E=s76-p-k",
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
                      "https://lh3.googleusercontent.com/uWsD6OLoU5rgNJFPzwGwD3yEz_EkKJIRK4Vy0J-I3BNP32ZKTTgkIPyfRMx_cLdW1-BANKzVVaQO-E98MZBO09XQQ30eBy-6ZkHudDVHwWp9v1A38b2urrmkbeOJJkj-4Pm7eXmu=w2400",
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
                      "https://lh3.googleusercontent.com/-AGSqgkRpT1DV29TMP0XS4y0c5MZrKYZf4QsIpJakpH0K51dnFLC-wjHGqe6KCq7sOjDrNZ4F4kLqBlDwrNqB5tXjGQPvIhBwQ2Zpz-_PJ3TuBGKutONisihGODlAy9KajbRuLbH=w2400",
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
                      "https://lh3.googleusercontent.com/B2INGkDd_y9h-DLAIZ0SEP-tviXHnYRhR2BjaGn7KpcRp3KYACynBDv1bDdOW2czO79M7f7YzfOlvuP1ima7aUe268tAtah3H1DWM6FGUUKsMExmUtcPoH570bi610mqT1jah-UE=s256-p-k",
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
                      "https://lh3.googleusercontent.com/qzG-R4qxX4savPyjlmy3sTOwvKhTdmKrga3YPZXC8yjRNH6O2aZjytFJE0mk9oHaCBhqSQHqmTETGaIZrB8tFQxCPdfsetp76SRarOu5_jXMO0O3SBbjI7AtQrpPJBp7_TO4teNx=w2400",
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
                      "https://lh3.googleusercontent.com/x-GP7gkF1LBLyWQhp9t2gauFGEQHG2sR3q2adXbtm2XBYUL59kQUZPfUywlsU7Ke68sH6I0s9Nn0N_-G4RjYV-It-ozZBvj528YyESpA53ENP2_wFQln3C4tfitTFh4u9fEXIGd4=w2400",
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
                      "https://lh3.googleusercontent.com/_3MK9WaAdkFDnas_3Fm0dGEAA7XzlTEEzHI8fRs1-57hJcTV16YIS-m0YaxhHvg7WOOi_ZooEUhRtNmiVDmK6iUg_LpU3Ct3mjQjuB1FYT3rOou_5eP0DRfsM15vmoevt1nXlCsv=w2400",
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
            )}

            <TextInput
              style={styles.inputNome}
              placeholder="Nome"
              placeholderTextColor={"#FFF"}
              value={nome}
              onChangeText={(nome) => setNome(nome)}
            ></TextInput>
            <TouchableOpacity style={styles.btn_criar} onPress={createTopic}>
              <Text style={styles.criarText}>Criar</Text>
            </TouchableOpacity>
          </View>
        </Modal>
        <Modal
          isVisible={deleteVisible}
          swipeDirection={["right", "left"]}
          animationIn={"fadeIn"}
          animationInTiming={600}
          onSwipeComplete={() => {
            closeDeleteModal();
          }}
          onBackdropPress={() => {
            closeDeleteModal();
          }}
        >
          <View style={styles.delete}>
            <Text style={styles.deleteText}>Excluir Objetivo?</Text>
            <TouchableOpacity style={styles.btn_delete} onPress={deleteTopic}>
              <Text style={styles.deleteBtnText}>Excluir</Text>
            </TouchableOpacity>
          </View>
        </Modal>
        <View style={styles.objetivos}>
          {listaTopico.map((topico) => {
            return (
              <TouchableOpacity
                key={topico.idTopico}
                onLongPress={() => {
                  openDeleteModal(topico.idTopico);
                }}
                onPress={() => {
                  handleLembrete(topico.idTopico);
                }}
              >
                <View style={styles.card}>
                  <Image
                    source={{
                      uri: topico.icone,
                    }}
                    style={{
                      width: 50,
                      height: 50,
                      tintColor: "#FE7B1D",
                    }}
                  />
                </View>
                <Text
                  style={{
                    fontFamily: "Bold",
                    fontSize: 16,
                    textAlign: "center",
                    color: "#FE7B1D",
                    marginTop: 10,
                  }}
                >
                  {topico.nome}
                </Text>
              </TouchableOpacity>
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
      <StatusBar style="light" backgroundColor="#000" />
    </ScrollView>
  );
}

if (Dimensions.get("window").width > 700) {
  var styles = StyleSheet.create({
    main: {
      flex: 1,
      backgroundColor: "#3F3F3F",
    },
    header_margin: {
      width: "100%",
      height: 20,
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
      width: "90%",
      height: 185,
      backgroundColor: "#545454",
      borderWidth: 1,
      borderColor: "#FE7B1D",
      borderRadius: 20,
      marginTop: 50,
      flexDirection: "row",
      justifyContent: "space-evenly",
    },
    container_objetivos: {
      width: "100%",
      maxWidth: 340,
      display: "flex",
      flexWrap: "wrap",
    },
    inputNome: {
      fontFamily: "Regular",
      fontSize: 24,
      color: "#FFFFFF",
      width: "80%",
      height: 170,
      marginTop: 10,
      borderBottomColor: "#FE7B1D",
      borderBottomWidth: 1,
      height: 35,
    },
    criarText: {
      fontFamily: "Regular",
      fontSize: 24,
      color: "#FFFFFF",
    },
    objetivos: {
      marginTop: "7%",
      marginBottom: 10,
      flexDirection: "row",
      justifyContent: "space-around",
      maxWidth: "90%",
      flexWrap: "wrap",
      textAlign: "center",
    },
    card: {
      backgroundColor: "#393939",
      borderWidth: 1,
      borderColor: "#FE7B1D",
      width: 90,
      height: 90,
      marginTop: "5%",
      borderRadius: 13,
      alignItems: "center",
      justifyContent: "center",
      elevation: 10,
      marginLeft: 15,
    },
    add: {
      marginLeft: "80%",
      marginTop: "15%",
      backgroundColor: "#393939",
      // borderWidth: 1,
      // borderColor: '#FE7B1D',
      backgroundColor: "#272727",
      // display: "flex",
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
      width: "75%",
      height: "50%",
      backgroundColor: "#292929",
      borderRadius: 20,
      justifyContent: "space-evenly",
      alignItems: "center",
      alignSelf: "center",
    },
    delete: {
      width: "70%",
      height: "35%",
      backgroundColor: "#292929",
      borderRadius: 20,
      justifyContent: "space-evenly",
      alignItems: "center",
      alignSelf: "center",
      borderColor: "#FC7B20",
      borderWidth: 0.5,
    },
    deleteText: {
      fontFamily: "Bold",
      fontSize: 24,
      color: "#FFFFFF",
    },
    deleteBtnText: {
      fontFamily: "Bold",
      fontSize: 20,
      color: "#FFFFFF",
    },
    btn_criar: {
      height: 60,
      width: "35%",
      backgroundColor: "transparent",
      borderColor: "#FC7B20",
      borderWidth: 1,
      borderRadius: 50,
      justifyContent: "center",
      alignItems: "center",
    },
    btn_delete: {
      height: "14.5%",
      width: "50%",
      backgroundColor: "transparent",
      borderColor: "#FC7B20",
      borderWidth: 1,
      borderRadius: 50,
      justifyContent: "center",
      alignItems: "center",
    },
  });
} else {
  var styles = StyleSheet.create({
    main: {
      flex: 1,
      backgroundColor: "#3F3F3F",
    },
    header_margin: {
      width: "100%",
      height: 30,
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
    container_objetivos: {
      width: "100%",
      maxWidth: 340,
      display: "flex",
      flexWrap: "wrap",
    },
    inputNome: {
      fontFamily: "Regular",
      fontSize: 20,
      color: "#FFFFFF",
      width: "80%",
      height: 170,
      marginTop: 10,
      borderBottomColor: "#FE7B1D",
      borderBottomWidth: 1,
      height: 35,
    },
    criarText: {
      fontFamily: "Regular",
      fontSize: 16,
      color: "#FFFFFF",
    },
    objetivos: {
      width: 300,
      marginTop: 10,
      marginBottom: 10,
      flexDirection: "row",
      justifyContent: "space-evenly",
      maxWidth: 340,
      flexWrap: "wrap",
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
      marginLeft: 300,
      backgroundColor: "#393939",
      // borderWidth: 1,
      // borderColor: '#FE7B1D',
      backgroundColor: "#272727",
      // display: "flex",
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
    delete: {
      width: "70%",
      height: "35%",
      backgroundColor: "#292929",
      borderRadius: 20,
      justifyContent: "space-evenly",
      alignItems: "center",
      alignSelf: "center",
      borderColor: "#FC7B20",
      borderWidth: 0.5,
    },
    deleteText: {
      fontFamily: "Bold",
      fontSize: 18,
      color: "#FFFFFF",
    },
    deleteBtnText: {
      fontFamily: "Bold",
      fontSize: 16,
      color: "#FFFFFF",
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
    btn_delete: {
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
}
