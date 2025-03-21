import Colors from '@/constants/Colors';
import { defaultStyles } from '@/constants/Styles';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { 
    View, 
    Text, 
    StyleSheet, 
    ActivityIndicator, 
    KeyboardAvoidingView, 
    Platform,
    Image,
    TextInput,
    TouchableOpacity,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';

const Page = () => {
    const { type } = useLocalSearchParams<{ type: string }>();  
    const [loading, setLoading] = useState(false);
    const [emailAddress, setEmailAddress] = useState('');
    const [password, setPassword] = useState('');

    const onSignUpPress = async () => {}
    const onSigInPress = async () => {}

    const router = useRouter();

  return (
    <KeyboardAvoidingView 
        behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={70}
        style={[styles.container]}>

        <View style={{ flex: 0, padding: 0 }}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="close-outline" size={28} />
          </TouchableOpacity>
          {/* Resto da tela de login */}
        </View>

        {loading && (
            <View style={defaultStyles.loadingOverlay}>
                <ActivityIndicator size="large" color="#fff" />
            </View>
        )}
        <Image source={require('../assets/images/logo-dark.png')} style={styles.logo} />

        <Text style={styles.title}>{type === 'login' ? 'Bem vindo de volta' : 'Crie sua conta'}</Text>

        <View style={{ marginBottom: 30 }}>
            <TextInput 
                style={styles.inputField}
                autoCapitalize="none"
                placeholder="Email" 
                value={emailAddress} 
                onChangeText={setEmailAddress}
            />
            <TextInput
                placeholder="password"
                autoCapitalize='none'
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                style={styles.inputField}
            />
        </View>

        {type === 'login' ? (
        <TouchableOpacity style={[defaultStyles.btn, styles.btnPrimary]} onPress={onSigInPress}>
          <Text style={styles.btnPrimaryText}>Entrar</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={[defaultStyles.btn, styles.btnPrimary]} onPress={onSignUpPress}>
          <Text style={styles.btnPrimaryText}>Criar conta</Text>
        </TouchableOpacity>
      )}

    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    padding: 20,
  },
  logo: {
    width: 60,
    height: 60,
    alignSelf: 'center',
    marginVertical: 80,
  },
  title: {
    fontSize: 30,
    marginBottom: 20,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  inputField: {
    marginVertical: 4,
    height: 50,
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: 12,
    padding: 10,
    backgroundColor: '#fff',
  },
  btnPrimary: {
    backgroundColor: Colors.primary,
    marginVertical: 4,
  },
  btnPrimaryText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default Page;