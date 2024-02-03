import { Link, Stack } from "expo-router";
import { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Button,
  Pressable,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import usePostStore from "../../../store/PostStore";

export default function SearchScreen() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searching, setSearching] = useState<boolean>(false);
  const { loading, posts, searchPosts } = usePostStore();

  const handleInput = (text: string) => {
    setSearchTerm(text);
  };

  const handleSearch = async () => {
    console.log(searchTerm);
    setSearching(true);
    await searchPosts(searchTerm, 1);
    setSearching(false);
  };

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>Search</Text>

        <View style={{ flexDirection: "row" }}>
          <TextInput
            style={styles.searchInput}
            value={searchTerm}
            onChangeText={handleInput}
          />
          <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
            <Text style={{ color: "white" }}>Search</Text>
          </TouchableOpacity>
        </View>

        {(loading && searching) && <Text>Searching...</Text>}

        <ScrollView>
          {posts.map((post: any) => (
            <View style={styles.searchResults} key={post.id}>
              <Link
                  href={`/searchpost/${post.id}`}
                  key={post.id}
                >
                <Text>{post.title.rendered}</Text>
              </Link>
            </View>
          ))}
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  link: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 10,
  },
  categoryTitle: {
    backgroundColor: "red",
    width: "100%",
    height: 50,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  categoryTitleText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  youTubeImage: {
    width: "100%", // Full width
    height: 200, // Fixed height, you can adjust this
    resizeMode: "cover", // Cover the whole area without stretching
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  searchInput: {
    height: 40,
    margin: 12,
    width: "80%",
    borderWidth: 1,
    padding: 10,
  },
  searchButton: {
    backgroundColor: "blue",
    color: "white",
    padding: 10,
    margin: 12,
    height: 40,
    width: "20%",
    alignItems: "center",
    justifyContent: "center",
  },
  searchResults: {
    width: "100%",
    padding: 10,
    fontSize: 24,
    margin: 5,
    backgroundColor: "lightgray",
  }
});
