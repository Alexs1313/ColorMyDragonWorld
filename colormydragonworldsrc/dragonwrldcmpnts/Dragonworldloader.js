import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import WebView from 'react-native-webview';
import { dragonworldhtmlldr } from '../dragonwrldcnsts/dragonworldhtmlldr';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';
import Orientation from 'react-native-orientation-locker';

const Dragonworldloader = () => {
  useFocusEffect(
    useCallback(() => {
      Orientation.lockToPortrait();

      return () => Orientation.unlockAllOrientations();
    }, []),
  );

  return (
    <ImageBackground
      source={require('../../assets/images/dragonworldbg.png')}
      style={{ flex: 1 }}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, height: 600 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.dragonworldcont}>
          <Image source={require('../../assets/images/dragonworldldr.png')} />
        </View>

        <View style={styles.dragonworldswwr}>
          <WebView
            originWhitelist={['*']}
            source={{ html: dragonworldhtmlldr }}
            style={styles.dragonworldview}
            scrollEnabled={false}
            backgroundColor="transparent"
          />
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  dragonworldcont: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dragonworldswwr: {
    position: 'absolute',
    bottom: 50,
    left: 0,
    right: 0,
    height: 50,
    alignItems: 'center',
  },
  dragonworldview: {
    width: 150,
    height: 50,
    backgroundColor: 'transparent',
  },
});

export default Dragonworldloader;
