import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Stack } from 'expo-router';
import { Pressable } from 'react-native';


export default function SearchLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" 
        options={{
          title: 'Search',
        }} />
    </Stack>
  );
}
