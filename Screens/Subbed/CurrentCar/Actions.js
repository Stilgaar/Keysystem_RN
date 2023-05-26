import {ScrollView, Text, View} from 'react-native';

import {GradientButton} from '../../../comps';
import {generalStyles} from '../../../Shared/css';

// Actions
// Ouvrir le véhicule avec mon mobile
// Mettre en route le moteur
// Fermer le véhicule

// Voyant orange sur le smartphone indiquant qu'il n'est pas encore possible pour autant de démarrer le véhicule. (éviter que quelqu'un ne s'emparer du véhicule dès que les portes sont ouvertes).
// Ce n'est donc qu'une fois à l'intérieur, qu'un récepteur vérifie la clé virtuelle du smartphone avant que le moteur ne démarre

function Actions({route}) {
  const {vehiculeGUID, virtualKeyGUID} = route.params;

  return (
    <View style={[generalStyles.container]}>
      <ScrollView contentContainerStyle={generalStyles.scrollViewStyle}>
        <View
          style={{
            marginTop: 20,
            flexDirection: 'column',
            justifyContent: 'center',
            gap: 10,
          }}>
          <GradientButton
            handlePress={() => console.log('poeut')}
            text="Klaxonner"
          />

          <GradientButton
            handlePress={() => console.log('Appel di Phares')}
            text="Phares"
          />

          <GradientButton
            handlePress={() => console.log('Action Open')}
            text="Ouvrir"
          />

          <GradientButton
            handlePress={() => console.log('Action Close')}
            text="Fermer"
          />

          <GradientButton
            handlePress={() => console.log('Action Start')}
            text="Démarer"
          />
        </View>
      </ScrollView>
    </View>
  );
}

export default Actions;
