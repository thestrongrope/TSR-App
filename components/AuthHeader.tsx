import { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default function AuthHeader() {
    const [isAuth, setIsAuth] = useState(false);

	return (
		<View style={styles.authContainer}>{isAuth ? 
        (
        <>
        <View style={styles.welcomeContainer}>
        <Text style={styles.none}>LOGOUT</Text>
        <Text style={styles.name}>Welcome Mudassir Sayed</Text>  
        <TouchableOpacity style={styles.logoutButton}>
            <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
        </View>
        </>
        )
        :
        (
        <>
        <View style={styles.authenticate}>
            <TouchableOpacity>
            <Text style={styles.signin}>Register /</Text>
        </TouchableOpacity>
        <TouchableOpacity>
            <Text style={styles.signin}> Login</Text>
        </TouchableOpacity>
        </View>
            </>
            )}   
		</View>
	);
}

const styles = StyleSheet.create({
	authContainer: {
		minHeight: 25,
		marginBottom: 12,   
	},
    welcomeContainer:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
	name: {
		fontSize: 17,
		color: 'black',
        fontWeight: 'bold',		
	},
    none:{
        opacity: 0,
    },
    logoutButton: {
        backgroundColor: 'red',
		padding: 6,
		borderRadius: 2,
	},
	logoutText: {
		color: 'white',
		textAlign: 'center',
		fontWeight: 'bold',
        fontSize: 13
	},
    authenticate: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    signin: {
        fontSize: 16,
        color: 'blue',
    }	
});
