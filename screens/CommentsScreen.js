// screens/CommentsScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const CommentsScreen = () => {
    const [comentarios, setComentarios] = useState([]);
    const [comentariosVisiveis, setComentariosVisiveis] = useState(5);
    const [carregando, setCarregando] = useState(false);

    useEffect(() => {
        const buscarComentarios = async () => {
            try {
                setCarregando(true);
                const resposta = await fetch('https://jsonplaceholder.typicode.com/comments');
                const dados = await resposta.json();
                setComentarios(dados);
                setCarregando(false);
            } catch (erro) {
                console.error('Erro ao buscar comentários:', erro);
                setCarregando(false);
            }
        };

        buscarComentarios();
    }, []);

    const carregarMaisComentarios = () => {
        setComentariosVisiveis((prevComentariosVisiveis) => prevComentariosVisiveis + 5);
    };

    const renderizarComentario = ({ item }) => (
        <TouchableOpacity style={estilos.cartaoComentario} activeOpacity={0.8}>
            <Image
                style={estilos.avatar}
                source={{ uri: `https://i.pravatar.cc/150?u=${item.email}` }} 
            />
            <View style={estilos.corpoComentario}>
                <Text style={estilos.nomeComentario}>{item.name}</Text>
                <Text style={estilos.emailComentario}>{item.email}</Text>
                <Text style={estilos.textoComentario}>{item.body}</Text>
            </View>
        </TouchableOpacity>
    );

    const renderizarRodape = () => {
        if (comentariosVisiveis < comentarios.length) {
            return (
                <TouchableOpacity style={estilos.botaoCarregarMais} onPress={carregarMaisComentarios}>
                    <Icon name="arrow-down-circle-outline" size={20} color="#FFFFFF" style={estilos.icone} />
                    <Text style={estilos.textoCarregarMais}>Carregar mais</Text>
                </TouchableOpacity>
            );
        }
        return null;
    };

    return (
        <View style={estilos.container}>
            {carregando ? (
                <ActivityIndicator size="large" color="#4C9F70" />
            ) : (
                <FlatList
                    data={comentarios.slice(0, comentariosVisiveis)}
                    renderItem={renderizarComentario}
                    keyExtractor={(item) => item.id.toString()}
                    contentContainerStyle={estilos.containerLista}
                    ListFooterComponent={renderizarRodape}
                />
            )}
        </View>
    );
};

const estilos = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F0F4F8',
        padding: 20,
        paddingTop: 40, 
    },
    containerLista: {
        paddingBottom: 20,
    },
    cartaoComentario: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        marginBottom: 15,
        padding: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 10,
        elevation: 4,
        borderWidth: 1,
        borderColor: '#E0E0E0', 
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 15,
        borderWidth: 2,
        borderColor: '#4C9F70', 
    },
    corpoComentario: {
        flex: 1,
    },
    nomeComentario: {
        fontWeight: '700',
        fontSize: 18,
        color: '#333',
    },
    emailComentario: {
        fontSize: 14,
        color: '#4C9F70', 
        marginBottom: 5,
    },
    textoComentario: {
        fontSize: 15,
        color: '#333',
        lineHeight: 20,
        marginTop: 3,
    },
    botaoCarregarMais: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#4C9F70',
        paddingVertical: 12,
        borderRadius: 25,
        marginTop: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 10,
        elevation: 3,
    },
    textoCarregarMais: {
        color: '#FFFFFF',
        fontSize: 16,
        marginLeft: 8,
    },
    icone: {
        marginRight: 8,
    },
});

export default CommentsScreen;
