import React, { useCallback, useState, useEffect } from 'react';
import { View, StyleSheet, Animated, Image } from 'react-native';

import BaseLayout, { BaseLayoutRenderItem } from './BaseLayout';
import { CardBack, Text } from '@modi/ui/components';
import { useGameState } from '@modi/hooks';
import { colors } from '@modi/ui/styles';
import animateTradingCards from './animateTradingCards';
import cardImgs from '@modi/ui/assets/img/cards';

const CardMap: React.FC = () => {
  const gameState = useGameState();
  const numPlayers = gameState.players.length;

  const renderPlaceholder = useCallback<BaseLayoutRenderItem>(
    () => <View style={styles.cardPlaceholder} />,
    [],
  );

  const renderCard = useCallback<BaseLayoutRenderItem>(
    (idx: number, radius: number) => {
      const idxOfLastMove = gameState.moves.length - 1;
      const lastMove = gameState.moves[idxOfLastMove];
      const idxOfTrader = lastMove === 'swap' ? idxOfLastMove : undefined;
      // const { rotate, translateX, translateY } = animateTradingCards(
      //   idx,
      //   radius,
      //   idxOfTrader,
      //   gameState.players.length,
      // );
      // const rotate = new Animated.Value(0);
      // const translateX = new Animated.Value(0);
      // const translateY = new Animated.Value(0);

      return (
        // <Animated.View
        //   style={{ flex: 1, transform: [{ translateX }, { translateY }] }}
        // >
        <View style={{ flex: 1 }}>
          {!!gameState.players[idx].card && (
            <Image
              style={{ width: '100%', height: '100%' }}
              source={
                gameState.players[idx].id === gameState.me?.id
                  ? cardImgs[gameState.me.card?.suit!][gameState.me.card?.rank!]
                  : cardImgs.back
              }
            />
          )}
        </View>
        // </Animated.View>
      );
    },
    [gameState.players, gameState.moves],
  );

  return (
    <View style={styles.container}>
      <View style={styles.layer}>
        <BaseLayout numPlaces={numPlayers} renderItem={renderPlaceholder} />
      </View>
      <Animated.View style={styles.layer}>
        <BaseLayout numPlaces={numPlayers} renderItem={renderCard} />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    maxWidth: '100%',
    maxHeight: '100%',
    aspectRatio: 1,
    backgroundColor: colors.lightGreen,
  },
  layer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  card: {
    flex: 1,
    backgroundColor: 'red',
    borderRadius: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
  },
  cardPlaceholder: {
    backgroundColor: colors.feltGreen,
    flex: 1,
  },
});

export default CardMap;
