import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { getUrl } from '../utils/api';
import { removecartID } from '../utils/storage';

const OrderScreen = ({ navigation }) => {
    const [ShipAddress, setShipAddress] = useState('');
    const [ShipCity, setShipCity] = useState('');
    const [ShipPostalCode, setShipPostalCode] = useState('');
    const [ShipCountry, setShipCountry] = useState('');

    const baseURL = getUrl(); // Get the base URL

    const handleSubmit = async () => {
        try {
            const CustID = await AsyncStorage.getItem('CustID');
            const token = await AsyncStorage.getItem('token');

            const getAuthHeader = () => ({
                headers: { token: `${token}` },
            });

            const orderData = {
                ShipAddress,
                ShipCity,
                ShipPostalCode,
                ShipCountry,
            };

            // Post the order data
            await axios.post(`${baseURL}/customer/orders/addorder/${CustID}`, orderData, getAuthHeader());

            // Fetch the last order that has been added for the customer
            const lastOrderResponse = await axios.get(`${baseURL}/customer/orders/lastorder/${CustID}`, getAuthHeader());
            const lastOrder = lastOrderResponse.data;

            if (lastOrder.length > 0) {
                const OrderID = lastOrder[0].OrderID;
                await AsyncStorage.setItem('OrderId', String(OrderID));

                const cartId = AsyncStorage.getItem('cartID');

                // Copy order items
                await axios.post(`${baseURL}/customer/orderdetails/copyorderitem/${OrderID}/${CustID}`, {}, getAuthHeader());

                // Fetch cart items and reduce inventory
                const finalCartItems = await axios.get(`${baseURL}/customer/cartitems/all/${CustID}`, getAuthHeader());
                const cartItems = finalCartItems.data;

                for (const item of cartItems) {
                    const productID = item.ProductID;
                    await axios.put(`${baseURL}/customer/reduce/product/${productID}`, null, getAuthHeader());
                }

                await axios.delete(`${baseURL}/customer/cartitems/delete/${cartId}`, getAuthHeader());

                await axios.delete(`${baseURL}/customer/cart/${cartId}`, getAuthHeader());

                removecartID();

                navigation.navigate('BillSuccess');
            }
        } catch (error) {
            console.error('Error placing order:', error);
            Alert.alert('Error', 'Failed to place order');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Order Details</Text>
            <TextInput
                style={styles.input}
                placeholder="Shipping Address"
                value={ShipAddress}
                onChangeText={setShipAddress}
                required
            />
            <TextInput
                style={styles.input}
                placeholder="City"
                value={ShipCity}
                onChangeText={setShipCity}
                required
            />
            <TextInput
                style={styles.input}
                placeholder="Postal Code"
                value={ShipPostalCode}
                onChangeText={setShipPostalCode}
                required
            />
            <TextInput
                style={styles.input}
                placeholder="Country"
                value={ShipCountry}
                onChangeText={setShipCountry}
                required
            />
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Place Order</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#f5f5f5', // Light background for a clean look
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        marginBottom: 30,
        textAlign: 'center',
        color: '#333', // Darker text for contrast
    },
    input: {
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 15,
        marginBottom: 20,
        fontSize: 16,
        backgroundColor: '#fff', // White background for input fields
    },
    button: {
        backgroundColor: '#4caf50',
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '600',
    },
});

export default OrderScreen;
