import { BlurView } from '@react-native-community/blur';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useCallback, useRef, useState } from 'react';
import {
  Alert,
  Image,
  ImageBackground,
  Modal,
  PanResponder,
  Share,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { Text } from 'react-native-gesture-handler';
import Svg, { Path } from 'react-native-svg';
import WebView from 'react-native-webview';
import { dragonworldhtmlldr } from '../../dragonwrldcnsts/dragonworldhtmlldr';
import Orientation from 'react-native-orientation-locker';
import ColorPicker from 'react-native-wheel-color-picker';
import { useDragonWorldContext } from '../../dragonworldstr/dragonworldcntx';

const Dragonworldclrngscr = ({ route }) => {
  const seldragonpnt = route.params;
  const dragonworldnavigation = useNavigation();
  const [paths, setPaths] = useState(
    seldragonpnt.paths || [{ d: '', color: '#a205f0ff' }],
  );
  const [shwDragonModal, setShwDragonModal] = useState(false);
  const [isCmplDragonPnt, setIsCmplDragonPnt] = useState(false);
  const [isLoadingDragonDraw, setIsLoadingDragonDraw] = useState(false);
  const [showDragonRes, setShowDragonRes] = useState(false);
  const [color, setColor] = useState('#a205f0ff');
  const [isVsblColorPicker, setIsVsblColorPicker] = useState(false);
  const { saveDragonWorldDrawing } = useDragonWorldContext();

  const currentPath = useRef('');
  const [opacity, setOpacity] = useState(1);
  const [number, setNumber] = useState(null);

  const handleSaveDragonWrldDrawing = dragonKEY => {
    if (paths.length === 0) return;

    const newDrawing = {
      paths,
      dragonimgbg: seldragonpnt.dragonwrldimsl,
      dragonname: seldragonpnt.dragonwrldttl,
      id: Date.now(),
      number,
    };

    saveDragonWorldDrawing(dragonKEY, newDrawing);
    setPaths([]);
  };

  const generateRandomNumber = () => {
    const randomNum = Math.floor(Math.random() * (90 - 30 + 1)) + 30;
    setNumber(randomNum);
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

    onPanResponderMove: evt => {
      const { locationX, locationY } = evt.nativeEvent;
      currentPath.current += `L${locationX},${locationY} `;
      setPaths(prev => [
        ...prev.slice(0, -1),
        { d: currentPath.current, color: prev[prev.length - 1].color },
      ]);
    },

    onPanResponderRelease: () => {},
  });

  const shareDragonWrldDrawResult = async () => {
    try {
      await Share.share({
        message: `Your work is similar to the sample: ${number}%`,
      });
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  return (
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
          onPress={() => setShwDragonModal(true)}
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

        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            setShwDragonModal(true), setIsCmplDragonPnt(true);
            generateRandomNumber();
          }}
        >
          <ImageBackground
            source={require('../../../assets/images/dragonworldroundbtn.png')}
            style={styles.dragonworldbt}
          >
            <Image
              source={require('../../../assets/images/dragonworldldcheck.png')}
            />
          </ImageBackground>
        </TouchableOpacity>
      </View>

      <View style={styles.drawContainer}>
        <View style={styles.dragondrawingArea} {...panResponder.panHandlers}>
          <View
            style={{
              alignItems: 'center',
              marginTop: 120,
            }}
          >
            <Image
              source={seldragonpnt.dragonimgbg || seldragonpnt.dragonwrldimsl}
              style={[styles.backgroundImage, { opacity }]}
              resizeMode="cover"
            />
          </View>

          <Svg style={StyleSheet.absoluteFill}>
            {paths.map((p, index) => (
              <Path
                key={index}
                d={p.d}
                stroke={p.color}
                strokeWidth={3}
                fill="none"
                strokeLinejoin="round"
                strokeLinecap="round"
              />
            ))}
          </Svg>
        </View>
      </View>

      <View
        style={{
          alignItems: 'center',
        }}
      >
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={() => setIsVsblColorPicker(true)}
          style={{ alignItems: 'center', justifyContent: 'center' }}
        >
          <Image
            source={require('../../../assets/images/dragonworldpickbtn.png')}
          />
          <View
            style={{
              width: 62,
              height: 62,
              backgroundColor: color,
              borderRadius: 50,
              position: 'absolute',
            }}
          />
        </TouchableOpacity>

        {isVsblColorPicker && (
          <View style={styles.dragonworldpicker}>
            <View style={styles.dragonwordpick}>
              <ColorPicker
                color={color}
                onColorChangeComplete={setColor}
                thumbSize={30}
                sliderSize={30}
                // noSnap={true}
                // row={false}
                // swatches={false}
              />
            </View>

            <TouchableOpacity
              style={{ position: 'absolute', right: 13, top: 20 }}
              activeOpacity={0.6}
              onPress={() => setIsVsblColorPicker(false)}
            >
              <Image
                source={require('../../../assets/images/dragonworldclspick.png')}
              />
            </TouchableOpacity>
          </View>
        )}
      </View>

      <Modal visible={shwDragonModal} animationType="slide" transparent={true}>
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

          {showDragonRes && (
            <View style={styles.dragonworldshdw}>
              <Image
                source={require('../../../assets/images/dragonworldcompimg.png')}
                style={{ borderRadius: 12 }}
              />
            </View>
          )}

          {isLoadingDragonDraw && (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginHorizontal: 3,
              }}
            >
              <View style={styles.dragonworldsh}>
                <Image
                  source={seldragonpnt.dragonwrldim}
                  style={styles.dragonworldcompareimg}
                />
              </View>

              <WebView
                originWhitelist={['*']}
                source={{ html: dragonworldhtmlldr }}
                style={styles.dragonworldview}
                scrollEnabled={false}
                backgroundColor="transparent"
              />
              <View style={styles.dragonworldsh}>
                <Image
                  source={seldragonpnt.dragonwrldimsl}
                  style={styles.dragonworldcompareimg}
                />
              </View>
            </View>
          )}

          <ImageBackground
            source={require('../../../assets/images/dragonworldonbbrd.png')}
            style={styles.dragonwrldbrd}
          >
            {isLoadingDragonDraw ? (
              <Text style={styles.dragonwrldsbt}>
                Comparison in progress, wait...
              </Text>
            ) : (
              <Text style={styles.dragonwrldsbt}>
                {isCmplDragonPnt &&
                  !showDragonRes &&
                  'Are you sure the work is complete?'}
              </Text>
            )}

            {!isLoadingDragonDraw && !isCmplDragonPnt && (
              <Text style={styles.dragonwrldsbt}>
                {'Do you want to save progress?'}
              </Text>
            )}

            {showDragonRes && (
              <>
                <Text style={styles.dragonwrldsbt}>
                  Your work is similar to the sample:
                </Text>
                <Text style={styles.dragonwrldperc}>{number}%</Text>
              </>
            )}

            {!isCmplDragonPnt && (
              <TouchableOpacity
                activeOpacity={0.6}
                style={styles.dragonworldbckbtn}
                onPress={() => {
                  dragonworldnavigation.goBack(), setShwDragonModal(false);
                  setIsCmplDragonPnt(false);
                }}
              >
                <Text style={styles.dragonwrldbck}>Back</Text>
              </TouchableOpacity>
            )}
          </ImageBackground>

          {!isLoadingDragonDraw && (
            <>
              {showDragonRes ? (
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
                      dragonworldnavigation.popToTop(),
                        setShwDragonModal(false);
                    }}
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
                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => {
                      shareDragonWrldDrawResult();
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
                </View>
              ) : (
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
                      if (isCmplDragonPnt) {
                        setIsLoadingDragonDraw(true);

                        handleSaveDragonWrldDrawing('dragonworlddonedrawings');
                        setTimeout(() => {
                          setIsLoadingDragonDraw(false);
                          setShowDragonRes(true);
                        }, 4000);
                      } else {
                        handleSaveDragonWrldDrawing(
                          'dragonworldinprogressdrawings',
                        );
                        setShwDragonModal(false);
                        dragonworldnavigation.popToTop();
                      }
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
                      dragonworldnavigation.popToTop(),
                        setShwDragonModal(false);
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
              )}
            </>
          )}
        </View>
      </Modal>
    </View>
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
    height: 50,
    backgroundColor: 'transparent',
  },
  dragonworldbt: {
    width: 102,
    height: 104,
    alignItems: 'center',
    justifyContent: 'center',
  },
  drawContainer: {
    height: '74%',
    width: '100%',
  },
  dragondrawingArea: {
    flex: 1,
    backgroundColor: '#ffffff',
    overflow: 'hidden',
  },
  backgroundImage: {
    opacity: 0.5,
    width: 373,
    height: 342,
  },
  dragonwrldbck: {
    fontFamily: 'SuezOne-Regular',
    fontSize: 15,
    color: '#fff',
  },
  dragonworldbckbtn: {
    position: 'absolute',
    right: 25,
    top: 25,
  },
  dragonworldcompareimg: {
    width: 151,
    height: 151,
    borderRadius: 12,
    borderWidth: 2,
  },
  dragonworldshdw: {
    shadowColor: '#000',
    shadowOffset: { width: 5, height: 18 },
    shadowOpacity: 0.5,
    shadowRadius: 18,
    elevation: 10,
  },
  dragonwordpick: {
    width: '90%',
    paddingBottom: 20,
    paddingTop: 30,
  },
  dragonworldpicker: {
    position: 'absolute',
    alignItems: 'center',
    top: -350,
    shadowColor: '#000',
    shadowOffset: { width: 5, height: 14 },
    shadowOpacity: 0.4,
    shadowRadius: 19,
    elevation: 10,
    backgroundColor: '#fff',
    borderRadius: 12,
  },
  dragonworldsh: {
    shadowColor: '#000',
    shadowOffset: { width: 4, height: 6 },
    shadowOpacity: 0.6,
    shadowRadius: 4,
    elevation: 10,
  },
});

export default Dragonworldclrngscr;
