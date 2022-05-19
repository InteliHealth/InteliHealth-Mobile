import { StatusBar } from "expo-status-bar";
import { render } from "react-dom";
import moment from "moment";
import * as Notifications from 'expo-notifications';
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
  Button,
  Platform,
} from "react-native";
import React, {
  useState,
  useEffect,
  useRef
} from 'react';
import { FontAwesome } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import Modal from "react-native-modal";
import AppLoading from "expo-app-loading";
import { useNavigation, useRoute } from "@react-navigation/native";
import DateTimePicker from "@react-native-community/datetimepicker";
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
import { set, setWith } from "lodash";
import api from "../services/api";

moment.locale("pt-br");

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function Resumo() {

  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  useEffect(() => {
    let onProgress = true;
    listReminders();
    return () => {
      onProgress = false;
    };
  }, []);

  useEffect(() => {
    let onProgress = true;
    console.warn("AAAAAAAAAA")
    // if (listReminder.length === 0) {
    //   console.warn("Entrou no If")
    //   setIsShow(true);
    //   console.warn(isShow)
    // }
    if (listReminder.length > 0) {
      console.warn("Entrou no else")
      setIsShow(false);
      console.warn(isShow)
    }

    return () => {
      onProgress = false;
    };
  }, []);

  const [listReminder, setListReminder] = useState([]);
  const [open, setOpen] = useState(false);
  const [nome, setNome] = useState("");
  const [date, setDate] = useState("");
  const [visible, SetVisible] = useState(false);
  const [isShow, setIsShow] = useState(true);



  const route = useRoute();

  const id = route.params;

  const closeModal = async () => {
    setDate("");
    setNome("");
    SetVisible(false);
    setOpen(false);
  };

  const changeShow = async () => {
    setIsShow(!isShow);
  }

  async function listReminders() {
    await api("/Lembretes/Meus/" + id)
      .then((response) => {
        if (response.status === 200) {
          setListReminder(response.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const createReminder = async () => {
    await api
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
    <View style={styles.background}>
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
          <TouchableOpacity style={styles.btn_criar} onPress={createReminder} onPressIn={async () => {
          await interativePushNotification();
        }}>
            <Text style={{fontFamily: "Regular", fontSize: 16, color: "#FFFFFF",}}>
              Criar
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
        <View style={styles.container_not}>
          {listReminder.map((item) => {
            return (
              <View key={item.idLembrete}>
                <Text style={styles.hora}>
                  {moment(item.horario).format("LT")}
                </Text>
              </View>
            );
          })}
        </View>
      )}
    </View>
  );
}

async function interativePushNotification() {

  await Notifications.setNotificationCategoryAsync('teste', [
    {
      buttonTitle: "CLICA AQUI KRL",
    }
  ]
  ),

    await Notifications.scheduleNotificationAsync({
      content: {
        categoryIdentifier: "teste",

        title: "Ei você! 📬",
        body: 'Você ja treinou Hoje?',
        // data: { data: 'goes here' },
      },
      trigger: {
        minute: 36,
        repeats: true,
      },
    });
}

async function registerForPushNotificationsAsync() {
  let token;
  if (Constants.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;
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
    width: 270,
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


