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
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const handleLembrete = (id) => {
    navigation.navigate("Lembretes", { id });
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
                    "https://lh3.googleusercontent.com/A890P36C3n82eQz7JbQTdQt-X6KLiBSR7CR_Tgp-pAo2LCTREL1rdN42cxI-MouE1GCkb06a96dFPhgGnnLYYwEQxzqh44N2H0GJR6sDnVU8cmJJPbA1oWV-y0y3sXTob_fiQIYTkxXZVPBNfHS0WgwG5_-wk46uWanmFCjhZO7vI_FxDImJcJDCWXxXYsr8mE9YGZKGZhUJ5426XNQzA3PDHXiw1AAPWrG8WRg8Nzd38qMrhgroOQ9vtsw9gkx-ZPfH1E9Rs0EWseEyNVfCBLyHku2Ma8l3b2f2GP5Rv0lX3BkhVzPO0Z5q88vJJ4xRGPS1ifWUyz3t_ibae4vWsqbFOWkfXv1mPCQ2iwGJMqJI745pfedv_0lV5YSfMqL2STH8FT6lCPPzmZFeopGanFigBfs2gHPfmsEA1PPQAX12rUXafCdcQ8N35tQFVlgsYGytYyzXt1HX1aQxdvFkoAQTTEDYXAuf-JeP8RQXahslvNfrlXt7ZjU0Y5If13flM9xBTPxBhSJtTGibf17Zm2QpT-7nnapPqbRst11b9MiqPx3R92HJmHBUBgZRGFGZyGavvDEiiwM4KmIGlB_78Id0hXaMiFXiMjkiYD5FwzUq23tziVcohjyw9i9zOYzK_c0TLSZHr2ZZOENFFZ1PcZbeJKdRhhu8xm5HiLXINxp8CHsqdLq6K_l8g_sSSUm7Hxej5pRbGQSugmUGUuMKYllImgs9XggMliYKXSVeoBNNfs53uLk6Cg=s512-no?authuser=0",
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
                    "https://lh3.googleusercontent.com/_z5dnvjtG-o78car00Ad6K_-2yRLU7DdaID9hEj2t1kb9sIS1hTfjHWoCTrKn-GRCGNQFc1HNrjE0hiB1HJ4YPPQsNlN_dYe4Ao-5Sd0id7p9SIGK4PdLOa4PO5F6FU3DVLvloKjVFsa0Y_Nt0CBe0z_jOPdqwF14Kw9AiOH7MmhG5RbuGHnzum8T4vyMOqQCCytpRgqZUpfW3qWd5HPleuIl0ZNzD4AuLYaRJ9nyoysN48dX5exIlOOaIvheedReZ9rU2TU5BwO067cR6mwAYyM2CgrhdxjuwIhrNWk-lpdwAtW92Nr3RbrJtinEnh67_1y-mW2datoOOy46hBs1Mk4MJnFp5QPeOksLLS2-WKpFQG0MV_M7SThVDf2QP67EyVZNVuxGUkQaCdZsBzuPmY6q2E1qmmz4IeZDbk9r2NdtJOK2cgqCG2eTDrT0rByK1Q65tPDOKUjcqGdZGivCm3mrrCEaPM_iHfFFR_NEps32F_uDHmft-m6Kqn8WLIboxJGej97SKZCHBKY3olKnupb2jIStIisF67FWCbWKeb76EW8mDLtfjVB_eZrF7xzelWZJJSNq9iuVSJ_zeHfrEn06Y1VFjnUBLDFEBR4Kainr1vCM_I_0KFfSk8dIB6wxpc6W-E9dLibLL71d_YCVYhj8HGzmhEWFVc2Iroydgo0xr1p7ukuAEqWFt_39bAmwIEhRoIC4aV1eizwpartArS2m0vjus53CGSzoGhw94KsyZgLulE5eA=s76-no?authuser=0",
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
                    "https://lh3.googleusercontent.com/2OiA7B5E5YsPEBzjVkmCSh14lTQFceZ4alRSOP97W0NhgEkUyD6e64yQys91-Jv2Roz_GxCLxGfMdGq-kveQ4gC9lsj0k-URNKe5nbSBv_qs5U61OyOv_qpmmKMlV0VigJaPeWSy0TjQ40A8DI-JOFTesQTZbhv2IXsa4CgqRtnIAIsNlqgqxsyT1ggEO1ytGmYU5gP6khRCnSXuHXKbY5NMQNzB8i7dBzEpJ3O-LLeQpIrl-OQjpXNNtVGzk1XAQ1HeMIVDB03GdiYXG1hJWv1t3KhmABnFV8Lcf-JocjfVlArit_MzZL2QV7OyIbV0Eux_kTRWmjw8bBsmz_NYKGlB8FG51EIkVice3E-u-Vo5U1uB0KQdzLfkPhI0Pzx9i83vwBe09AD7z3XJJnRAua6whjSPrP27TIJMOt3NCkOInqS_ZNL4rs0flcCMONpN36_EKrU_CQyQl0_EWxml5x6YcWjHYjGSexB29VXaeltJflE9Jt5edfNp67UYzX83w4tGxXC4WURTtjiqSnWyUWCo6fUpSdyrpu7sAzjsP_17AYJaMg2UtMTYckpbnH6FSRcDSwzKBcWm3PIUI-locEf8LkJt-ePC57tYVcgYAwvQmkZJd0OhwXhcWuTptV19U8uJtyB22cf80wbL-aJd5oQHLw5J4GcPLgH4MncJp64aQem8NOP-bIqNgUTQfnlQOcKJApeJA5_V-ah4o2MFWBAsMDUhlEMN9M9C2E9KGWf0Q1GnNZFE6Q=s250-k-rw-no",
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
                    "https://lh3.googleusercontent.com/Dw_XVPV_TbU-A7Sf1jBWBvu74O1wvXpdSMHq8FSg0yW6Ibiu8iRA-DbEw8Teghm6_WSWhwXxz3he85rJaa176RWYTGS5YYRnBxw6f3hjph91Z4QTNEzWm6D_mqYT1kbwpJmADPHkbNA1m9TLT9Yqrz8KyMGLhYGKJjY-mJiTn1tu-KHFmzDhYCedMDFKze_nkhsj5wv_dUYAtB12pLKPCnOaDOouNm1-NpR8YwnpCxJh7ynAaLOVHhxMJKTTDDMANwfYmN5g6110HaHhTM6T9Z_vNvrdDAGxFYxDX8FwtRgFKi9aE1Aa4munDnkfzQK9hb4KpyH_XdWgOsWVXVicY7MXU0sLGbUfCBAgX1m1ScMyLc_-5PS1dyLbP1H_5QXVJODY-iBGM-4jzXXQOmtQ7bpFilUVH71ZwT6h_8rB4XK8EyB98zzxxSV-_v1GQE9uQMCIk-5yK1XXJRDTN7JVs0sDNmHvCOR51a7iT6XOjIjihB1SM28q7Sl_ThRovCG1LN8jjk6B1_f6n6TCGB4CDXzkxOuxaFD6aMYTTJrNFg3eqQU8WH2K0BV9LBt9lQGE_Rc1ZQkSsYyE8wuqFD74DT1IP_cH8HAJFMGcMnwX6MHVq121OYelIVGZ7jMDyXTVjclU52ssYkv-flFVYmfTsQOpPNMbLrc2rfrcQin8_yM4r61UyRXX2j__YZe09t_YBnDrEBRXwAX_zCmzVtNkK_IxvcNK9vyxG8VaHuZ3HezEdYX8HsfBrQ=s388-no?authuser=0",
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
                    "https://lh3.googleusercontent.com/eoPOZBixaUyXR5ct36s6c-bpUKFH77UpBwW4b2TWphV0y9-DAkyEdAlI2J_OfkRbcihFQnqDwrmbyzWeryU0rzfbhiw0yxCWkryteCbcSLgtp97d_zCYoehgL_HO4z22v5HjG-6ecVcwHMSRITUqIDBnfJQ__5uyFxYCIrdxnumQBNfHGrwyN0RqbkQTYazBTCrV64DYWTZVuf60KeM_ZOMMX44e9mctCzk9jDW_wzuNhVzhB7HSGmyjKj4V8-XYZOeGttSU9C5FCRt36EqvLxgu-wJmBIhbGw_znCIWH3VqUZHYVpJwYrv17OjjKIo8oK0Rc6zlhZKGnh9h26lyaV0N4gjdCOpecBYAOzfS5gA2AvSZhrV2amSjxHBxs-mvlKNI3yssvBvH-DkBmQJ8aDhVMCo0BW6l22fUH9sZBuPWUSwVI76DibyKAauKcMNtbxA6rUpR-4s_FcOT860I2EvlIDRN48KniBLur2k___UlGwuorBk7hhzS-dReDgXyD96cMdVHsDaCToRGuSNBvAz8pTRxu2T1BvOfXxPY9Wi6hqCPmyoIBz6RcE9vjtLNzVZVQ0O6Fce-PRpHoNQkS9w_3jNo8c_k-VYl0-N6ZHFI7XyOQNmdmB9YLzVeYKtg9zxiYQY6HsJoLEzzJPEY_kayKnoZYmEbg-DrxxUU8P2I1j11vYoal4_Crs27UxWmLISKQDJKTtBN7ZekEgNNXFZyipASdLlbITJBK5bilxLZDhQ0Js3k4g=s256-no?authuser=0",
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
                    "https://lh3.googleusercontent.com/-acpjwbZUCvO6h66JMq1cJIuMDLWh12cP4X8GSUK-c5kl0DAOtGf_ViolOp1oKky54SKmANrzZ293PWeD8_p3xOMp1ogT638GAED5dndmR6rP0SqgHOEyd7vXFbprBmWnHAymaGBgjoXRv3HolHqTgM84OlcGhJlp2akULab5qKZMfFxULKKOF-1r3KjPbpNnKQXbPjeRvDZp9h5IfcqyNIwpkMBu0c8aAKevaebgzu0Bc2NdZiIBAn1_ioabw-n1BUBkSqWShb1SFGmdtjAw2vr4ZkP2EDjGjnV9ti4cFO1Mz-CxrzqzeoiPaZrXEXIZ49TTLogsR6tDlxPE3ShiGBvAMEAk7uoCtHe2S_RXJavJoXuLmLCWwJxvFM_nP3J0aYwGy0xMFK7idXqMOYfOCYB22_UgIxco-AcaurvfhVScKg6m9cu5LWFQyPSVo2SKTaFRv2aL_U1hUK5gMykEV4k2VIOEFfYeBe1iZWJowZr9ARLv1QY4IUbwuPipg9KtzUm0uyyc-UeL4UlUPL9RkI_I51ssBw4-dp6hdyGurkCfqGLlnztzMUb9tC4St0585jzhnPWE2lTaY_aSXSLU8pK0mhKvq8GvZ_QEDRk4G3mOtpHdaWI52Oc58KVbjqEY0vrnuzMDFzcFumdigjRV-08ETEJTn5IoUECB__xiw6GKJGKfETIIJ6naAlVSRhBa97rz24svKArNGYzIrmJreRaOJA-TksQYiIioRCY0-oJThZExvXSDA=s460-no?authuser=0",
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
                    "https://lh3.googleusercontent.com/E6cCwS8CZIM8-lJYrvcpi3-IaLbVEzVH68O3ttwafznDMg0rlkmkIzY206_rU8B14bIPLt4rXXEBdDC1-HvWWt60RAPVgXDUVEOfcNTLwUvXmWj3-hKQ2fStT81ooBCd98Mc4aNyjiwfUfIuc_HyiY5XtJwy5VNwDbFJ7JTK1iP-c9Z_jBf3bfWmbBBFra4dFRFuSGOuTe3GklnS3SIXDqcuBDm9HnvDBqxphnLsfaQEkgAutcVmmSn6gaotVA6IHUyziyPekQLxlAyXN68QboTUlBYzKw1h7ugXMnHUMaiv9fQkDBkC5DrLO8l0yvhKzgFmEbHEKzU4igT_8gIIAwa5349gt9pAVsCPWqYUyNvTiOWlCAop1tr1YeNmo8B7bRQHBKFEPnH2CNe8mfrGoOBwNeIBiQCbdlDFPF_e9XRNeSWLEs-cv1n0Ow_UKDxtfT3zTC-5dy-898PyInlfdonqjjceXsOcODWe1LwIefOhEA9uuARG1GAkgpUWbXj1gRrTVBZ31A0WybTWUk-FOrlxx96gkUfNYIZBX-PRXWNneY7ABTSyCg_xjBcdn8Crc33rUSzpVnlxpQSd9F0-77h-ufE_6kK0hWvhOHp9ItKO--jjAs694Lw9uKTqn1zRl8sQdxWqjaQLIjBwueLozh83X4G6U0YFTUPZtZgN4lM0Y7V_1lWgi5rdV-9G2JA544fEvmLKPKbrszWxQ3yzhL8M0vEyjInpnMTThDTc4agF-AmnkTSjUQ=s489-no?authuser=0",
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
                    "https://lh3.googleusercontent.com/vhIt8Z9Iosu3FafqUu5NSatPGmJriIjajJezj2LmP4krJ1TAMSnhli8jjnjBEAO_FBkiy7BH16acj5jzYQ0UBP6unHzTKo8kx3tctr2ycGuPuMlWypLr-_gS0MlRxSrXfdTyQiO2JlOmP_J4dJAAZxD8TxGf_0u7NAPfzi9WE_gG6TgkKOaJPIjD1zCfvLxFP8l6RvbkcoASWHLIJ26eAaHOvgi8VCYzVJ-udUkrHwu8JqQ1IZK4i-_AIiuH5v3WohH1kW5HcnCIbjvINqmprBZo4WCqLNCyAGgfdeYCTgbCstmbt1aQCKiyuC-n8_7y9McpcASqgeT_pajREB3My5xJQKipiTNpiB6dyd6GonMhIUA5XJhUa89aFWUG4HFBqhztjQbViemRBGN5zUJxT-OGn0sZSvcWbRjwLwlNxcL0mk5NyYlGzWjRYAJARwzxsRyzuh8Ij3qo_0Wz1vDmgGWvdAdxzJYoPw8ebCmcNw8UlxnaIXsh5hjnQzeYGfJprQN8aaqZGxvnxUCjZhEasJzJpMg7b5XZlESjTF4WszXCW3H4_Ml40v1jJbpCUYF6K8PN_7iln3hegbbi_mZJoSyY87EqE4ir8HM7e2kTcE2wd1h3Blsi0XIKN54W4UXw_7ia5w3jyiObFmH3iiS5GBf0RCP9pRuvMp1AhIuitmtxAhHA0u0u_C_bKlZ9XK6TFGf4JSESXTa2r6A-ukUbWEdPwozdgbasP5QBh6xmQ-M-Cp6NMlhTbA=s512-no?authuser=0",
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
        <View style={styles.objetivos}>
          {listaTopico.map((topico) => {
            return (
              <TouchableOpacity key={topico.idTopico} onPress={() => {
                handleLembrete(topico.idTopico);
              }}>
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
                    marginTop: 5,
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
  container_objetivos:{
    width: "100%",
    maxWidth: 340,
    display: "flex",
    flexWrap: "wrap"
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
