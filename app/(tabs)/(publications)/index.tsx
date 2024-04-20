import React from 'react';
import { Text, View, StyleSheet, TextInput, StatusBar } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; 
import TraditionsTab from '@/app/(tabs)/(publications)/body/TraditionsTab';

export default function TraditionsScreen() {
  const [searchText, setSearchText] = React.useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Traditions</Text>

      {/* Search field
      <View style={styles.searchContainer}>
        <MaterialIcons name="search" size={24} color="#333" style={styles.searchIcon} />
        <TextInput
          style={styles.input}
          placeholder="Search"
          placeholderTextColor="#999"
          onChangeText={(text) => setSearchText(text)}
          value={searchText}
        />
      </View> */} 
      
      <TraditionsTab></TraditionsTab>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    marginHorizontal: 18,
  },
  searchContainer: {
    flexDirection: 'row', 
    alignItems: 'center', 
    height: 50,
    backgroundColor: 'rgba(151, 151, 151, 0.1)', 
    borderRadius: 15,
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  searchIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    color: '#333',
    fontSize: 16,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});
