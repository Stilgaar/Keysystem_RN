import {View} from 'react-native';
import {generalStyles} from './css';

export default function BottomBorderContainer(props) {
  return (
    <View
      {...props}
      style={[
        generalStyles.bottomBorderContainer,
        generalStyles.globalShadow,
        props.style,
        {backgroundColor: '#fcfcfc'},
      ]}>
      {props.children}
    </View>
  );
}
