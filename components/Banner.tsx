import { StyleSheet, Text, View, TouchableOpacity, Linking } from 'react-native';
import React from 'react';

export default function Banner() {
	const handlePress = () => {
		Linking.openURL('https://www.youtube.com/@TheStrongRope');
	};
	return (
		<View style={styles.banner}>
			<Text style={styles.bannerText}>
				The quiz will be telecast live from{' '}
				<TouchableOpacity onPress={handlePress}>
					<Text style={{ color: 'blue' }}>our YouTube channel</Text>
				</TouchableOpacity> on 19th Feb to 1st Mar 2024 at 9:30 PM IST
			</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	banner: {
		width: '100%',
		minHeight: 50,
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'row',
		backgroundColor: 'lightgray',
		marginBottom: 12
	},
	bannerText: {
		fontSize: 14,
		color: 'black',
		fontWeight: 'normal',
		margin: 10
	}
});
