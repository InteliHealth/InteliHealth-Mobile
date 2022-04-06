import React, { Component } from "react";
import {
    View,
    Modal,
    Text,
    TouchableOpacity,
    FlatList
} from 'react-native';
import styles from './styles';


const numColumns = 4;

import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";

const familyMap = {
    Ionicons,
    Entypo,
    AntDesign,
    FontAwesome5Icon,
};

class IconPicker extends Component {


    constructor(props) {
        super(props);
        this.state = {
            visible: false
        }
    }



    formatData = (data, numColumns) => {
        const numberOfFullRows = Math.floor(data.length / numColumns);

        let numberOfElementsLastRow = data.length - (numberOfFullRows * numColumns);
        while (numberOfElementsLastRow !== numColumns && numberOfElementsLastRow !== 0) {
            data.push({ key: `blank-${numberOfElementsLastRow}`, empty: true });
            numberOfElementsLastRow++;
        }

        return data;
    };

    onSelect = (item) => {
        this.setState({ visible: false });
        this.props.onSelect(item);
    }

    renderItem = ({ item, index }) => {
        if (item.empty === true) {
            return <View style={[styles.item, styles.itemInvisible]} />;
        }

        const Icon = familyMap[item.family];

        if (!Icon) return <View style={[styles.item, styles.itemInvisible]} />;

        return (
            <TouchableOpacity
                style={styles.item}
                onPress={() => this.onSelect(item)}
            >
                <Icon name={item.icon} size={30} color="#FE7B1D" />
            </TouchableOpacity>
        );

    };

    render() {

        const { visible } = this.state;
        const { icons } = this.props;
        const title = this.props.title ? this.props.title : 'Selecione seu Ícone...';

        const data = [];
        icons.map(i => {
            const family = i.family;
            i.icons.map(j => {
                const icon = {};
                icon.family = family;
                icon.icon = j;
                data.push(icon);
            })
        });

        return (
            <>
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={visible}
                    onRequestClose={() => {
                        this.setState({ visible: false })
                    }}>
                    <View style={styles.wrapper}>
                        <View style={styles.content}>
                            <Text style={styles.title}>{title}</Text>
                            <View>
                                <FlatList
                                    data={this.formatData(data, numColumns)}
                                    // style={styles.listContainer}
                                    renderItem={this.renderItem}
                                    numColumns={numColumns}
                                />
                            </View>
                        </View>
                    </View>
                </Modal>
                <TouchableOpacity style={styles.add_icon} onPress={() => this.setState({ visible: true })}>

                    <View style={styles.card}>
                        <Ionicons name="add" size={55} color="#FE7B1D" />
                    </View>
                    <Text style={{ fontFamily: 'Bold', fontSize: 17, textAlign: 'center', color: '#FE7B1D', marginTop: 15}}>Selecione um ícone</Text>
                </TouchableOpacity>
            </>
        );
    }
}



export default IconPicker;