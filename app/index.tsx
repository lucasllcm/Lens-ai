import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  TextInput,
  ScrollView,
  View,
  Text,
  KeyboardAvoidingView,
  TouchableOpacity,
  Platform,
  useColorScheme,
  Dimensions,
} from 'react-native';
import { Colors } from '@/constants/Colors';

// Defina o tipo de uma mensagem
interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
}

export default function ChatScreen() {
  const [messages, setMessages] = useState<Message[]>([]); // Defina o tipo do estado
  const [inputText, setInputText] = useState('');
  const scrollViewRef = useRef<ScrollView>(null);
  const colorScheme = useColorScheme();
  const themeColors = Colors[colorScheme ?? 'light'];

  // Rolagem automática para a última mensagem
  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (inputText.trim() === '') return;

    // Adiciona a mensagem do usuário ao chat
    const userMessage: Message = { id: messages.length + 1, text: inputText, sender: 'user' };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    // Limpa o campo de entrada
    setInputText('');

    try {
      console.log('Enviando mensagem para a API...'); // Log de depuração

      // Envia a mensagem para a API do Ollama
      const response = await fetch('http://localhost:11434/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'llama3', // Nome do modelo
          prompt: inputText, // Mensagem do usuário
          stream: false, // Desativa o streaming para respostas simples
        }),
      });

      console.log('Resposta recebida da API:', response); // Log de depuração

      if (!response.ok) {
        throw new Error(`Erro na requisição: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      console.log('Dados da resposta:', data); // Log de depuração

      // Verifica se a resposta contém o campo 'response'
      if (!data.response) {
        throw new Error('Resposta da API está vazia ou no formato incorreto.');
      }

      // Adiciona a resposta do bot ao chat
      const botMessage: Message = { id: messages.length + 2, text: data.response, sender: 'bot' };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error('Erro ao enviar mensagem para a API:', error);

      // Adiciona uma mensagem de erro ao chat
      const errorMessage: Message = { id: messages.length + 2, text: 'Erro ao processar a mensagem.', sender: 'bot' };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} // Ajusta o layout para o teclado
      style={[styles.container, { backgroundColor: themeColors.background }]}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0} // Ajuste para iOS
    >
      {/* Área do Chat */}
      <ScrollView
        ref={scrollViewRef}
        contentContainerStyle={styles.chatContent}
        style={styles.chatContainer}
      >
        {messages.map((message) => (
          <View
            key={message.id}
            style={[
              styles.messageBubble,
              message.sender === 'user'
                ? { backgroundColor: themeColors.messageUserBackground }
                : { backgroundColor: themeColors.messageBotBackground },
            ]}
          >
            <Text style={[styles.messageText, { color: themeColors.messageText }]}>
              {message.text}
            </Text>
          </View>
        ))}
      </ScrollView>

      {/* Campo de Entrada e Botão de Envio */}
      <View style={[styles.inputContainer, { backgroundColor: themeColors.background }]}>
        <TextInput
          style={[
            styles.input,
            {
              backgroundColor: themeColors.inputBackground,
              color: themeColors.inputText,
              borderColor: themeColors.text,
            },
          ]}
          value={inputText}
          onChangeText={setInputText}
          placeholder="Digite sua mensagem..."
          placeholderTextColor={themeColors.inputText}
          onSubmitEditing={handleSendMessage} // Aciona o envio ao pressionar Enter/OK
          returnKeyType="send" // Altera o botão do teclado para "Enviar"
        />
        <TouchableOpacity
          style={[styles.sendButton, { backgroundColor: themeColors.buttonBackground }]}
          onPress={handleSendMessage}
        >
          <Text style={[styles.sendButtonText, { color: themeColors.buttonText }]}>Enviar</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const screenHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  chatContainer: {
    flex: 1,
    maxHeight: screenHeight * 0.7, // Limita a altura do chat para telas menores
    marginBottom: 16,
  },
  chatContent: {
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  messageBubble: {
    padding: 12,
    borderRadius: 12,
    marginVertical: 8,
    maxWidth: '80%',
  },
  messageText: {
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderTopWidth: 1,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginRight: 8,
    fontSize: 16,
  },
  sendButton: {
    borderRadius: 20,
    padding: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonText: {
    fontSize: 16,
  },
});