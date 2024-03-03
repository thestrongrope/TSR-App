import React from 'react';
import { Stack } from 'expo-router';
import Header from '@/components/DashboardHeader';

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
