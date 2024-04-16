import React from 'react';
import { Stack } from 'expo-router';

export default function TraditionsLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" 
        options={{
          title: 'Traditions',
          headerShown: false
        }} />
    </Stack>
  );
}
