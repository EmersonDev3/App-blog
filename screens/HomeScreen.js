// screens/HomeScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // Certifique-se de ter instalado react-native-vector-icons

const HomeScreen = () => {
    const [posts, setPosts] = useState([]);
    const [visiblePosts, setVisiblePosts] = useState(5); // Controla quantos posts estão visíveis de cada vez
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                setLoading(true);
                const response = await fetch('https://jsonplaceholder.typicode.com/posts');
                const data = await response.json();
                const formattedPosts = data.map(post => ({
                    id: post.id,
                    title: post.title,
                    body: post.body,
                    tag: 'General', // Tag padrão
                    user: {
                        name: 'User', // Nome fictício
                        time: 'Just now', // Tempo fictício
                    },
                }));
                setPosts(formattedPosts);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching posts:', error);
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    // Função para carregar mais 5 posts
    const loadMorePosts = () => {
        setVisiblePosts((prevVisiblePosts) => prevVisiblePosts + 5);
    };

    const renderCard = ({ item }) => (
        <TouchableOpacity style={styles.card} activeOpacity={0.8}>
            <View style={styles.cardBody}>
                <Text style={[styles.tag, styles[`tag${item.tag}`]]}>{item.tag}</Text>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text style={styles.cardBodyText}>{item.body}</Text>
            </View>
            <View style={styles.cardFooter}>
                <View style={styles.user}>
                    <View style={styles.userInfo}>
                        <Text style={styles.userName}>{item.user.name}</Text>
                        <Text style={styles.userTime}>{item.user.time}</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );

    const renderFooter = () => {
        // Renderiza o botão "Abrir mais" apenas se houver mais posts a carregar
        if (visiblePosts < posts.length) {
            return (
                <TouchableOpacity style={styles.loadMoreButton} onPress={loadMorePosts}>
                    <Icon name="arrow-down-circle-outline" size={20} color="#FFFFFF" style={styles.icon} />
                    <Text style={styles.loadMoreText}>Abrir mais</Text>
                </TouchableOpacity>
            );
        }
        return null; // Não renderiza nada se não houver mais posts
    };

    return (
        <View style={styles.container}>
            {loading ? (
                <ActivityIndicator size="large" color="#4C9F70" />
            ) : (
                <FlatList
                    data={posts.slice(0, visiblePosts)} // Renderiza os posts visíveis
                    renderItem={renderCard}
                    keyExtractor={(item) => item.id.toString()}
                    contentContainerStyle={styles.listContainer}
                    ListFooterComponent={renderFooter} // Adiciona o botão "Abrir mais" como último item da lista
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F0F4F8',
        padding: 20,
    },
    listContainer: {
        paddingBottom: 20,
    },
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 15,
        marginBottom: 20,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
    },
    cardBody: {
        padding: 20,
    },
    cardTitle: {
        fontSize: 20,
        fontWeight: '700',
        marginBottom: 8,
        color: '#333',
    },
    cardBodyText: {
        color: '#555',
        fontSize: 16,
        lineHeight: 22,
    },
    cardFooter: {
        padding: 15,
        borderTopWidth: 1,
        borderTopColor: '#E5E5E5',
        backgroundColor: '#F7F8FA',
    },
    user: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    userInfo: {
        marginLeft: 10,
    },
    userName: {
        fontWeight: '600',
        fontSize: 16,
        color: '#333',
    },
    userTime: {
        color: '#888',
        fontSize: 14,
    },
    tag: {
        alignSelf: 'flex-start',
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 20,
        fontSize: 14,
        color: '#fff',
        marginBottom: 12,
    },
    tagGeneral: {
        backgroundColor: '#4C9F70',
    },
    loadMoreButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#4C9F70',
        paddingVertical: 12,
        borderRadius: 25,
        marginTop: 10,
    },
    loadMoreText: {
        color: '#FFFFFF',
        fontSize: 16,
        marginLeft: 8,
    },
    icon: {
        marginRight: 8,
    },
});

export default HomeScreen;
