import {
  StyleSheet,
  Text,
  View as DragonView,
  Image,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import Dragonworldbck from '../../dragonwrldcmpnts/Dragonworldbck';
import { dragonworldwelcomeslides } from '../../dragonwrldcnsts/dragonworldwelcomeslides';
import { Dragongrdtxt } from '../../dragonwrldcmpnts/Dragongrdtxt';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

const Dragonworldwlcscr = () => {
  const [dragonWorldCSctn, setDragonWorldCSctn] = useState(0);

  const dragonworldnavigation = useNavigation();
  const nextDragonWorldSld = () => {
    dragonWorldCSctn === 3
      ? dragonworldnavigation.replace('Dragontbs')
      : setDragonWorldCSctn(dragonWorldCSctn + 1);
  };

  return (
    <Dragonworldbck>
      <DragonView style={styles.dragonwrldcnt}>
        <Image
          source={dragonworldwelcomeslides[dragonWorldCSctn].dragonworldim}
        />

        <ImageBackground
          source={require('../../../assets/images/dragonworldonbbrd.png')}
          style={styles.dragonwrldbrd}
        >
          <Dragongrdtxt
            royalCourtPropsTxt={
              dragonworldwelcomeslides[dragonWorldCSctn].dragonworldtxt
            }
            style={styles.dragonwrldtxt}
          />
          <Text style={styles.dragonwrldsbt}>
            {dragonworldwelcomeslides[dragonWorldCSctn].dragonworldsbt}
          </Text>
        </ImageBackground>

        <TouchableOpacity activeOpacity={0.6} onPress={nextDragonWorldSld}>
          <ImageBackground
            source={require('../../../assets/images/dragonworldroundbtn.png')}
            style={styles.dragonwrldbtn}
          >
            <Image
              source={require('../../../assets/images/dragonworldnxt.png')}
            />
          </ImageBackground>
        </TouchableOpacity>
      </DragonView>
    </Dragonworldbck>
  );
};

const styles = StyleSheet.create({
  dragonwrldcnt: {
    padding: 5,
    alignItems: 'center',
    paddingTop: 80,
  },
  dragonwrldtxt: {
    fontFamily: 'SuezOne-Regular',
    fontSize: 22,
    textAlign: 'center',
  },
  dragonwrldsbt: {
    fontFamily: 'SuezOne-Regular',
    fontSize: 15,
    textAlign: 'center',
    color: '#fff',
    marginTop: 42,
    lineHeight: 22,
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
  dragonwrldbtn: {
    width: 102,
    height: 102,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
});

export default Dragonworldwlcscr;
