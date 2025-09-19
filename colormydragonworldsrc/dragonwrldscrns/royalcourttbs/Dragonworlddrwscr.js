import Dragonworldbck from '../../dragonwrldcmpnts/Dragonworldbck';
import { useState } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import Dragonworldcrdscrls from '../../dragonwrldcmpnts/Dragonworldcrdscrls';
import { StyleSheet, Image, View } from 'react-native';
import { Dragongrdtxt } from '../../dragonwrldcmpnts/Dragongrdtxt';

const dragonworldpnts = [
  {
    dragonwrldttl: 'Turtle',
    dragonwrldct: 'Advice from the King',
    dragonwrldim: require('../../../assets/images/dragonworldim1.png'),
    dragonwrldimsl: require('../../../assets/images/dragonworldtt.png'),
    dragonwrlddes:
      'This is a cheerful turtle with a strong shell that protects it from all dangers. It is slow, but very wise and patient. Turtles can live for over 100 years, and their shell grows with them. This little turtle loves quiet walks and sunny days.',
  },
  {
    dragonwrldttl: 'Goldfish',
    dragonwrldct: 'Advice from the Prince',
    dragonwrldim: require('../../../assets/images/dragonworldim2.png'),
    dragonwrldimsl: require('../../../assets/images/dragonworldfsh.png'),
    dragonwrlddes:
      'A goldfish with a wavy tail always looks like it’s dancing in the water. It symbolizes happiness and the fulfillment of desires. In nature, fish come in different colors and shapes, but they all move smoothly and beautifully. This fish always dreams of adventures and new friends.',
  },
  {
    dragonwrldttl: 'Bat',
    dragonwrldct: 'Advice from the Queen',
    dragonwrldim: require('../../../assets/images/dragonworldim3.png'),
    dragonwrldimsl: require('../../../assets/images/dragonworldbt.png'),
    dragonwrlddes:
      'A cute bat with big ears is not at all scary, as it may seem. In fact, it is very useful, because at night it helps to catch insects. Bats can navigate in the dark thanks to special sounds that are reflected from objects. This bat is always smiling and loves to fly under the starry sky.',
  },
  {
    dragonwrldttl: 'Dragon',
    dragonwrldct: 'Advice from the Jester',
    dragonwrldim: require('../../../assets/images/dragonworldim4.png'),
    dragonwrldimsl: require('../../../assets/images/dragonworlddr.png'),
    dragonwrlddes:
      'A kind dragon with a fiery tail looks powerful, but in fact it is very friendly. In legends, the dragon symbolizes strength and wisdom, and its flight means freedom. This dragon has big wings to fly high above the mountains, and he always smiles because he believes in goodness and friendship.',
  },
];

const Dragonworlddrwscr = () => {
  const [selectedRoyalCourtCategory, setSelectedRoyalCourtCategory] =
    useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

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
              royalCourtPropsTxt={'Coloring page'}
              style={styles.dragonwrldtxt}
            />
          </View>
        </View>

        <View style={[styles.dragonwrldcnt]}>
          <Dragonworldcrdscrls
            dragonPropCategories={dragonworldpnts}
            setCurrentIndex={setCurrentIndex}
            currentIndex={currentIndex}
            onSelect={item => {
              setSelectedRoyalCourtCategory(item.royalcourtcat);
            }}
          />
        </View>
      </View>
    </Dragonworldbck>
  );
};

const styles = StyleSheet.create({
  dragonwrldcnt: {
    padding: 5,
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
});

export default Dragonworlddrwscr;
