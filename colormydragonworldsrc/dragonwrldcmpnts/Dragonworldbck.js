import { ImageBackground, ScrollView } from 'react-native';

const Dragonworldbck = ({ children }) => {
  return (
    <ImageBackground
      source={require('../../assets/images/dragonworldbg.png')}
      style={{ flex: 1 }}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
        bounces={false}
      >
        {children}
      </ScrollView>
    </ImageBackground>
  );
};

export default Dragonworldbck;
