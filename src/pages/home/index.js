import React, { useState, useEffect } from "react";
import { View, Button } from 'react-native';
import { FlatList, StyleSheet, Text, TouchableOpacity } from "react-native";
import api from "../../services/service";
import { Header, } from 'react-native-elements';

const Item = ({ item, onPress, style }) => (
    <TouchableOpacity onPress={onPress} style={[styles.item, style]}>
        <Text style={styles.title}>{item.cpf} - {item.nome}</Text>
    </TouchableOpacity>
);

export default function Home({ route, navigation }) {
    const [selectedId, setSelectedId] = useState(null);
    const [clients, setClients] = useState([]);

    useEffect(() => {

        async function getClients() {
            try {
                await api
                    .get("clientes", {
                        params: {}
                    })
                    .then(item => {
                        setClients(item.data);
                    });
            } catch (error) {
                console.log(error);
            }
        }
        getClients();
    });


    const setSelected = function(item) {
        console.log(item);
        if (item) {
            setSelectedId(item.id);
            navigation.navigate('Save', {
                nome: item.nome,
                telefone: item.telefone,
                cpf: item.cpf,
                email: item.email,
                datacadastro: item.datacadastro,
                id: item.id,
                alterar: true
            })
        }
    }



    const renderItem = ({ item }) => {
        const backgroundColor = item.id === selectedId ? "#5F9EA0" : "#F8F8FF";

        return (
            <Item
                item={item}
                onPress={() => setSelected(item)}
                style={{ backgroundColor }}
            />
        );
    };

    return (
        <View>
            <Header
                centerComponent={{ text: 'Home - FATEC ITU', style: { color: '#fff', fontSize: 20 } }}
                rightComponent={<Button color="#fff" title="+" onPress={() => navigation.navigate('Save', { save: true })}></Button>}
                backgroundColor="#5F9EA0"
            />

            <FlatList
                data={clients}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                extraData={selectedId}
            />
        </View>
    );
};

const styles = StyleSheet.create({

    item: {
        padding: 20,
        marginVertical: 2,
        marginHorizontal: 2,
    },
    title: {
        fontSize: 18,
    },
});