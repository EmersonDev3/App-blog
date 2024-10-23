import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const MenuScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Home')}>
                <View style={styles.cardBody}>
                    <Icon name="post-add" size={40} color="#4CAF50" style={styles.icon} />
                    <Text style={styles.cardTitle}>Ver Posts</Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Comments')}>
                <View style={styles.cardBody}>
                    <Icon name="comment" size={40} color="#4CAF50" style={styles.icon} />
                    <Text style={styles.cardTitle}>Ver Comentários</Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.card} onPress={() => alert('Ver Fotos')}>
                <View style={styles.cardBody}>
                    <Icon name="photo" size={40} color="#4CAF50" style={styles.icon} />
                    <Text style={styles.cardTitle}>Ver Fotos</Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.card} onPress={() => alert('Ver Álbuns de Fotos')}>
                <View style={styles.cardBody}>
                    <Icon name="photo-album" size={40} color="#4CAF50" style={styles.icon} />
                    <Text style={styles.cardTitle}>Ver Álbuns de Fotos</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F0F4F8',
        padding: 20,
        justifyContent: 'center',
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
        alignItems: 'center',
    },
    cardBody: {
        padding: 20,
        alignItems: 'center',
    },
    cardTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: '#333',
        textAlign: 'center',
        marginTop: 10,
    },
    icon: {},
});

export default MenuScreen;
