import { useLocalSearchParams, Link, Stack } from "expo-router";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Category, Post } from "@/types/types";
import { getCategoriesFetcher, getPostsFetcher } from "@/store/DataService";
import { useEffect, useState } from "react";

export default function CategoryScreen() {
  const params = useLocalSearchParams<{ id: string; page: string }>();
  const { id, page } = params;
  const idVal = parseInt(id as string, 10);
  const pg = parseInt(page as string, 10);
  const { getCategory } = getCategoriesFetcher();
  const { getPostsByCategory } = getPostsFetcher();
  const [currentCategory, setCurrentCategory] = useState<Category>();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(0);
  const [totalPosts, setTotalPosts] = useState(0);

  useEffect(() => {
    async function fetchData() {
      setCurrentCategory(await getCategory(idVal));
      const posts = await getPostsByCategory(idVal, pg);
      setPosts(posts.data);
      setTotalPages(posts.totalPages);
      setTotalPosts(posts.totalRows);
      setLoading(false);
    }
    fetchData();
  }, [idVal, pg]);

  if (currentCategory?.id != idVal)
    return (
      <ScrollView>
        <Stack.Screen
          options={{
            title: "Loading Category...",
          }}
        />
        <Text style={styles.title}>Loading...</Text>
      </ScrollView>
    );

  return (
    <ScrollView>
      <Stack.Screen
        options={{
          title: currentCategory.name,
        }}
      />

      {loading ? (
        <Text style={styles.title}>Loading...</Text>
      ) : (
        <>
          <Text style={styles.title}>
            {currentCategory.name}
            (Page: {pg} of {totalPages}, Total {totalPosts})
          </Text>

          {posts.length == 0 && <Text style={styles.link}>No posts found</Text>}

          {posts.length > 0 && (
            <>
              {posts.map((post: Post) => (
                <Link
                  style={styles.link}
                  href={`/post/${post.id}`}
                  key={post.id}
                >
                  {post.title.rendered}
                </Link>
              ))}

              {pg > 1 && (
                <Link style={styles.button} href={`/category/${id}/${pg - 1}`}>
                  <Pressable>
                    <Text>Previous</Text>
                  </Pressable>
                </Link>
              )}
              {pg < totalPages && (
                <Link style={styles.button} href={`/category/${id}/${pg + 1}`}>
                  <TouchableOpacity>
                    <Text>Next</Text>
                  </TouchableOpacity>
                </Link>
              )}
            </>
          )}
        </>
      )}
    </ScrollView>
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
  },
  link: {
    fontSize: 20,
    marginVertical: 10,
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
    backgroundColor: "blue",
    color: "white",
    padding: 10,
    borderRadius: 5,
  },
});
