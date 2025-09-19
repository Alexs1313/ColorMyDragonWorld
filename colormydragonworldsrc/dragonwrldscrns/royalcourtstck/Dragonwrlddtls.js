import { BlurView } from '@react-native-community/blur';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useCallback, useRef, useState } from 'react';
import {
  Image,
  ImageBackground,
  Modal,
  PanResponder,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { Text } from 'react-native-gesture-handler';
import Svg, { Path } from 'react-native-svg';
import Orientation from 'react-native-orientation-locker';
import { useDragonWorldContext } from '../../dragonworldstr/dragonworldcntx';
import ViewShot from 'react-native-view-shot';
import Share from 'react-native-share';

const Dragonwrlddtls = ({ route }) => {
  const seldragonpnt = route.params;
  const dragonworldnavigation = useNavigation();
  const [paths, setPaths] = useState(
    seldragonpnt.paths || [{ d: '', color: '#ffffff' }],
  );
  const [showDragonWrldAlert, setShowDragonWrldAlert] = useState(false);
  const [color, setColor] = useState('#ffffff');

  const { deleteDragonWorldDrawing } = useDragonWorldContext();
  const currentPath = useRef('');
  const viewShotRef = useRef(null);

  const handleDelDragonWrldDrawing = (dragonKEY, drag) => {
    deleteDragonWorldDrawing(dragonKEY, drag);
    dragonworldnavigation.popToTop();
    setShowDragonWrldAlert(false);
  };

  useFocusEffect(
    useCallback(() => {
      Orientation.lockToPortrait();

      return () => Orientation.unlockAllOrientations();
    }, []),
  );

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderGrant: evt => {
      const { locationX, locationY } = evt.nativeEvent;
      currentPath.current = `M${locationX},${locationY} `;
      setPaths(prev => [...prev, { d: currentPath.current, color }]);
    },

    onPanResponderMove: (_, gestureState) => {
      const { moveX, moveY } = gestureState;
      currentPath.current += `L${moveX},${moveY} `;
      setPaths(prev => [
        ...prev.slice(0, -1),
        { d: currentPath.current, color: prev[prev.length - 1].color },
      ]);
    },
    onPanResponderRelease: () => {},
  });

  const shareDragonDraw = async () => {
    try {
      const dragonuri = await viewShotRef.current.capture();

      const shareOptions = {
        title: `Similarity to the original: ${seldragonpnt.number}%`,
        url: dragonuri,
        type: 'image/png',
      };
      await Share.open(shareOptions);
    } catch (error) {
      if (error.message === 'User did not share') {
        console.log('Share canceled by user');
      } else {
        console.error('error', error);
      }
    }
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ flexGrow: 1 }}
      bounces={false}
    >
      <View style={styles.dragonwrldcnt}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 13,
          }}
        >
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => dragonworldnavigation.goBack()}
          >
            <ImageBackground
              source={require('../../../assets/images/dragonworldroundbtn.png')}
              style={styles.dragonworldbt}
            >
              <Image
                source={require('../../../assets/images/dragonworldbck.png')}
              />
            </ImageBackground>
          </TouchableOpacity>
        </View>

        <View style={{ alignItems: 'center' }}></View>

        <View style={styles.drawContainer}>
          <View style={styles.drawingArea} {...panResponder.panHandlers}>
            <View
              style={{
                alignItems: 'center',
                marginTop: 40,
              }}
            >
              <Text style={styles.dragonwordsimtxt}>
                {`Similarity to the original: ${seldragonpnt.number}%`}
              </Text>
            </View>

            <View style={{ alignItems: 'center' }}>
              <ViewShot
                ref={viewShotRef}
                options={{ format: 'png', quality: 1.0, result: 'tmpfile' }}
                style={{ flex: 1 }}
              >
                <ImageBackground
                  source={seldragonpnt.dragonimgbg}
                  style={{ width: 373, height: 302 }}
                >
                  <Svg width="100%" height="100%" viewBox="42 95 390 340">
                    {seldragonpnt.paths?.map((d, i) => (
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
              </ViewShot>
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: 80,
                  gap: 90,
                }}
              >
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => {
                    shareDragonDraw();
                  }}
                >
                  <ImageBackground
                    source={require('../../../assets/images/dragonworldroundbtn.png')}
                    style={styles.dragonworldbt}
                  >
                    <Image
                      source={require('../../../assets/images/dragonworldshr.png')}
                    />
                  </ImageBackground>
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => setShowDragonWrldAlert(true)}
                >
                  <ImageBackground
                    source={require('../../../assets/images/dragonworldroundbtn.png')}
                    style={styles.dragonworldbt}
                  >
                    <Image
                      source={require('../../../assets/images/dragonworldrem.png')}
                    />
                  </ImageBackground>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>

        <Modal
          visible={showDragonWrldAlert}
          animationType="slide"
          transparent={true}
        >
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <BlurView
              style={StyleSheet.absoluteFill}
              blurType="light"
              blurAmount={2}
            />

            <ImageBackground
              source={require('../../../assets/images/dragonworldonbbrd.png')}
              style={styles.dragonwrldbrd}
            >
              <Text style={styles.dragonwrldsbt}>
                {'Are you sure you want to delete this picture?'}
              </Text>

              <Text style={styles.dragonwrldsbttl}>
                Then you will have to draw it again.
              </Text>
            </ImageBackground>

            <View
              style={{
                flexDirection: 'row',
                marginTop: 43,
                gap: 90,
              }}
            >
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => {
                  handleDelDragonWrldDrawing(
                    'dragonworlddonedrawings',
                    seldragonpnt,
                  );
                }}
              >
                <ImageBackground
                  source={require('../../../assets/images/dragonworldroundbtn.png')}
                  style={styles.dragonworldbt}
                >
                  <Image
                    source={require('../../../assets/images/dragonworldyes.png')}
                  />
                </ImageBackground>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => {
                  setShowDragonWrldAlert(false);
                }}
              >
                <ImageBackground
                  source={require('../../../assets/images/dragonworldroundbtn.png')}
                  style={styles.dragonworldbt}
                >
                  <Image
                    source={require('../../../assets/images/dragonworldno.png')}
                  />
                </ImageBackground>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  dragonwrldcnt: {
    paddingTop: 64,
    backgroundColor: '#ffffff',
    flex: 1,
  },
  dragonwrldsbt: {
    fontFamily: 'SuezOne-Regular',
    fontSize: 22,
    textAlign: 'center',
    color: '#fff',
    lineHeight: 22,
  },
  dragonwrldsbttl: {
    fontFamily: 'SuezOne-Regular',
    fontSize: 15,
    textAlign: 'center',
    color: '#fff',
    lineHeight: 22,
    marginTop: 8,
  },
  dragonwrldperc: {
    fontFamily: 'SuezOne-Regular',
    fontSize: 48,
    textAlign: 'center',
    color: '#fff',
  },
  dragonwrldbrd: {
    width: 390,
    height: 230,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 30,
    marginTop: 40,
  },
  dragonworldview: {
    width: 150,
    height: 50,
    backgroundColor: 'transparent',
  },
  dragonworldbt: {
    width: 102,
    height: 104,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dragonwordsimtxt: {
    fontFamily: 'SuezOne-Regular',
    fontSize: 24,
    color: '#000',
    marginBottom: 20,
  },
});

export default Dragonwrlddtls;
