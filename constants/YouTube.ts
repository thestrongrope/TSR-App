const API_KEY = "AIzaSyCkMS50UCV1YnB8v5VLs5KNOhF68loWBxA"; // replace with your YouTube Data API v3 API key
const CHANNEL_ID = "UCCbzUJ8KomG2nqBEzVjcBYg"; // replace with the ID of the channel you're interested in
const YOUTUBEURL = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${CHANNEL_ID}&maxResults=1&order=date&key=${API_KEY}`;

export {
    API_KEY,
    CHANNEL_ID,
    YOUTUBEURL,
};