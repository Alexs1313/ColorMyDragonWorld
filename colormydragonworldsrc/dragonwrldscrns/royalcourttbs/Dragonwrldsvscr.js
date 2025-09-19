import { StyleSheet, Image, View, Text, Pressable } from 'react-native';
import Royalcourtbg from '../../dragonwrldcmpnts/Dragonworldbck';
import { useDragonWorldContext } from '../../dragonworldstr/dragonworldcntx';
import { useCallback, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import { Dragongrdtxt } from '../../dragonwrldcmpnts/Dragongrdtxt';
import Dragonwrlddncard from '../../dragonwrldcmpnts/Dragonwrlddncard';
import Dragonwrldprogcard from '../../dragonwrldcmpnts/Dragonwrldprogcard';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Dragonwrldsvscr = () => {
  const {
    fetchDragonWorldDrawing,
    savedDrawingsInProgress,
    savedDrawingsDone,
  } = useDragonWorldContext();

  const [toggleRoyalCourtSegmentContr, setToggleRoyalCourtSegmentContr] =
    useState(false);

  useFocusEffect(
    useCallback(() => {
      fetchDragonWorldDrawing('dragonworldinprogressdrawings');
      fetchDragonWorldDrawing('dragonworlddonedrawings');
    }, []),
  );

  const sortedSavedDrawingsInProgress = [...savedDrawingsInProgress].sort(
    (a, b) => {
      return (b.favorite === true ? 1 : 0) - (a.favorite === true ? 1 : 0);
    },
  );

  const sortedSavedDrawingsDone = [...savedDrawingsDone].sort((a, b) => {
    return (b.favorite === true ? 1 : 0) - (a.favorite === true ? 1 : 0);
  });

  return (
    <Royalcourtbg>
      <View style={[styles.royalcourtcnt]}>
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
          <LinearGradient
            style={[styles.dragonwrldbrd]}
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
            <View style={[styles.dragonwrldhd]}>
              <Image
                source={require('../../../assets/images/dragonworldldr.png')}
                style={{ width: 91, height: 91, borderRadius: 9 }}
              />
            </View>
          </LinearGradient>
          <View style={{ position: 'absolute', bottom: 45 }}>
            <Dragongrdtxt
              royalCourtPropsTxt={'Drawings'}
              style={styles.dragonwrldtxt}
            />
          </View>
        </View>

        <View style={{ alignItems: 'center' }}>
          <Pressable
            style={styles.dragonsegmentcntrl}
            onPress={() =>
              setToggleRoyalCourtSegmentContr(!toggleRoyalCourtSegmentContr)
            }
          >
            <Text style={[styles.dragonsegtxt, { left: -5 }]}>In progress</Text>
            <Text style={styles.dragonsegtxt}>Done</Text>

            <View
              style={[
                {
                  position: 'absolute',
                  left: 0,
                  alignItems: 'center',
                  justifyContent: 'center',
                },
                toggleRoyalCourtSegmentContr && { right: -160 },
              ]}
            >
              {!toggleRoyalCourtSegmentContr ? (
                <Image
                  source={require('../../../assets/images/dragonworldprogg.png')}
                />
              ) : (
                <Image
                  source={require('../../../assets/images/dragonworlddone.png')}
                />
              )}
            </View>
          </Pressable>
        </View>
      </View>
      <View
        style={{
          marginBottom: 200,
          marginHorizontal: 20,
        }}
      >
        {!toggleRoyalCourtSegmentContr ? (
          <>
            {sortedSavedDrawingsInProgress.map((adv, idx) => (
              <Dragonwrldprogcard adv={adv} key={idx} />
            ))}
          </>
        ) : (
          <>
            {sortedSavedDrawingsDone.map((adv, idx) => (
              <Dragonwrlddncard adv={adv} key={idx} />
            ))}
          </>
        )}
      </View>
    </Royalcourtbg>
  );
};

const styles = StyleSheet.create({
  dragonwrldcnt: {
    padding: 11,
    paddingTop: 54,
    alignItems: 'center',
    flex: 1,
  },
  dragonwrldtxt: {
    fontFamily: 'SuezOne-Regular',
    fontSize: 24,
    textAlign: 'center',
  },
  dragonwrldbrd: {
    borderBottomLeftRadius: 22,
    borderBottomRightRadius: 22,
    width: '100%',
  },
  dragonwrldhd: {
    paddingTop: 54,
    padding: 14,
    paddingHorizontal: 14,
    backgroundColor: '#550101',
    margin: 3,
    marginTop: 0,
    borderBottomLeftRadius: 22,
    borderBottomRightRadius: 22,
  },
  dragonbrd: {
    marginBottom: 13,
    borderRadius: 22,
    width: '100%',
  },
  dragonmdlcnt: {
    paddingTop: 23,
    paddingHorizontal: 11,
    padding: 29,
    backgroundColor: '#550101',
    margin: 3,
    borderRadius: 22,
  },
  royalcourtmdttl: {
    fontFamily: 'SpicyRice-Regular',
    fontSize: 24,
    color: '#ECCB64',
    textAlign: 'center',
    marginBottom: 21,
  },
  dragonsegtxt: {
    fontFamily: 'SuezOne-Regular',
    fontSize: 20,
    color: '#fff',
  },
  dragonsegmentcntrl: {
    width: 342,
    height: 65,
    borderRadius: 22,
    backgroundColor: '#3B0101',
    marginTop: 15,
    marginBottom: 25,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});

export default Dragonwrldsvscr;
