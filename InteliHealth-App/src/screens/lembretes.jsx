import { StatusBar } from 'expo-status-bar';
import { render } from 'react-dom';
import { StyleSheet, Text, View, ImageBackground, Image, TouchableOpacity, TextInput, Button, Platform } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import Modal from 'react-native-modal';
import AppLoading from 'expo-app-loading';
import { useNavigation } from '@react-navigation/core';
import DateTimePicker from '@react-native-community/datetimepicker'
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
    Poppins_900Black_Italic
} from '@expo-google-fonts/poppins'
import { useState } from 'react';
import { set, setWith } from 'lodash';

function home() {
    navigation.navigate('Home')
}


export default function Resumo() {

    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [text, setText] = useState('Empty');

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);

        let tempDate = new Date(currentDate);
        let fDate = tempDate.getDate() + '/' + (tempDate.getMonth() +1) + '/' + tempDate.getFullYear();
        let fTime = tempDate.getHours() + ':' + tempDate.getMinutes();
        setText(fTime)

        console.log(fDate + '(' + fTime +')')
    }

    const showMode = (currentMode) => {
        setShow(true);        
        setMode(currentMode);
    }

    const navigation = useNavigation();


    const [visible, SetVisible] = useState(false);

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
        navigation.navigate('Home')
    }
    return (
        < View
            style={styles.background}>

            < View style={styles.header} >
                <Image
                    onPress={home}
                    source={require('../../assets/logo-pessoa-menor.png')}
                    style={styles.logo_header} />
            </View >


            <View>
                <TouchableOpacity
                    onPress={home}
                    style={styles.buttonsetaStyle}
                    activeOpacity={0.5}>
                    <Image
                        source={require('../../assets/seta.png')}
                        style={styles.seta}
                    />
                </TouchableOpacity>

            </View>

            <View style={styles.container_dados}>
                <View style={styles.nome}><Text style={{ fontFamily: 'Bold', color: '#FFFFFF', fontSize: 20, }}  >Treino Diário - 20:00 </Text>
                    <Modal isVisible={visible}
                        onBackdropPress={() => { SetVisible(false) }}>
                        <View style={styles.backgroundModal}>
                            <View style={styles.container_dadosModal}>
                                <TextInput style={styles.lembrete}> Treino Diário - </TextInput>
                            </View>

                            <View style={styles.container_dadosModal}>
                                <TouchableOpacity onPress={() => showMode('time')} style={styles.lembrete}><Text>{text}</Text></TouchableOpacity>
                            </View>

                            <TouchableOpacity
                                style={styles.btnLogin}>
                                <Text style={{
                                    fontFamily: 'Regular', fontSize: 18,
                                    color: '#FFFFFF'
                                }}>Atualizar</Text>
                            </TouchableOpacity>
                        
                        {show && (
                            <DateTimePicker
                            testID = 'dateTimePicker'
                            value={date}
                            mode={mode}
                            is24Hour={true}
                            display='default'
                            onChange={onChange}
                            
                            
                            />
                        )}
                        </View>

                    </Modal>
                    <TouchableOpacity onPress={() => { SetVisible(true) }}>
                        <FontAwesome style={styles.engrenagem} name="gear" size={25} color="white" />
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.container_dados1}>
                <TouchableOpacity onPress={() => { SetVisible(false) }}>
                    <MaterialIcons style={styles.nome1}  name="add" size={35} color="black" />
                </TouchableOpacity>
            </View>
        </View >

    );
}

const styles = StyleSheet.create({

    background: {
        flex: 1,
        backgroundColor: '#3F3F3F',
        width: '100%',
        height: 48,

    },

    logo_header: {

        height: 25,
        marginLeft: 305,
        marginTop: 15,
    },

    header: {
        backgroundColor: '#000',
        width: '100%',
        height: 50,
    },


    head: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 15,

    },

    container: {
        flexDirection: 'row'
    },

    seta: {
        marginLeft: 45,
        height: 15,
        width: 23,
        marginTop: 15,

    },

    container_dados: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
        color: '#FFFF',
    },

    nome: {
        color: '#FFFF',
        borderColor: '#FC791C',
        width: 270,
        height: 70,
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',

        backgroundColor: 'transparent',
        borderWidth: 2,
        borderRadius: 10,
        // shadowOffset: { height: 1, width: 1 },
    },

    container_dados1: {
        color: '#FFFF',
        borderColor: '#FC791C',
        width: 270,
        height: 70,
        marginTop: 40,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        backgroundColor: 'transparent',
        borderWidth: 2,
        borderRadius: 10,
    },

    nome1: {
        color: "#FC791C",

    },

    engrenagem: {

    },

    backgroundModal: {
        backgroundColor: '#3F3F3F',
        width: 300,
        height: 250,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 15,
        borderRadius: 20,
    },


    lembrete: {
        color: '#FFFF',
        borderColor: '#FC791C',
        width: 250,
        height: 70,
        backgroundColor: 'transparent',

        borderBottomWidth: 1,
    },

    btnLogin: {
        marginTop: 25,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
        width: 130,
        backgroundColor: 'transparent',
        borderColor: '#FC7B20',
        borderWidth: 1,
        borderRadius: 50,
    },
})
