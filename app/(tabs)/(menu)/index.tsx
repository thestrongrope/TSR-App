import { Text, View, StyleSheet } from 'react-native';

export default function MenuScreen() {
    return (
      <View style={styles.container}>
          <Text style={styles.title}>Search</Text>
      </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
    },
    link: {
      fontSize: 20,
      fontWeight: 'bold',
      marginVertical: 10,
    },
    categoryTitle: {
      backgroundColor: 'red',
      width: '100%',
      height: 50,
      justifyContent: 'space-between',
      alignItems: 'center',
      flexDirection: 'row',
    },
    categoryTitleText: {
      fontSize: 20,
      fontWeight: 'bold',
    },
    youTubeImage: {
      width: "100%", // Full width
      height: 200, // Fixed height, you can adjust this
      resizeMode: "cover", // Cover the whole area without stretching
    },
    separator: {
      marginVertical: 30,
      height: 1,
      width: '80%',
    },
  });
  