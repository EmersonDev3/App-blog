
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, Image } from 'react-native';

const PhotoGridScreen = ({ route }) => {
    const { albumId } = route.params; 
    const [photos, setPhotos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPhotos = async () => {
            try {
                const response = await fetch(`https://jsonplaceholder.typicode.com/photos?albumId=${albumId}`);
                const data = await response.json();
                setPhotos(data);
            } catch (error) {
                console.error('Error fetching photos:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPhotos();
    }, [albumId]);

    const renderPhoto = ({ item }) => (
        <View style={styles.photoContainer}>
            <Image source={{ uri: item.thumbnailUrl }} style={styles.photo} />
            <Text style={styles.photoTitle}>{item.title}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            {loading ? (
                <ActivityIndicator size="large" color="#4C9F70" style={styles.loader} />
            ) : (
                <FlatList
                    data={photos}
                    renderItem={renderPhoto}
                    keyExtractor={item => item.id.toString()}
                    numColumns={3} 
                    contentContainerStyle={styles.listContainer}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#f0f0f0',
    },
    loader: {
        flex: 1,
        justifyContent: 'center',
    },
    listContainer: {
        paddingBottom: 20,
    },
    photoContainer: {
        flex: 1,
        margin: 5,
        borderRadius: 10,
        backgroundColor: '#fff',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        alignItems: 'center',
    },
    photo: {
        width: '100%',
        height: 100,
        borderRadius: 10,
    },
    photoTitle: {
        padding: 5,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default PhotoGridScreen;
