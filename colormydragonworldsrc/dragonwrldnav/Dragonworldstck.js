import { createStackNavigator } from '@react-navigation/stack';
import Dragonworldwlcscr from '../dragonwrldscrns/royalcourtstck/Dragonworldwlcscr';
import Dragontbs from './Dragontbs';
import Dragonworldclrngscr from '../dragonwrldscrns/royalcourtstck/Dragonworldclrngscr';
import Dragonwrlddtls from '../dragonwrldscrns/royalcourtstck/Dragonwrlddtls';

const DragonWrldStack = createStackNavigator();

const Dragonworldstck = () => {
  return (
    <DragonWrldStack.Navigator screenOptions={{ headerShown: false }}>
      <DragonWrldStack.Screen
        name="Dragonworldwlcscr"
        component={Dragonworldwlcscr}
      />
      <DragonWrldStack.Screen name="Dragontbs" component={Dragontbs} />
      <DragonWrldStack.Screen
        name="Dragonworldclrngscr"
        component={Dragonworldclrngscr}
      />
      <DragonWrldStack.Screen
        name="Dragonwrlddtls"
        component={Dragonwrlddtls}
      />
    </DragonWrldStack.Navigator>
  );
};

export default Dragonworldstck;
