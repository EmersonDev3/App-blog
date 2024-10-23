// screens/AlbumScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'; 

const AlbumScreen = () => {
    const [albuns, setAlbuns] = useState([]);
    const [carregando, setCarregando] = useState(true);
    const [contagemVisivel, setContagemVisivel] = useState(5);
    const navigation = useNavigation(); 

    useEffect(() => {
        const buscarAlbuns = async () => {
            try {
                const resposta = await fetch('https://jsonplaceholder.typicode.com/albums');
                const dados = await resposta.json();
                setAlbuns(dados.slice(0, 100));
            } catch (erro) {
                console.error('Erro ao buscar álbuns:', erro);
            } finally {
                setCarregando(false);
            }
        };

        buscarAlbuns();
    }, []);

    const carregarMaisAlbuns = () => {
        setContagemVisivel(prevCount => prevCount + 5);
    };

    const renderizarAlbum = ({ item }) => (
        <TouchableOpacity 
            style={estilos.containerAlbum} 
            onPress={() => navigation.navigate('PhotoGridScreen', { albumId: item.id })} 
        >
            <Text style={estilos.tituloAlbum}>{item.title}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={estilos.container}>
            {carregando ? (
                <ActivityIndicator size="large" color="#4C9F70" style={estilos.loader} />
            ) : (
                <>
                    <FlatList
                        data={albuns.slice(0, contagemVisivel)}
                        renderItem={renderizarAlbum}
                        keyExtractor={item => item.id.toString()}
                        contentContainerStyle={estilos.containerLista}
                    />
                    {contagemVisivel < albuns.length && (
                        <TouchableOpacity style={estilos.botaoCarregarMais} onPress={carregarMaisAlbuns}>
                            <Text style={estilos.textoCarregarMais}>Carregar mais 5 álbuns</Text>
                        </TouchableOpacity>
                    )}
                </>
            )}
        </View>
    );
};

const estilos = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#f0f0f0',
    },
    loader: {
        flex: 1,
        justifyContent: 'center',
    },
    containerLista: {
        paddingBottom: 20,
    },
    containerAlbum: {
        padding: 15,
        marginVertical: 5,
        borderRadius: 10,
        backgroundColor: '#fff',
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
    },
    tituloAlbum: {
        fontWeight: 'bold',
        color: '#333',
    },
    botaoCarregarMais: {
        backgroundColor: '#4C9F70',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginVertical: 10,
    },
    textoCarregarMais: {
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default AlbumScreen;
