import { StatusBar } from "expo-status-bar";
import moment from "moment";
import "moment/locale/pt-br";
import DropDownPicker from "react-native-dropdown-picker";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import Modal from "react-native-modal";
import AppLoading from "expo-app-loading";
import { useNavigation, useRoute } from "@react-navigation/native";
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
import { AntDesign } from "@expo/vector-icons";
import api from "../services/api";
import {
  VictoryBar,
  VictoryTheme,
  VictoryChart,
  VictoryArea,
} from "victory-native";

moment.locale("pt-br");

export default function Resumo() {
  const [listReminder, setListReminder] = useState([]);
  const [listResponse, setListResponse] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [open, setOpen] = useState(false);
  const [nome, setNome] = useState("");
  const [date, setDate] = useState("");
  const [visible, SetVisible] = useState(false);
  const [updateVisibility, setUpdateVisibility] = useState(false);
  const [updateOpen, setUpdateOpen] = useState(false);
  const [isShow, setIsShow] = useState(false);
  const [notId, setNotId] = useState();

  const data = [
    { year: "2011", earnings: 13000 },
    { year: "2012", earnings: 16500 },
    { year: "2013", earnings: 14250 },
    { year: "2014", earnings: 19000 },
  ];

  useEffect(() => {
    let onProgress = true;
    console.log(id);
    listReminders();
    return () => {
      onProgress = false;
    };
  }, []);

  useEffect(() => {
    let onProgress = true;
    if (listReminder.length > 0) {
      // console.warn("Entrou no else");
      setIsShow(false);
      // console.warn(isShow);
      let a;
    }
    return () => {
      onProgress = false;
    };
  }, []);

  useEffect(() => {
    let onProgress = true;
    listResponses();
    return () => {
      onProgress = false;
    };
  }, []);

  useEffect(() => {
    setChartData(filterByWeek(listResponse));
    console.log(chartData);
  }, [listResponse]);

  const route = useRoute();

  const { id } = route.params;

  const closeModal = () => {
    setDate("");
    setNome("");
    SetVisible(false);
    setOpen(false);
  };

  const closeUpdateModal = () => {
    setDate("");
    setNome("");
    setUpdateVisibility(false);
    setUpdateOpen(false);
  };

  const openUpdateModal = (id) => {
    setUpdateVisibility(true);
    setNotId(id);
    console.log("not");
    console.log(notId);
  };

  const createTrueResponse = () => {
    api
      .post("/Respostas", {
        idTopico: id,
        realizado: true,
      })
      .then(() => {
        listResponses();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const createFalseResponse = () => {
    api
      .post("/Respostas", {
        idTopico: id,
        realizado: 0,
      })
      .then(() => {
        listResponses();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const updateReminder = () => {
    api
      .put("/Lembretes/" + notId, {
        horario: date,
      })
      .then((response) => {
        if (response.status === 204) {
          setDate("");
          setUpdateVisibility(false);
        }
      })
      .then(() => {
        listReminders();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  function listReminders() {
    api("/Lembretes/Meus/" + id)
      .then((response) => {
        if (response.status === 200) {
          setListReminder(response.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function createReminder() {
    api
      .post("/Lembretes", {
        idTopico: id,
        titulo: nome,
        horario: date,
      })
      .then((response) => {
        if (response.status === 200) {
          setDate("");
          setNome("");
          SetVisible(false);
        }
      })
      .then(() => {
        listReminders();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const listResponses = () => {
    api("/Respostas/Meus/" + id)
      .then((response) => {
        setListResponse(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const lastWeek = () => {
    var result = moment().subtract(6, "days").hours(0);
    return result;
  };

  const nextDay = () => {
    var result = moment().add(1, "days").hours(0);
    return result;
  };

  const lastMonth = () => {
    var result = moment().subtract(29, "days").hours(0);
    return result;
  };

  const lastYear = () => {
    var result = moment().subtract(364, "days").hours(0);
    return result;
  };

  const filterByWeek = (listResponse) => {
    return listResponse.filter((response) => {
      return (
        moment(response.dataCriacao) > lastWeek() &&
        moment(response.dataCriacao) < nextDay()
      );
    });
  };

  const filterByMonth = (listResponse) => {
    return listResponse.filter((response) => {
      return (
        moment(response.dataCriacao) > lastMonth() &&
        moment(response.dataCriacao) < nextDay()
      );
    });
  };

  const filterByYear = (listResponse) => {
    return listResponse.filter((response) => {
      return (
        moment(response.dataCriacao) > lastYear() &&
        moment(response.dataCriacao) < nextDay()
      );
    });
  };

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
    <ScrollView style={styles.background}>
      <View style={styles.header}>
        <Image
          onPress={home}
          source={require("../../assets/logo-pessoa-menor.png")}
          style={styles.logo_header}
        />
      </View>

      <View>
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
            placeholder="Selecione o horário da notificação"
            open={open}
            value={date}
            setValue={(date) => setDate(date)}
            onPress={() => setOpen(!open)}
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
                label: "Manhã",
                value: "2030-12-31 10:00:00.000",
                labelStyle: { color: "#fff" },
                selectable: true,
              },
              {
                label: "Tarde",
                value: "2030-12-31 17:00:00.000",
                labelStyle: { color: "#fff" },
                selectable: true,
              },
              {
                label: "Noite",
                value: "2030-12-31 22:00:00.000",
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
          <TouchableOpacity style={styles.btn_criar} onPress={createReminder}>
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
      <Modal
        isVisible={updateVisibility}
        swipeDirection={["right", "left"]}
        animationIn={"fadeIn"}
        animationInTiming={600}
        onSwipeComplete={() => {
          closeUpdateModal();
        }}
        onBackdropPress={() => {
          closeUpdateModal();
        }}
      >
        <View style={styles.cadastro}>
          <DropDownPicker
            placeholder="Selecione o horário da notificação"
            open={updateOpen}
            value={date}
            setValue={(date) => setDate(date)}
            onPress={() => setUpdateOpen(!updateOpen)}
            onClose={() => setUpdateOpen(false)}
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
                label: "Manhã",
                value: "2030-12-31 10:00:00.000",
                labelStyle: { color: "#fff" },
                selectable: true,
              },
              {
                label: "Tarde",
                value: "2030-12-31 17:00:00.000",
                labelStyle: { color: "#fff" },
                selectable: true,
              },
              {
                label: "Noite",
                value: "2030-12-31 22:00:00.000",
                labelStyle: { color: "#fff" },
                selectable: true,
              },
            ]}
          />
          <TouchableOpacity style={styles.btn_criar} onPress={updateReminder}>
            <Text
              style={{
                fontFamily: "Regular",
                fontSize: 16,
                color: "#FFFFFF",
              }}
            >
              Atualizar
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>
      {isShow && (
        <View style={styles.container_dados1}>
          <TouchableOpacity
            onPress={() => {
              SetVisible(true);
            }}
          >
            <MaterialIcons
              style={styles.nome1}
              name="add"
              size={35}
              color="black"
            />
          </TouchableOpacity>
        </View>
      )}
      {!isShow && (
        <View>
          {listReminder.map((item) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  openUpdateModal(item.idLembrete);
                }}
                key={item.idLembrete}
              >
                <View style={styles.container_not}>
                  <View>
                    <Text style={styles.hora}>
                      {moment(item.horario).format("LT")}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}

          <View style={styles.container_resposta}>
            <TouchableOpacity onPress={createTrueResponse}>
              <View style={styles.btn_resposta}>
                <AntDesign name="check" size={28} color="#FC791C" />
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={createFalseResponse}>
              <View style={styles.btn_resposta}>
                <AntDesign name="close" size={28} color="#FC791C" />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      )}
      <View style={{ width: "100%", alignItems: "center" }}>
        <VictoryChart width={360} theme={VictoryTheme.material}>
          <VictoryArea
            interpolation="basis"
            style={{
              data: { fill: "#b5540e", stroke: "#000", strokeWidth: 2 },
              parent: { border: "1px solid #000" },
              labels: { color: "#000" },
            }}
            data={chartData}
            animate={{
              duration: 2000,
              onLoad: { duration: 1000 },
            }}
            y="realizado"
          />
        </VictoryChart>
      </View>
      <View>
        <View style={styles.container_filtro}>
          <TouchableOpacity onPress={() => setChartData(filterByWeek(listResponse))}>
            <View style={styles.btn_filtro}>
              <Text style={styles.txt_filtro}>Semanal</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setChartData(filterByMonth(listResponse))}>
            <View style={styles.btn_filtro}>
              <Text style={styles.txt_filtro}>Mensal</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setChartData(filterByYear(listResponse))}>
            <View style={styles.btn_filtro}>
              <Text style={styles.txt_filtro}>Anual</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "#3F3F3F",
    width: "100%",
    height: 48,
  },

  logo_header: {
    height: 25,
    marginLeft: 305,
    marginTop: 15,
  },

  header: {
    backgroundColor: "#000",
    width: "100%",
    height: 50,
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

  container_dados: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
    color: "#FFFF",
  },

  nome: {
    color: "#FFFF",
    borderColor: "#FC791C",
    width: 270,
    height: 70,
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",

    backgroundColor: "transparent",
    borderWidth: 2,
    borderRadius: 10,
    // shadowOffset: { height: 1, width: 1 },
  },

  container_dados1: {
    color: "#FFFF",
    borderColor: "#FC791C",
    width: 270,
    height: 70,
    marginTop: 40,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    backgroundColor: "transparent",
    borderWidth: 2,
    borderRadius: 10,
  },

  container_not: {
    color: "#FFFF",
    borderColor: "#FC791C",
    width: 280,
    height: 70,
    marginTop: 40,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
    alignSelf: "center",
    textAlign: "center",
    textAlignVertical: "center",
    backgroundColor: "transparent",
    borderWidth: 2,
    borderRadius: 10,
  },

  hora: {
    color: "#FC791C",
    fontSize: 20,
    fontFamily: "Regular",
    textAlign: "center",
    textAlignVertical: "center",
  },

  container_resposta: {
    display: "flex",
    flexDirection: "row",
    width: 280,
    alignSelf: "center",
    justifyContent: "space-between",
  },

  
  btn_resposta: {
    color: "#FFFF",
    borderColor: "#FC791C",
    width: 125,
    height: 60,
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    backgroundColor: "transparent",
    borderWidth: 2,
    borderRadius: 20,
  },

  container_filtro: {
    display: "flex",
    flexDirection: "row",
    width: 280,
    alignSelf: "center",
    justifyContent: "space-between",
    marginBottom: 30,
  },

  btn_filtro: {
    color: "#FFFF",
    borderColor: "#FC791C",
    width: 80,
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    backgroundColor: "transparent",
    borderWidth: 2,
    borderRadius: 20,
  },

  txt_filtro: {
    color: "#fff",
    fontFamily: "Regular",
  },
  
  nome1: {
    color: "#FC791C",
  },

  engrenagem: {},

  backgroundModal: {
    backgroundColor: "#3F3F3F",
    width: 300,
    height: 250,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 15,
    borderRadius: 20,
  },

  lembrete: {
    color: "#FFFF",
    borderColor: "#FC791C",
    width: 250,
    height: 70,
    backgroundColor: "transparent",

    borderBottomWidth: 1,
  },

  btnLogin: {
    marginTop: 25,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    width: 130,
    backgroundColor: "transparent",
    borderColor: "#FC7B20",
    borderWidth: 1,
    borderRadius: 50,
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
