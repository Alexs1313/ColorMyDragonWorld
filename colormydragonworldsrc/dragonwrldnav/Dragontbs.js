import Dragonworlddrwscr from '../dragonwrldscrns/royalcourttbs/Dragonworlddrwscr';
import Dragonwrldsvscr from '../dragonwrldscrns/royalcourttbs/Dragonwrldsvscr';
import Dragonworldabtscr from '../dragonwrldscrns/royalcourttbs/Dragonworldabtscr';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, ImageBackground, StyleSheet } from 'react-native';

const DragonWrldTab = createBottomTabNavigator();

const Dragontbs = () => {
  return (
    <DragonWrldTab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          position: 'absolute',
          backgroundColor: 'transparent',
          elevation: 0,
          borderTopWidth: 0,
          bottom: 20,
        },
      }}
    >
      <DragonWrldTab.Screen
        name="Dragonworlddrwscr"
        component={Dragonworlddrwscr}
        options={{
          tabBarIcon: ({ focused }) => (
            <ImageBackground
              source={require('../../assets/images/dragonworldroundbtn.png')}
              style={{
                width: 102,
                height: 102,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {!focused ? (
                <Image
                  source={require('../../assets/icons/dragonworlddraw.png')}
                  style={styles.dragonimg}
                />
              ) : (
                <Image
                  source={require('../../assets/icons/dragonworlddrawact.png')}
                  style={styles.dragonimg}
                />
              )}
            </ImageBackground>
          ),
        }}
      />
      <DragonWrldTab.Screen
        name="Dragonwrldsvscr"
        component={Dragonwrldsvscr}
        options={{
          tabBarIcon: ({ focused }) => (
            <ImageBackground
              source={require('../../assets/images/dragonworldroundbtn.png')}
              style={{
                width: 102,
                height: 102,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {!focused ? (
                <Image
                  source={require('../../assets/icons/dragonworldprog.png')}
                  style={styles.dragonimg}
                />
              ) : (
                <Image
                  source={require('../../assets/icons/dragonworldprogact.png')}
                  style={styles.dragonimg}
                />
              )}
            </ImageBackground>
          ),
        }}
      />
      <DragonWrldTab.Screen
        name="Dragonworldabtscr"
        component={Dragonworldabtscr}
        options={{
          tabBarIcon: ({ focused }) => (
            <ImageBackground
              source={require('../../assets/images/dragonworldroundbtn.png')}
              style={{
                width: 102,
                height: 102,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {!focused ? (
                <Image
                  source={require('../../assets/icons/dragonworldabout.png')}
                  style={styles.dragonimg}
                />
              ) : (
                <Image
                  source={require('../../assets/icons/dragonworldaboutact.png')}
                  style={styles.dragonimg}
                />
              )}
            </ImageBackground>
          ),
        }}
      />
    </DragonWrldTab.Navigator>
  );
};

const styles = StyleSheet.create({
  dragonimg: { width: 44, height: 44 },
});

export default Dragontbs;
