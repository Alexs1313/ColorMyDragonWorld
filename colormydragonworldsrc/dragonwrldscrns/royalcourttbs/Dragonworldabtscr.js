import Dragonworldbck from '../../dragonwrldcmpnts/Dragonworldbck';
import LinearGradient from 'react-native-linear-gradient';
import {
  StyleSheet,
  Image,
  View,
  Text,
  TouchableOpacity,
  Share,
  Alert,
} from 'react-native';
import { Dragongrdtxt } from '../../dragonwrldcmpnts/Dragongrdtxt';

const Dragonworldabtscr = () => {
  const shrDragonWorldAbtinf = async () => {
    try {
      await Share.share({
        message: `Color My Dragon World is a fabulous coloring world where you can
                bring a turtle, a fish, a bat and a kind dragon to life. Create
                your own colorful masterpieces, save your progress and get
                grades for completed works`,
      });
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  return (
    <Dragonworldbck>
      <View style={{ paddingBottom: 120 }}>
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
              royalCourtPropsTxt={'About'}
              style={styles.dragonwrldtxt}
            />
          </View>
        </View>

        <View style={[styles.dragonwrldcnt]}>
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
                  source={require('../../../assets/images/dragonworldldrout.png')}
                />
              </View>

              <Text style={styles.dragonsbt}>
                Color My Dragon World is a fabulous coloring world where you can
                bring a turtle, a fish, a bat and a kind dragon to life. Create
                your own colorful masterpieces, save your progress and get
                grades for completed works
              </Text>

              {/* <Dragongrdtxt
                                  royalCourtPropsTxt={'Start'}
                                  style={styles.dragonwrldtxt}
                                /> */}

              <TouchableOpacity
                activeOpacity={0.7}
                onPress={shrDragonWorldAbtinf}
              >
                <Text style={[styles.dragoncrdttl]}>Share</Text>
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </View>
      </View>
    </Dragonworldbck>
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
  dragonsbt: {
    fontFamily: 'SuezOne-Regular',
    fontSize: 24,
    color: '#fff',
    textAlign: 'center',
    lineHeight: 25,
    marginBottom: 8,
    marginTop: 15,
  },
  dragoncrdttl: {
    fontFamily: 'SuezOne-Regular',
    fontSize: 32,
    textAlign: 'center',
    color: '#F0B706',
    marginTop: 12,
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

export default Dragonworldabtscr;
