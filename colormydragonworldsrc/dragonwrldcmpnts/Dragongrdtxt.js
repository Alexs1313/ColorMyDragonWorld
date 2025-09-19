import MaskedView from '@react-native-masked-view/masked-view';
import { Text } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

export const Dragongrdtxt = ({ royalCourtPropsTxt, style }) => {
  return (
    <MaskedView
      maskElement={
        <Text style={[style, { backgroundColor: 'transparent' }]}>
          {royalCourtPropsTxt}
        </Text>
      }
    >
      <LinearGradient
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
        <Text style={[style, { opacity: 0 }]}>{royalCourtPropsTxt}</Text>
      </LinearGradient>
    </MaskedView>
  );
};
