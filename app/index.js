import { StyleSheet } from 'react-native';
import { Text, View } from '../components/Themed';
import usePostStore from '../store/PostStore';
import { useEffect } from 'react';
import { Link } from 'expo-router';

export default function HomeScreen() {
  const { categories, getCategories } = usePostStore();
  useEffect(() => {
    getCategories();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Categories</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      {categories.map((category) => (
        <Link style={styles.link} key={category.id} href={`category/${category.id}/1`}>{category.name}</Link>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  link: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
    color: 'white'
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
