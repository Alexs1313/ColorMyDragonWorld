import {
  Image,
  ImageBackground,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Dragongrdtxt } from './Dragongrdtxt';

import { useCallback, useState } from 'react';
import { useDragonWorldContext } from '../dragonworldstr/dragonworldcntx';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import Svg, { Path } from 'react-native-svg';

const Dragonwrldprogcard = ({ adv }) => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const [toggleIcon, setToggleIcon] = useState(false);
  const {
    saveDragonWorldDrawing,
    fetchDragonWorldDrawing,
    deleteDragonWorldDrawing,
  } = useDragonWorldContext();

  const dragonwrldnavigation = useNavigation();

  useFocusEffect(
    useCallback(() => {
      fetchDragonWorldDrawing('dragonworldinprogressdrawings');
      fetchDragonWorldDrawing('dragonworlddonedrawings');
    }, []),
  );

  const addToFavorites = () => {
    const updatedAdvices = { ...adv, favorite: true };

    setToggleIcon(!toggleIcon);
    saveDragonWorldDrawing(
      'dragonworldinprogressdrawings',
      updatedAdvices,
      adv,
    );
  };

  return (
    <View>
      <LinearGradient
        style={[styles.dragonmdlbrd]}
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
        <View style={[styles.dragommdl]}>
          <View style={{ flexDirection: 'row', gap: 30, alignItems: 'center' }}>
            <View style={styles.dragimgbg}>
              <ImageBackground
                source={adv.dragonimgbg}
                style={{ width: 144, height: 144, borderRadius: 12 }}
              >
                <Svg width="100%" height="100%" viewBox="-150 100 600 350">
                  {adv.paths?.map((d, i) => (
                    <Path
                      key={i}
                      d={d.d}
                      stroke={d.color}
                      strokeWidth={3}
                      fill="none"
                      strokeLinejoin="round"
                      strokeLinecap="round"
                    />
                  ))}
                </Svg>
              </ImageBackground>
            </View>
            <View style={{ alignItems: 'center' }}>
              {Platform.OS === 'ios' ? (
                <Text style={[styles.dragonmdttl]}>{adv.dragonname}</Text>
              ) : (
                <Dragongrdtxt
                  royalCourtPropsTxt={adv.dragonname}
                  style={styles.dragonwrldtxt}
                />
              )}
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() =>
                  dragonwrldnavigation.navigate('Dragonworldclrngscr', adv)
                }
                style={{
                  flexDirection: 'row',
                  gap: 8,
                  alignItems: 'center',
                  marginBottom: 14,
                }}
              >
                <Text style={styles.dragoncorransttl} ellipsizeMode="tail">
                  Continue
                </Text>
                <Image
                  source={require('../../assets/images/dragonworldnxtarr.png')}
                />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={addToFavorites}
                disabled={adv.favorite || toggleIcon}
              >
                {adv.favorite || toggleIcon ? (
                  <Image
                    source={require('../../assets/images/dragonworldliked.png')}
                  />
                ) : (
                  <Image
                    source={require('../../assets/images/dragonworldlike.png')}
                  />
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  dragonmdlbrd: {
    marginBottom: 13,
    borderRadius: 23,
    width: '100%',
  },
  dragommdl: {
    paddingTop: 14,
    paddingHorizontal: 9,
    paddingBottom: 18,
    backgroundColor: '#550101',
    margin: 2,
    borderRadius: 22,
  },
  dragonmdttl: {
    fontFamily: 'SuezOne-Regular',
    fontSize: 32,
    textAlign: 'center',
    color: '#ECCB64',
    marginBottom: 21,
  },
  dragimgbg: {
    shadowColor: '#000',
    shadowOffset: { width: 5, height: 18 },
    shadowOpacity: 0.7,
    shadowRadius: 11,
    elevation: 10,
    borderRadius: 12,
    overflow: 'hidden',
  },
  dragoncorransttl: {
    fontFamily: 'SuezOne-Regular',
    fontSize: 24,
    color: '#fff',
    textAlign: 'center',
  },
  dragonwrldtxt: {
    fontFamily: 'SuezOne-Regular',
    fontSize: 22,
    textAlign: 'center',
    marginBottom: 8,
  },
});

export default Dragonwrldprogcard;
