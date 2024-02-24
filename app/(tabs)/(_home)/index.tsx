import {
  Text,
  View,
  StyleSheet,
  Image,
  Linking,
  TouchableOpacity,
  ScrollView,
  Platform,
  useWindowDimensions,
  requireNativeComponent,
} from "react-native";

import { CHANNEL_ID } from "constants/YouTube";
import { Category, VideoItem, YouTubeApiResponseItem } from "types/types";
import usePostStore from "store/PostStore";
import { useEffect, useMemo, useState } from "react";
import { router } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import HTML, { MixedStyleDeclaration } from "react-native-render-html";
import { YOUTUBEURL } from "constants/YouTube";

async function GetYouTubeVideo(): Promise<VideoItem> {
  console.log("Fetching videos from YouTube");
  const response = await fetch(YOUTUBEURL);
  if (response.status != 200) {
    throw new Error(
      `Failed to fetch videos from YouTube. URL: ${response.url}, Error: ${response.statusText}`
    );
  }
  const data = await response.json();
  if (!data.items) {
    throw new Error(
      `Failed to fetch videos from YouTube. URL: ${response.url}, Error: ${response.statusText}`
    );
  }

  const item: YouTubeApiResponseItem = data.items[0];
  return {
    id: item.id.videoId,
    title: item.snippet.title,
    thumbnail: item.snippet.thumbnails.high.url,
    description: item.snippet.description,
  };
}

export default function HomeScreen() {
  const { categories, getCategories } = usePostStore();
  const [video, setVideo] = useState<VideoItem>();
  const [error, setError] = useState<string>();
  const width = useWindowDimensions().width;

  useMemo(() => {
    async function getVideo() {
      try {
        if(video) return;
        const v = await GetYouTubeVideo();
        setVideo(v);
      } catch (error: any) {
        setError(error.message);
      }
    }
    getVideo();
  }, []);

  useEffect(() => {
    getCategories();
  }, []);

  if (error) {
    console.log(error);
  }

  const titleTagsStyles: Readonly<Record<string, MixedStyleDeclaration>> = {
    h3: {
      fontSize: 18,
      fontWeight: "bold",
    },
  };

  return (
    <View style={styles.container}>
      <ScrollView style={{ width: "100%", flex: 1, padding: 10 }}>
        <View style={{ width: "100%" }}>
          {video && (
            <TouchableOpacity
              key={video.id}
              onPress={() =>
                Linking.openURL(`https://www.youtube.com/v/${video.id}`)
              }
            >
              <View key={video.id}>
                <Image
                  source={{
                    uri: `https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`,
                  }}
                  style={styles.youTubeImage}
                />
              </View>
            </TouchableOpacity>
          )}
        </View>

        <View
          style={{
            width: "100%",
          }}
        >
          <TouchableOpacity
            onPress={() =>
              Linking.openURL(`https://www.youtube.com/channel/${CHANNEL_ID}`)
            }
          >
            <View style={styles.youtubeTitle}>
              <Text style={styles.youtubeTitleText}>
                Watch More on our
                <FontAwesome style={styles.youTubeIcon} name="youtube-play" />{" "}
                YouTube Channel
              </Text>
            </View>
          </TouchableOpacity>

          <View style={styles.categoryTitle}>
            <Text style={styles.categoryTitleText}>Categories</Text>
          </View>
          <View style={styles.card}>
            {categories.map((category: Category) => (
              <TouchableOpacity
                key={category.id}
                style={styles.link}
                onPress={() => router.push(`/category/${category.id}/1`)}
              >
                <View style={styles.categoryContainer}>
                  <Text style={styles.categoryName}>{category.name}</Text>
                  <Text style={styles.categoryCount}>{category.count}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "100%",
    marginTop: 0,
    backgroundColor: "white",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "lightgrey",
  },
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#efefef",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  categoryContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "lightgrey",
  },
  categoryName: {
    fontSize: 20,
    fontWeight: "bold",
  },
  categoryCount: {
    fontSize: 18,
    color: "grey",
    fontWeight: "bold",
  },
  link: {
    flex: 1,
    width: "100%",
  },
  youtubeIconTitleText: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: -3,
    margin: 10,
  },
  youtubeTitle: {
    flex: 1,
    justifyContent: "center",
    textAlign: "center",
    alignItems: "center",
  },
  youtubeTitleText: {
    fontSize: 20,
    fontWeight: "bold",
    borderStyle: "solid",
    borderWidth: 2,
    marginTop: 10,
    paddingVertical: 5,
    paddingHorizontal: 8,
    borderRadius: 10,
    borderColor: "#ccc",
  },
  youTubeIcon: {
    fontSize: 20,
    color: "red",
  },
  videoTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 10,
    textAlign: "center",
  },
  categoryTitle: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  categoryTitleText: {
    fontSize: 24,
    color: "red",
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
});
