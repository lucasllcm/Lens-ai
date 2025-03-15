/*
import Colors from '@/constants/Colors';
import { Text, View } from 'react-native';
import * as DropdownMenu from 'zeego/dropdown-menu';

// Defina o tipo para os ícones SF Symbols
type SFSymbols6_0 = 'pencil' | 'trash' | 'square.and.arrow.up' | 'folder' | 'doc';

export type Props = {
  title: string;
  items: Array<{
    key: string;
    title: string;
    icon: SFSymbols6_0; // Use o tipo SFSymbols6_0 aqui
  }>;
  selected?: string;
  onSelect: (key: string) => void;
};

const HeaderDropDown = ({ title, selected, items, onSelect }: Props) => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ fontWeight: '500', fontSize: 16 }}>{title}</Text>
          {selected && (
            <Text
              style={{ marginLeft: 10, fontSize: 16, fontWeight: '500', color: Colors.greyLight }}>
              {selected} &gt;
            </Text>
          )}
        </View>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        {items.map((item) => (
          <DropdownMenu.Item key={item.key} onSelect={() => onSelect(item.key)}>
            <DropdownMenu.ItemTitle>{item.title}</DropdownMenu.ItemTitle>
            <DropdownMenu.ItemIcon
              ios={{
                name: item.icon, // Agora item.icon é do tipo SFSymbols6_0
                pointSize: 18,
              }}
            />
          </DropdownMenu.Item>
        ))}
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};

export default HeaderDropDown;
*/