import {Dimensions, StyleSheet, View} from 'react-native';
import {GesturePath, GestureRecorder} from '../../../Functions/DrawSVG';

import {DispatchContext} from '../../../Context/StateContext';
import {GradientButton} from '../../../comps';
import React from 'react';
import {addSignature} from '../../../Reducer/GlobalReducer/globalDispatch';

// GesturePath : Function go get the path drawn
// GestureRecorder : Function to get the x / y positions

function AddSignature({navigation}) {
  const {globalDispatch} = React.useContext(DispatchContext);

  const [path, setPath] = React.useState([]);

  const handleSave = async () => {
    const d = path.reduce((acc, point, i) => {
      const command = i === 0 ? 'M' : 'L';
      return `${acc} ${command} ${point.x} ${point.y}`;
    }, '');

    const {width, height} = Dimensions.get('window');
    const points = path?.map(p => `${p.x},${p.y}`).join(' ');

    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width='200' height='200' viewBox='0 0 ${
      width / 10
    } ${height}' >
            <polyline points='${points}' fill='none' stroke='black' stroke-width='3' />
          </svg>`;

    globalDispatch(addSignature(svg));
    navigation.goBack();
  };

  return (
    <>
      <View style={StyleSheet.absoluteFill}>
        <GesturePath path={path} color={`black`} />

        <GestureRecorder
          onPathChanged={setPath}
          reset={path.length > 0 ? true : false}
        />
      </View>

      <View
        style={[
          styles.buttonsSignature,
          {
            flexDirection: 'row',
            justifyContent: 'center',
            gap: 5,
            paddingBottom: 10,
          },
        ]}>
        <GradientButton
          width={150}
          text={`Sauvegarder`}
          handlePress={handleSave}
        />

        <GradientButton
          width={180}
          text={`recommencer`}
          handlePress={() => setPath([])}
        />
      </View>
    </>
  );
}

export default AddSignature;

const styles = StyleSheet.create({
  buttonsSignature: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
});
