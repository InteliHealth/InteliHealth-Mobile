import { StatusBar } from 'expo-status-bar';
import { render } from 'react-dom';
import { StyleSheet, Text, View, ImageBackground, Image, TouchableOpacity, TextInput, Button } from 'react-native';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
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
import { Button } from 'react-native-web';

export default function Perfil() {
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
    return (
        <View
            style={styles.background}>

            <View style={styles.header}>
                <Image
                    source={require('../../assets/logo-pessoa-menor.png')}
                    style={styles.logo_header} />
            </View>

            <View style={styles.container}>
                <TouchableOpacity
                    style={styles.buttonsetaStyle}
                    activeOpacity={0.5}>
                    <Image
                        source={require('../../assets/seta.png')}
                        style={styles.seta}
                    />
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.buttonCompartilharStyle}
                    activeOpacity={0.5}>
                    <Image
                        source={require('../../assets/Compartilhar.png')}
                        style={styles.compartilhar}
                    />
                </TouchableOpacity>



            </View>

            <View style={styles.container_pessoa}>
                <Button>
                    <Image
                        source={require('../../assets/pessoa.png')}
                        style={styles.logo_pessoa}
                    />
                </Button>


            </View>

            <View style={styles.container_dados}>
                <TextInput style={styles.nome}><Text style={{ fontFamily: 'Black' }}>Nome:</Text> Nome Próprio</TextInput>

                <TouchableOpacity>
                    <Image
                        source={require('../../assets/lapis.png')}
                        style={styles.lapis}
                    />
                </TouchableOpacity>

            </View>

            <View style={styles.container_dados1}>
                <TextInput style={styles.nome}><Text style={{ fontFamily: 'Black' }}>Altura:</Text> 1,80 m</TextInput>
                <TouchableOpacity>
                    <Image
                        source={require('../../assets/lapis.png')}
                        style={styles.lapis}
                    />
                </TouchableOpacity>

            </View>

            <View style={styles.container_dados1}>
                <TextInput style={styles.nome}><Text style={{ fontFamily: 'Black' }}>Peso:</Text> 79 kg</TextInput>
                <TouchableOpacity>
                    <Image
                        source={require('../../assets/lapis.png')}
                        style={styles.lapis}
                    />
                </TouchableOpacity>


            </View>

            <View style={styles.container_dados}>
                <TextInput style={styles.nome}><Text style={{ fontFamily: 'Black' }}>Tipo Sanguíneo:</Text> O+</TextInput>
                <TouchableOpacity>
                    <Image
                        source={require('../../assets/lapis.png')}
                        style={styles.lapis}
                    />
                </TouchableOpacity>

            </View>

            <TouchableOpacity
                style={styles.btnLogin}>
                <Text style={{
                    fontFamily: 'Regular', fontSize: 18,
                    color: '#FFFFFF'
                }}>Sair</Text>
            </TouchableOpacity>


            <View style={styles.container_detalhe}>
                <Image
                    source={require('../../assets/detalhe.png')}
                    style={styles.logo_detalhe}
                />
            </View>




        </View >
    );

}

const styles = StyleSheet.create({

    background: {
        flex: 1,
        backgroundColor: '#393939',
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
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30,
    },

    logo_pessoa: {
        height: 120,
        width: 120,

    },

    container_dados: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
        border: '#FC791C',
        // border: 1px solid #FC791C;


    },

    container_dados1: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 25,


    },
    container_dados: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30,


    },

    nome: {
        color: '#ffffff',
        borderBottomColor: '#FC791C',
        borderBottomWidth: 1,
        width: 223,
        marginTop: 10,

    },

    lapis: {
        height: 21,
        width: 21,

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
        shadowOffset: { height: 1, width: 1 },
        marginLeft: 120,
    },

    logo_detalhe: {
        width: 300,
        height: 100,
        justifyContent: 'flex-start',
        alignSelf: 'center',
        marginLeft: 25,
        marginTop: 15,
        // marginBottom: 100,

    }

})
