import { Text, View, StyleSheet, Image, Linking, TouchableOpacity, Button, ScrollView } from 'react-native';
import usePostStore from '../../../store/PostStore';
import { useEffect, useState } from 'react';
import { Link } from 'expo-router';

const API_KEY = "AIzaSyCkMS50UCV1YnB8v5VLs5KNOhF68loWBxA"; // replace with your YouTube Data API v3 API key
const CHANNEL_ID = "UCCbzUJ8KomG2nqBEzVjcBYg"; // replace with the ID of the channel you're interested in
const YOUTUBEURL = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${CHANNEL_ID}&maxResults=1&order=date&key=${API_KEY}`;

type YouTubeApiResponseItem = {
  id: {
    videoId: string;
  };
  snippet: {
    publishedAt: string;
    description: string;
    title: string;
    thumbnails: {
      high: {
        url: string;
      };
    };
  };
};

type VideoItem = {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
};

type Category = {
  id: number;
  name: string;
};

export default function HomeScreen() {
  const { categories, getCategories } = usePostStore();
  const [ videos, setVideos ] = useState<VideoItem[]>();
  const [ error, setError ] = useState<string>();

  useEffect(() => {
    async function fetchVideos() {
      try {
        const response = await fetch(YOUTUBEURL);
        const data = await response.json();
        if (!data.items) setError("No items found");
        setVideos(data.items.map((item:YouTubeApiResponseItem) => ({
          id: item.id.videoId,
          title: item.snippet.title,
          thumbnail: item.snippet.thumbnails.high.url,
          description: item.snippet.description
        })));
      } catch (error) {
        console.log(error);
        // FCM.log(error);
        setError("Some error occurred when fetching YouTube videos");
      }
    }
    
    fetchVideos();
    getCategories();
  }, []);

  if(error) return <Text>{error}</Text>;

  return (
    <View style={styles.container}>
      <View style={styles.categoryTitle}>
        <Text style={styles.categoryTitleText}>YouTube</Text>
        <Button
          onPress={() => Linking.openURL(`https://www.youtube.com/channel/${CHANNEL_ID}`)}
          title="Show More" />
      </View>
      <View>
        {videos && videos.map((video) => (
          <TouchableOpacity
            key={video.id}
            onPress={() => Linking.openURL(`https://www.youtube.com/v/${video.id}`)}>
          <View            
            key={video.id}>
            <Image source={{uri: `https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`}} style={styles.youTubeImage} />
            <Text style={styles.videoTitle}>{video.title}</Text>
          </View>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.categoryTitle}>
        <Text style={styles.categoryTitleText}>Categories</Text>
      </View>
      <ScrollView style={{width: "100%"}}>
      {categories.map((category: Category) => (
        <Link
          key={category.id}
          style={styles.link}
          href={`/category/${category.id}/1`}>{category.name}</Link>
      ))}
      </ScrollView>
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
    borderStyle: 'solid',
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
    paddingLeft: 20,
  },
  videoTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
    textAlign: 'center',
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
    color: 'white',
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
