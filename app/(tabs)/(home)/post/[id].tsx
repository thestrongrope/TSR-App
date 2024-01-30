import { useLocalSearchParams, Link, Stack } from "expo-router";

import { Platform, View, Text, StyleSheet } from "react-native";
import { WebView } from "react-native-webview";
import usePostStore from "../../../../store/PostStore";
import { useEffect } from "react";

export default function PostScreen() {
  const { id } = useLocalSearchParams();

  const { post, getPost } = usePostStore();

  useEffect(() => {
    getPost(id);
  }, []);

  if (post?.id != id)
    return (
      <View>
        <Stack.Screen
          options={{
            title: "Loading Post...",
          }}
        />
        <Text style={styles.title}>Loading...</Text>
      </View>
    );

  return (
    <View>
      <Stack.Screen
        options={{
          title: post.title.rendered,
        }}
      />
      <Text style={styles.title}>{post.title.rendered}</Text>
      {Platform.OS == "web" && (
        <div className="content" dangerouslySetInnerHTML={{ __html: post.content.rendered}} />
      )}
      {(Platform.OS == "android" || Platform.OS == "ios") && (
        <WebView source={{ html: post.content.rendered }} />
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
  },
  link: {
    fontSize: 20,
    marginVertical: 10,
  },
  content: {
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
    padding: 10,
    borderRadius: 5,
  },
});
