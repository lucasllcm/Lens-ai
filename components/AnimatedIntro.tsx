import Colors from '@/constants/Colors';
import { memo } from 'react';
import { StyleSheet, useWindowDimensions } from 'react-native';
import Animated, {
  interpolate,
  interpolateColor,
  useAnimatedReaction,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';
import { ReText } from 'react-native-redash';

const content = [
  {
    title: "Vamos criar.",
    bg: Colors.azulnoturno,
    fontColor: Colors.brancogelo,
  },
  {
    title: "Vamos debater.",
    bg: Colors.roxoelétrico,
    fontColor: Colors.amareloluminoso,
  },
  {
    title: "Vamos descobrir.",
    bg: Colors.cianoneon,
    fontColor: Colors.cianoclaro,
  },
  {
    title: "Vamos Nessa.",
    bg: Colors.laranjasolar,
    fontColor: Colors.lilássuave,
  },
  {
    title: 'Lens-AI.',
    bg: Colors.blue,
    fontColor: Colors.cinzaclaro,
  },
];

const AnimatedIntro = () => {
  const { width } = useWindowDimensions();
  const ballWidth = 34;
  const half = width / 2 - ballWidth / 2;

  const currentX = useSharedValue(half);
  const currentIndex = useSharedValue(0);
  const isAtStart = useSharedValue(true);
  const labelWidth = useSharedValue(0);
  const canGoToNext = useSharedValue(false);
  const didPlay = useSharedValue(false);

  const newColorIndex = useDerivedValue(() => {
    if (!isAtStart.value) {
      return (currentIndex.value + 1) % content.length;
    }
    return currentIndex.value;
  }, [currentIndex]);

  const textStyle = useAnimatedStyle(() => {
    return {
      color: interpolateColor(
        currentX.value,
        [half, half + labelWidth.value / 2],
        [content[newColorIndex.value].fontColor, content[currentIndex.value].fontColor],
        'RGB'
      ),
      transform: [
        {
          translateX: interpolate(
            currentX.value,
            [half, half + labelWidth.value / 2],
            [half + 4, half - labelWidth.value / 2]
          ),
        },
      ],
    };
  }, [currentIndex, currentX]);

  const ballStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(
        currentX.value,
        [half, half + labelWidth.value / 2],
        [content[newColorIndex.value].fontColor, content[currentIndex.value].fontColor],
        'RGB'
      ),
      transform: [{ translateX: currentX.value }],
    };
  });

  const mask = useAnimatedStyle(
    () => ({
      backgroundColor: interpolateColor(
        currentX.value,
        [half, half + labelWidth.value / 2],
        [content[newColorIndex.value].bg, content[currentIndex.value].bg],
        'RGB'
      ),
      transform: [{ translateX: currentX.value }],
      width: width / 1.5,
      borderTopLeftRadius: 20,
      borderBottomLeftRadius: 20,
    }),
    [currentIndex, currentX, labelWidth]
  );

  const style1 = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      currentX.value,
      [half, half + labelWidth.value / 2],
      [content[newColorIndex.value].bg, content[currentIndex.value].bg],
      'RGB'
    ),
    opacity: interpolate(1, [1, 0], [1, 0, 0, 0, 0, 0, 0]),
    transform: [
      {
        translateX: interpolate(1, [1, 0], [0, -width * 2, -width, -width, -width, -width, -width]),
      },
    ],
  }));

  const text = useDerivedValue(() => {
    const index = currentIndex.value;
    return content[index].title;
  }, [currentIndex]);

  useAnimatedReaction(
    () => labelWidth.value,
    (newWidth) => {
      currentX.value = withDelay(
        1000,
        withTiming(
          half + newWidth / 2,
          {
            duration: 800,
          },
          (finished) => {
            if (finished) {
              canGoToNext.value = true;
              isAtStart.value = false;
            }
          }
        )
      );
    },
    [labelWidth, currentX, half]
  );

  useAnimatedReaction(
    () => canGoToNext.value,
    (next) => {
      if (next) {
        canGoToNext.value = false;
        currentX.value = withDelay(
          1000,
          withTiming(
            half,
            {
              duration: 800,
            },
            (finished) => {
              if (finished) {
                currentIndex.value = (currentIndex.value + 1) % content.length;
                isAtStart.value = true;
                didPlay.value = false;
              }
            }
          )
        );
      }
    },
    [currentX, labelWidth]
  );

  return (
    <Animated.View style={[styles.wrapper, style1]}>
      <Animated.View style={[styles.content]}>
        <Animated.View style={[styles.ball, ballStyle]} />
        <Animated.View style={[styles.mask, mask]} />
        <ReText
          onLayout={(e) => {
            labelWidth.value = e.nativeEvent.layout.width + 4;
          }}
          style={[styles.title, textStyle]}
          text={text}
        />
      </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  mask: {
    zIndex: 1,
    position: 'absolute',
    top: 11,
    left: '0%',
    height: 44,
  },
  ball: {
    width: 40,
    zIndex: 10,
    height: 40,
    backgroundColor: '#000',
    borderRadius: 20,
    position: 'absolute',
    left: '0%',
    top: 14,
  },
  titleText: {
    flexDirection: 'row',
  },
  title: {
    fontSize: 36,
    fontWeight: '600',
    left: '0%',
    position: 'absolute',
    top: 0,
  },
  content: {
    marginTop: 300,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default memo(AnimatedIntro);



/*

    Explicação do código:

  Importações:

import Colors from '@/constants/Colors';: Importa um arquivo de constantes chamado Colors, que provavelmente contém definições de cores usadas no aplicativo.

import { memo } from 'react';: Importa a função memo do React, que é usada para otimizar o desempenho do componente, evitando renderizações desnecessárias.

import { StyleSheet, useWindowDimensions } from 'react-native';: Importa StyleSheet para criar estilos e useWindowDimensions para obter as dimensões da tela do dispositivo.

import Animated, { ... } from 'react-native-reanimated';: Importa o módulo Animated e várias funções relacionadas a animações, como interpolate, interpolateColor, useAnimatedStyle, etc.

import { ReText } from 'react-native-redash';: Importa o componente ReText, que permite animar textos.

  Definição do conteúdo:

content: É um array de objetos que define o conteúdo a ser exibido. Cada objeto contém:

title: O texto a ser mostrado.

bg: A cor de fundo.

fontColor: A cor do texto.

  Componente AnimatedIntro:

const { width } = useWindowDimensions();: Obtém a largura da tela do dispositivo.

const ballWidth = 34;: Define a largura de uma "bola" que será usada na animação.

const half = width / 2 - ballWidth / 2;: Calcula a posição central da tela, ajustada para o tamanho da bola.

  Valores compartilhados e reativos

useSharedValue: Cria valores que podem ser animados e compartilhados entre diferentes partes do código.

currentX: Armazena a posição horizontal da bola.

currentIndex: Armazena o índice atual do conteúdo sendo exibido.

isAtStart: Indica se a animação está no início.

labelWidth: Armazena a largura do texto.

canGoToNext: Controla se a animação pode avançar para o próximo item.

didPlay: Indica se a animação já foi executada.

   Lógica de animação

useDerivedValue: Cria um valor derivado que é atualizado automaticamente quando currentIndex muda.

Se isAtStart for false, calcula o próximo índice (currentIndex + 1).

Usa o operador % para garantir que o índice permaneça dentro dos limites do array content.

  Estilos animados

useAnimatedStyle: Cria um estilo que pode ser animado.

interpolateColor: Interpola entre duas cores com base no valor de currentX.

interpolate: Interpola valores para animar a posição do texto.

  Reações animadas

useAnimatedReaction: Executa uma função sempre que labelWidth muda.

withDelay: Atraso antes de iniciar a animação.

withTiming: Animação suave para mover currentX para uma nova posição.

  Renderização

Animated.View: Componente que suporta animações.

ReText: Componente para animar textos.

onLayout: Captura a largura do texto e atualiza labelWidth.

  Estilos

Define os estilos para os componentes.

  Exportação

memo: Otimiza o componente para evitar renderizações desnecessárias.


*/