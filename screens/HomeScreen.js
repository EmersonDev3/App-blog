import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator, Image, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const CommentsScreen = () => {
    const [comments, setComments] = useState([]);
    const [visibleComments, setVisibleComments] = useState(5);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchComments = async () => {
            try {
                setLoading(true);
                const response = await fetch('https://jsonplaceholder.typicode.com/comments');
                if (!response.ok) throw new Error('Erro ao buscar comentários');
                const data = await response.json();
                setComments(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchComments();
    }, []);

    const loadMoreComments = () => {
        setVisibleComments((prev) => prev + 5);
    };

    const renderComment = ({ item }) => (
        <TouchableOpacity style={styles.commentCard} activeOpacity={0.8}>
            <Image
                style={styles.avatar}
                source={{ uri: `https://i.pravatar.cc/150?u=${item.email}` }} 
            />
            <View style={styles.commentBody}>
                <Text style={styles.commentName}>{item.name}</Text>
                <Text style={styles.commentEmail}>{item.email}</Text>
                <Text style={styles.commentBodyText}>{item.body}</Text>
            </View>
        </TouchableOpacity>
    );

    const renderFooter = () => {
        if (visibleComments < comments.length) {
            return (
                <TouchableOpacity style={styles.loadMoreButton} onPress={loadMoreComments}>
                    <Icon name="arrow-down-circle-outline" size={20} color="#FFFFFF" style={styles.icon} />
                    <Text style={styles.loadMoreText}>Carregar mais</Text>
                </TouchableOpacity>
            );
        }
        return null;
    };

    return (
        <View style={styles.container}>
            {loading ? (
                <ActivityIndicator size="large" color="#4C9F70" />
            ) : error ? (
                <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>{error}</Text>
                    <TouchableOpacity onPress={() => Alert.alert('Tente novamente')} style={styles.retryButton}>
                        <Text style={styles.retryText}>Tentar novamente</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <FlatList
                    data={comments.slice(0, visibleComments)}
                    renderItem={renderComment}
                    keyExtractor={(item) => item.id.toString()}
                    contentContainerStyle={styles.listContainer}
                    ListFooterComponent={renderFooter}
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
        paddingTop: 40, 
    },
    listContainer: {
        paddingBottom: 20,
    },
    commentCard: {
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
    commentBody: {
        flex: 1,
    },
    commentName: {
        fontWeight: '700',
        fontSize: 18,
        color: '#333',
    },
    commentEmail: {
        fontSize: 14,
        color: '#4C9F70', 
        marginBottom: 5,
    },
    commentBodyText: {
        fontSize: 15,
        color: '#333',
        lineHeight: 20,
        marginTop: 3,
    },
    loadMoreButton: {
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
    loadMoreText: {
        color: '#FFFFFF',
        fontSize: 16,
        marginLeft: 8,
    },
    icon: {
        marginRight: 8,
    },
    errorContainer: {
        padding: 20,
        alignItems: 'center',
    },
    errorText: {
        color: 'red',
        marginBottom: 10,
    },
    retryButton: {
        backgroundColor: '#4C9F70',
        padding: 10,
        borderRadius: 5,
    },
    retryText: {
        color: '#FFFFFF',
    },
});

export default CommentsScreen;
