import { useLocalSearchParams, Link, Stack } from "expo-router";
import {
  Platform,
  View,
  Text,
  StyleSheet,
  Dimensions,
  useWindowDimensions,
  ScrollView,
} from "react-native";
import usePostStore from "../../../../store/PostStore";
import React, { useEffect } from "react";
import HTML, { MixedStyleDeclaration } from "react-native-render-html";

export default function PostScreen() {
  const { id }: { id: string } = useLocalSearchParams();
  const { loading, post, getPost } = usePostStore();

  const postId = parseInt(id, 10);

  useEffect(() => {
    getPost(postId);
  }, []);

  const contentHtml = post.content.rendered;
  const postTitle = `<h1>${post.title.rendered}</h1>`;

  const titleTagsStyles: Readonly<Record<string, MixedStyleDeclaration>> = {
    h1: {
      fontSize: 30,
      fontWeight: "bold",
    },
  }

  const tagsStyles: Readonly<Record<string, MixedStyleDeclaration>> = {
    p: {
      fontSize: 20,
      margin: 0,
    },
  };

  const classesStyles: Readonly<Record<string, MixedStyleDeclaration>> = {
    ar: {
      fontSize: 30,
      marginTop: 10,
      marginBottom: 5,
      textAlign: "center",
    },
  };

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <View>
      <ScrollView>
        <Stack.Screen
          options={{
            title: "Read Article",
          }}
        />

        <HTML
            source={{ html: postTitle }}
            contentWidth={useWindowDimensions().width}
            tagsStyles={titleTagsStyles}
          />

        {Platform.OS == "web" && (
          <div
            className="content"
            dangerouslySetInnerHTML={{ __html: contentHtml }}
          />
        )}
        {(Platform.OS == "android" || Platform.OS == "ios") && (
          <HTML
            source={{ html: contentHtml }}
            contentWidth={useWindowDimensions().width}
            tagsStyles={tagsStyles}
            classesStyles={classesStyles}
          />
        )}
      </ScrollView>
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
    fontSize: 30,
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
