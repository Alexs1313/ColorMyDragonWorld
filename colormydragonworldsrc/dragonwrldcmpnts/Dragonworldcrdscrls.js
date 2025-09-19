import { useNavigation } from '@react-navigation/native';
import React, { useRef } from 'react';
import {
  Animated,
  View,
  StyleSheet,
  useWindowDimensions,
  TouchableOpacity,
  Image,
  Text,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

export default function Dragonworldcrdscrls({
  dragonPropCategories = [],
  onSelect = () => {},
  setCurrentIndex,
  currentIndex,
}) {
  const scrollX = useRef(new Animated.Value(0)).current;
  const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = useWindowDimensions();
  const isLandscape = SCREEN_WIDTH > SCREEN_HEIGHT;
  const ITEM_WIDTH = Math.round(SCREEN_WIDTH * (isLandscape ? 0.72 : 1));
  const ITEM_SPACING = Math.round((SCREEN_WIDTH - ITEM_WIDTH) / 2.5);

  const dragonworldnavigation = useNavigation();

  const handleScrollEnd = event => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / ITEM_WIDTH);
    setCurrentIndex(index);
  };

  return (
    <Animated.ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      snapToInterval={ITEM_WIDTH}
      decelerationRate="fast"
      contentContainerStyle={{ paddingHorizontal: ITEM_SPACING }}
      onScroll={Animated.event(
        [{ nativeEvent: { contentOffset: { x: scrollX } } }],
        { useNativeDriver: true },
      )}
      onMomentumScrollEnd={handleScrollEnd}
      scrollEventThrottle={16}
    >
      {dragonPropCategories.map((item, index) => {
        const inputRange = [
          (index - 1) * ITEM_WIDTH,
          index * ITEM_WIDTH,
          (index + 1) * ITEM_WIDTH,
        ];

        const scale = scrollX.interpolate({
          inputRange,
          outputRange: [0.8, 1, 0.8],
          extrapolate: 'clamp',
        });

        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0, 1, 0],
          extrapolate: 'clamp',
        });

        const translateY = scrollX.interpolate({
          inputRange,
          outputRange: [12, 0, 12],
          extrapolate: 'clamp',
        });

        return (
          <View key={index}>
            <Animated.View
              style={[
                {
                  width: ITEM_WIDTH,
                  transform: [{ scale }, { translateY }],
                  opacity,
                },
              ]}
            >
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <LinearGradient
                  style={styles.dragonbrd}
                  colors={[
                    '#BB862A',
                    '#C48E24',
                    '#DBA414',
                    '#F0B706',
                    '#FEF387',
                    '#F0B706',
                    '#ECCB64',
                    '#BB862A',
                  ]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <View style={[styles.dragonmdlcnt]}>
                    <View style={{ alignItems: 'center' }}>
                      <Image
                        source={item.dragonwrldim}
                        style={[{ width: 198, height: 198, borderRadius: 17 }]}
                      />

                      <Text style={styles.dragoncurrcard}>
                        {currentIndex + 1}/4
                      </Text>

                      <Text style={styles.dragoncrdttl}>
                        {item.dragonwrldttl}
                      </Text>
                    </View>

                    <View
                      style={{
                        width: '100%',
                        backgroundColor: '#3B0101',
                        paddingHorizontal: 13,
                        paddingVertical: 16,
                        borderRadius: 22,
                        marginBottom: 12,
                      }}
                    >
                      <Text style={styles.dragonsbt}>{item.dragonwrlddes}</Text>
                    </View>

                    <View style={{}}>
                      {/* <Dragongrdtxt
                        royalCourtPropsTxt={'Start'}
                        style={styles.dragonwrldtxt}
                      /> */}

                      <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={() =>
                          dragonworldnavigation.navigate(
                            'Dragonworldclrngscr',
                            item,
                          )
                        }
                      >
                        <Text style={[styles.dragoncrdttl, { marginTop: 2 }]}>
                          Start
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </LinearGradient>
              </View>
            </Animated.View>
          </View>
        );
      })}
    </Animated.ScrollView>
  );
}

const styles = StyleSheet.create({
  dragonbrd: {
    marginBottom: 13,
    borderRadius: 22,
    width: '90%',
  },
  dragonwrldtxt: {
    fontFamily: 'SuezOne-Regular',
    fontSize: 24,
    textAlign: 'center',
  },
  dragonmdlcnt: {
    paddingTop: 23,
    padding: 25,
    backgroundColor: '#550101',
    margin: 3,
    borderRadius: 22,
  },
  dragonsbt: {
    fontFamily: 'SuezOne-Regular',
    fontSize: 12,
    color: '#fff',
    textAlign: 'center',
    lineHeight: 22,
  },
  dragoncrdttl: {
    fontFamily: 'SuezOne-Regular',
    fontSize: 32,
    textAlign: 'center',
    color: '#F0B706',
    marginTop: 12,
    marginBottom: 8,
  },
  dragoncurrcard: {
    fontFamily: 'SuezOne-Regular',
    fontSize: 24,
    color: '#fff',
    textAlign: 'center',
    position: 'absolute',
    right: -8,
    top: -16,
  },
});
