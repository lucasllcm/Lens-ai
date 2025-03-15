/*
import { useState } from 'react'; // Adicione esta linha
import Colors from '@/constants/Colors';
import { copyImageToClipboard, downloadAndSaveImage, shareImage } from '@/utils/Image';
import { Message, Role } from '@/utils/Interfaces';
import { MaterialIcons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { View, Text, StyleSheet, Image, ActivityIndicator, Pressable } from 'react-native';
import { Menu } from 'react-native-paper';

// Definir tipo para ícones do Material Design
type MaterialIconName = 'content-copy' | 'download' | 'share';

const ChatMessage = ({
  content,
  role,
  imageUrl,
  prompt,
  loading,
}: Message & { loading?: boolean }) => {
  const [menuVisible, setMenuVisible] = useState(false); // Agora o useState está importado

  const contextItems = [
    { title: 'Copy', icon: 'content-copy' as MaterialIconName, action: () => copyImageToClipboard(imageUrl!) },
    { title: 'Save to Photos', icon: 'download' as MaterialIconName, action: () => downloadAndSaveImage(imageUrl!) },
    { title: 'Share', icon: 'share' as MaterialIconName, action: () => shareImage(imageUrl!) },
  ];

  return (
    <View style={styles.row}>
      {role === Role.Bot ? (
        <View style={[styles.item, { backgroundColor: '#000' }]}>
          <Image source={require('@/assets/images/logo-white.png')} style={styles.btnImage} />
        </View>
      ) : (
        <Image source={{ uri: 'https://galaxies.dev/img/meerkat_2.jpg' }} style={styles.avatar} />
      )}

      {loading ? (
        <View style={styles.loading}>
          <ActivityIndicator color={Colors.primary} size="small" />
        </View>
      ) : (
        <>
          {content === '' && imageUrl ? (
            <View>
              <Menu
                visible={menuVisible}
                onDismiss={() => setMenuVisible(false)}
                anchor={
                  <Pressable onPress={() => setMenuVisible(true)}>
                    <Image source={{ uri: imageUrl }} style={styles.previewImage} />
                  </Pressable>
                }>
                {contextItems.map((item) => (
                  <Menu.Item
                    key={item.title}
                    onPress={() => {
                      item.action();
                      setMenuVisible(false);
                    }}
                    title={item.title}
                    leadingIcon={item.icon}
                  />
                ))}
              </Menu>
            </View>
          ) : (
            <Text style={styles.text}>{content}</Text>
          )}
        </>
      )}
    </View>
  );
};

// Mantenha os estilos originais
const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingHorizontal: 14,
    gap: 14,
    marginVertical: 12,
  },
  item: {
    borderRadius: 15,
    overflow: 'hidden',
  },
  btnImage: {
    margin: 6,
    width: 16,
    height: 16,
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#000',
  },
  text: {
    padding: 4,
    fontSize: 16,
    flexWrap: 'wrap',
    flex: 1,
  },
  previewImage: {
    width: 240,
    height: 240,
    borderRadius: 10,
  },
  loading: {
    justifyContent: 'center',
    height: 26,
    marginLeft: 14,
  },
});

export default ChatMessage;
*/