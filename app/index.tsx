// Importa um componente personalizado chamado "AnimatedIntro" do diretório "components"
// O "@/components/AnimatedIntro" sugere um alias configurado no projeto, possivelmente no tsconfig.json ou babel.config.js
import AnimatedIntro from "@/components/AnimatedIntro"; 

// Importa os componentes "Text" e "View" da biblioteca "react-native"
// "View" é um contêiner para estruturar a interface e "Text" é usado para exibir texto (não está sendo usado neste código)
import { Text, View } from "react-native"; 

// Exporta a função "Index" como o componente padrão do arquivo
// Isso permite que este componente seja importado e utilizado em outros arquivos do projeto
export default function Index() { 
  return ( 
    // "View" é um contêiner que pode conter outros componentes
    <View
      style={{ // Define os estilos inline para o View
        flex: 1, // Ocupa todo o espaço disponível na tela
      }}>
      
      {/* Renderiza o componente "AnimatedIntro", que pode ser uma animação de introdução */}
      <AnimatedIntro />

    </View>
  );
}
