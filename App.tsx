import { NavigationContainer as DragonWrldAppNavigationContainer } from '@react-navigation/native';
import Dragonworldstck from './colormydragonworldsrc/dragonwrldnav/Dragonworldstck';
import { DragonCtxProvider } from './colormydragonworldsrc/dragonworldstr/dragonworldcntx';
import { useEffect, useState } from 'react';
import Dragonworldloader from './colormydragonworldsrc/dragonwrldcmpnts/Dragonworldloader';

const App = () => {
  const [isVsblDragonWorldStack, setIsVsblDragonWorldStack] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsVsblDragonWorldStack(true);
    }, 5000);
  }, []);

  return (
    <DragonWrldAppNavigationContainer>
      <DragonCtxProvider>
        {isVsblDragonWorldStack ? <Dragonworldstck /> : <Dragonworldloader />}
      </DragonCtxProvider>
    </DragonWrldAppNavigationContainer>
  );
};

export default App;
