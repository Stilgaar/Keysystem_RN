import {ScrollView, Text, View} from 'react-native';
import React, { useState } from 'react';
import {GradientButton} from '../../../comps';
import {generalStyles} from '../../../Shared/css';

import { KaaS } from '../../../ContinentalUtilities/KaasMethods';

// Actions
// Ouvrir le véhicule avec mon mobile
// Mettre en route le moteur
// Fermer le véhicule

// Voyant orange sur le smartphone indiquant qu'il n'est pas encore possible pour autant de démarrer le véhicule. (éviter que quelqu'un ne s'emparer du véhicule dès que les portes sont ouvertes).
// Ce n'est donc qu'une fois à l'intérieur, qu'un récepteur vérifie la clé virtuelle du smartphone avant que le moteur ne démarre

function Actions({route}) {
  const {vehiculeGuid, virtualKeyGuid} = route.params;
  const [errorLog, setErrorLog] = React.useState("");

  const sendCommandToDevice = async (commandName) => {
    try {
      let isConnectedToDevice = await KaaS.isConnected()
      if(isConnectedToDevice){
        if(commandName !== null && commandName !== ""){
            await KaaS.sendCommand(commandName)
        } else {
          console.log("Command not send")
        }
      }
      else {
        console.log("Device not connected, trying to reconnect")
        await KaaS.connect().then(await KaaS.sendCommand(commandName))
      }
    } catch (error) {
      // Handle any errors that occurred during the fetch request
      console.error(error);
      // Set an error log if needed
      setErrorLog(error.errorMessage);
    }
  }

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
                  handlePress={async () => await sendCommandToDevice('unlock')}
                  text={`Déverouiller`}
                  /> 
                   
                <GradientButton
                  handlePress={async () => await sendCommandToDevice('lock')}
                  text={`Verouiller`}
                />
                <GradientButton
                  handlePress={async () => await sendCommandToDevice('disableImmobilizer')}
                  text={`Autoriser démarrage`}
                />
                <GradientButton
                  handlePress={async () => await sendCommandToDevice('enableImmobilizer')}
                  text={`Désactiver démarrage`}
                />
                <GradientButton
                  handlePress={async () => await sendCommandToDevice('startRemoteEngine')}
                  text={`Démarrer Moteur`}
                />
                <GradientButton
                  handlePress={async () => await sendCommandToDevice('stopRemoteEngine')}
                  text={`Arrêter Moteur`}
                />
        </View>
      </ScrollView>
    </View>
  );
}

export default Actions;
