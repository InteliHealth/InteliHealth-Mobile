import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ImageBackground, Image, TouchableOpacity, Link } from 'react-native';
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

export default function Topicos() {
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
            <Text></Text>
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
        height: 55,
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
    }

})