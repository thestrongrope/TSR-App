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
import React, { useEffect } from "react";
import HTML, { MixedStyleDeclaration } from "react-native-render-html";
import { Post } from "types/types";
import { getPostsFetcher } from "store/DataService";

export default function DisplayPostComponent({ id }: { id: string }) {
  const postId = parseInt(id, 10);
  const { getPost } = getPostsFetcher();
  const [post, setPost] = React.useState({} as Post);
  const [loading, setLoading] = React.useState(true);

  const width = useWindowDimensions().width;

  useEffect(() => {
    async function fetchData() {
      console.log("Fetching post: " + postId);
      setPost(await getPost(postId));
      setLoading(false);
    }
    fetchData();
  }, []);

  const contentHtml = post?.content?.rendered ?? "";
  const postTitle = `<h1>${post?.title?.rendered ?? ""}</h1>`;

  const titleTagsStyles: Readonly<Record<string, MixedStyleDeclaration>> = {
    h1: {
      fontSize: 30,
      fontWeight: "bold",
    },
  };

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

  return (
    <View>
      <ScrollView>
        <Stack.Screen
          options={{
            title: "Read Article",
          }}
        />

        {loading ? (
          <Text>Loading...</Text>
        ) : (
          <>
            <HTML
              source={{ html: postTitle }}
              contentWidth={width}
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
                contentWidth={width}
                tagsStyles={tagsStyles}
                classesStyles={classesStyles}
              />
            )}
          </>
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
