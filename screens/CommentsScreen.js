// screens/CommentsScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const CommentsScreen = () => {
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchComments = async () => {
            try {
                setLoading(true);
                const response = await fetch('https://jsonplaceholder.typicode.com/comments');
                const data = await response.json();
                setComments(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching comments:', error);
                setLoading(false);
            }
        };

        fetchComments();
    }, []);

    const renderComment = ({ item }) => (
        <TouchableOpacity style={styles.commentCard} activeOpacity={0.8}>
            <View style={styles.commentBody}>
                <Text style={styles.commentName}>{item.name}</Text>
                <Text style={styles.commentEmail}>{item.email}</Text>
                <Text style={styles.commentBodyText}>{item.body}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            {loading ? (
                <ActivityIndicator size="large" color="#4C9F70" />
            ) : (
                <FlatList
                    data={comments}
                    renderItem={renderComment}
                    keyExtractor={(item) => item.id.toString()}
                    contentContainerStyle={styles.listContainer}
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
    commentCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        marginBottom: 15,
        padding: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 2,
    },
    commentBody: {
        marginBottom: 10,
    },
    commentName: {
        fontWeight: '700',
        fontSize: 16,
        color: '#333',
    },
    commentEmail: {
        fontSize: 14,
        color: '#555',
    },
    commentBodyText: {
        fontSize: 14,
        color: '#333',
        marginTop: 5,
    },
});

export default CommentsScreen;
