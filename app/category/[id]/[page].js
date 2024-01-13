import { useLocalSearchParams, Link, Stack } from "expo-router";

import { View, Text, StyleSheet, Pressable } from "react-native";
import usePostStore from "../../../store/PostStore";
import { useEffect } from "react";

export default function Page() {
  const { id, page } = useLocalSearchParams();

  const {
    getCategory,
    getPosts,
    currentCategory,
    currentPage,
    posts,
    totalPages,
    totalPosts,
  } = usePostStore();

  useEffect(() => {
    getCategory(id);
    getPosts(id, page);
  }, []);

  if (currentCategory?.id != id)
    return (
      <View>
        <Stack.Screen
          options={{
            title: "Loading Category...",
          }}
        />
        <Text style={styles.title}>Loading...</Text>
      </View>
    );

  return (
    <View>
      <Stack.Screen
        options={{
          title: currentCategory.name,
        }}
      />

      <Text style={styles.title}>
        {currentCategory.name}
        (Page: {currentPage} of {totalPages}, Total {totalPosts})
      </Text>

      {posts.length == 0 && <Text style={styles.link}>No posts found</Text>}

      {posts.length > 0 && (
        <>
          {posts.map((post) => (
            <Link style={styles.link} href={`post/${post.id}`} key={post.id}>
              {post.title.rendered}
            </Link>
          ))}

          {page > 1 && (
            <Link
              style={styles.button}
              href={`category/${id}/${currentPage - 1}`}
            >
              <Pressable>
                <Text>Previous</Text>
              </Pressable>
            </Link>
          )}
          {page < totalPages && (
            <Link
              style={styles.button}
              href={`category/${id}/${currentPage + 1}`}
            >
              <Pressable>
                <Text>Next</Text>
              </Pressable>
            </Link>
          )}
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  link: {
    fontSize: 20,
    marginVertical: 10,
    color: "white",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  button: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 10,
    color: "white",
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
  },
});
