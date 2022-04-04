import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TouchableOpacity, } from 'react-native';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
// import Icon from 'react-native-vector-icons';
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

export function Home() {
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
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image
                    source={require('../../assets/text-logo.png')}
                    style={styles.logo_header} />
                <TouchableOpacity>
                    <Image
                        source={require('../../assets/perf-button.png')}
                        style={styles.perfil} />
                </TouchableOpacity>
            </View>
            <View style={styles.banner}>
                <View>
                    <Text style={{
                        fontFamily: 'Bold',
                        fontSize: 18, color: '#FFFFFF',
                        marginLeft: 20,
                        marginTop: 10,
                    }}>Bem-<Text style={{ color: '#FE7B1D' }
                    }>Vindo,</Text>Nome</Text>
                    <Text style={{
                        fontFamily: 'Regular',
                        fontSize: 14, color: '#FFFFFF', width: 150,
                        height: 170, marginLeft: 20,
                        marginTop: 10,
                    }}>Comece por aqui a organizar seus<Text style={{ color: '#FE7B1D' }}> hábitos</Text> preparamos alguns para você começar</Text>
                </View>
                <Image
                    source={require('../../assets/bg-banner.png')}
                    style={{
                        width: 135,
                        height: 107,
                        alignSelf: 'flex-end'
                    }} />
            </View>
            <View style={styles.objetivos}>

                <TouchableOpacity  >
                    <View style={styles.card}>
                        <FontAwesome5 name="running" size={55} color="#FE7B1D" />
                    </View>
                    <Text style={{ fontFamily: 'Bold', fontSize: 16, textAlign: 'center', color: '#FE7B1D', marginTop: 5, }}>Exercícios</Text>
                </TouchableOpacity>

                <TouchableOpacity  >
                    <View style={styles.card}>
                        <MaterialCommunityIcons name="sleep" size={50} color="#FE7B1D" />
                    </View>

                    <Text style={{ fontFamily: 'Bold', fontSize: 16, textAlign: 'center', color: '#FE7B1D', marginTop: 5, }}>Sono</Text>
                </TouchableOpacity>

                <TouchableOpacity  >
                    <View style={styles.card}>
                        <FontAwesome5 name="briefcase-medical" size={45} color="#FE7B1D" />
                    </View>

                    <Text style={{ fontFamily: 'Bold', fontSize: 16, textAlign: 'center', color: '#FE7B1D', marginTop: 5, }}>Remédios</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#3F3F3F',
        alignItems: 'center',
        // justifyContent: 'center',
    },
    header: {
        width: '100%',
        height: 65,
        backgroundColor: '#292929',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
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
        backgroundColor: '#545454',
        borderWidth: 1,
        borderColor: '#FE7B1D',
        borderRadius: 20,
        marginTop: 50,
        flexDirection: 'row',
    },
    objetivos: {
        width: 340,
        marginTop: 30,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    card: {
        backgroundColor: '#393939',
        borderWidth: 1,
        borderColor: '#FE7B1D',
        width: 90,
        height: 90,
        borderRadius: 13,
        alignItems: 'center',
        justifyContent: 'center',
    },
})