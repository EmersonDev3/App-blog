// screens/PhotoScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, Image, ImageBackground, TouchableOpacity } from 'react-native';

const PhotoScreen = () => {
    const [photos, setPhotos] = useState([]);
    const [loading, setLoading] = useState(true); // Inicializando como true
    const [visibleCount, setVisibleCount] = useState(5); // Contador para o número de fotos visíveis

    useEffect(() => {
        const fetchPhotos = async () => {
            try {
                const response = await fetch('https://jsonplaceholder.typicode.com/photos');
                const data = await response.json();
                setPhotos(data); // Armazena todas as fotos
            } catch (error) {
                console.error('Error fetching photos:', error);
            } finally {
                setLoading(false); // Define loading como false após tentar buscar as fotos
            }
        };

        fetchPhotos();
    }, []); // Executa apenas uma vez na montagem do componente

    const loadMorePhotos = () => {
        setVisibleCount(prevCount => prevCount + 5); // Adiciona 5 mais fotos
    };

    const renderPhoto = ({ item }) => (
        <View style={styles.photoContainer}>
            <Image source={{ uri: item.url }} style={styles.photo} resizeMode="cover" />
            <Text style={styles.photoTitle}>{item.title}</Text>
        </View>
    );

    return (
        <ImageBackground
            source={{ uri: 'https://your-image-url.com/background.jpg' }} // Insira a URL da imagem de fundo
            style={styles.container}
            imageStyle={styles.backgroundImage}
        >
            {loading ? (
                <ActivityIndicator size="large" color="#4C9F70" style={styles.loader} />
            ) : (
                <>
                    <FlatList
                        data={photos.slice(0, visibleCount)} 
                        renderItem={renderPhoto}
                        keyExtractor={item => item.id.toString()}
                        numColumns={2}
                        contentContainerStyle={styles.listContainer}
                    />
                    {visibleCount < photos.length && ( 
                        <TouchableOpacity style={styles.loadMoreButton} onPress={loadMorePhotos}>
                            <Text style={styles.loadMoreText}>Carregar mais 5 fotos</Text>
                        </TouchableOpacity>
                    )}
                </>
            )}
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    backgroundImage: {
        opacity: 0.8,
    },
    loader: {
        flex: 1,
        justifyContent: 'center',
    },
    listContainer: {
        padding: 10,
    },
    photoContainer: {
        flex: 1,
        margin: 5,
        borderRadius: 10,
        overflow: 'hidden',
        backgroundColor: '#fff',
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
    },
    photo: {
        width: '100%',
        height: 150, 
    },
    photoTitle: {
        padding: 10,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center', 
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        borderTopWidth: 1,
        borderTopColor: '#ccc',
    },
    loadMoreButton: {
        backgroundColor: '#4C9F70',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginVertical: 10,
        marginHorizontal: 20,
    },
    loadMoreText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default PhotoScreen;
