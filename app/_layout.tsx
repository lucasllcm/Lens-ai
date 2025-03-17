import { Stack } from 'expo-router';
import React from 'react';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const themeColors = Colors[colorScheme ?? 'light'];

  return (
    <Stack>
      {/* Tela do Chat */}
      <Stack.Screen
        name="chat" // Nome da tela do chat
        options={{
          title: 'Chat', // Título da tela
          headerShown: false, // Oculta o cabeçalho
        }}
      />
    </Stack>
  );
}