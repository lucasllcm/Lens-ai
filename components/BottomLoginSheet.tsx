import Colors from '@/constants/Colors';
import { defaultStyles } from '@/constants/Styles';
import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const BottomLoginSheet = () => {
  const { bottom } = useSafeAreaInsets();
  return (
    <View style={[styles.container, { paddingBottom: bottom }]}>
      <Link
        href={{
          pathname: '/login',
          params: { type: 'register' },
        }}
        style={[defaultStyles.btn, styles.btnDark]}
        asChild>
        <TouchableOpacity>
          <Ionicons name="mail" size={20} style={styles.btnIcon} color={'#171717'} />
          <Text style={styles.btnDarkText1}>Entrar com e-mail</Text>
        </TouchableOpacity>
      </Link>
      <Link
        href={{
          pathname: '/login',
          params: { type: 'login' },
        }}
        style={[defaultStyles.btn, styles.btnOutline]}
        asChild>
        <TouchableOpacity>
          <Text style={styles.btnDarkText}>Conecte-se</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 180,
    backgroundColor: '#212121',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    gap: 20,
  },
  btnDark: {
    backgroundColor: '#ECECEC',
    borderWidth: 1,
    borderColor: '#ECECEC',
  },
  btnDarkText1: {
    color: '#171717',
    fontSize: 20,
  },
  btnDarkText: {
    color: '#fff',
    fontSize: 20,
  },
  btnOutline: {
    borderWidth: 1,
    borderColor: '#ECECEC',
    backgroundColor: '#171717',
  },
  btnIcon: {
    paddingRight: 6,
  },
});

export default BottomLoginSheet;