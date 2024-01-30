import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Stack } from 'expo-router';
import { Pressable } from 'react-native';


export default function MenuLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" 
        options={{
          title: 'Menu',
        }} />
    </Stack>
  );
}
