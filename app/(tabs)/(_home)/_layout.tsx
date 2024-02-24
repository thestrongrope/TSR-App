import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Stack } from 'expo-router';
import { Pressable } from 'react-native';
import Header from 'components/DashboardHeader';

export default function HomeLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" 
        options={{
          title: 'Home',
          header: Header,
        }} />
    </Stack>
  );
}
