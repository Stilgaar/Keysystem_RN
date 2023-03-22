import { View, Text } from "react-native";

import { generalStyles } from "../../../Shared/css";

import { GradientButton } from "../../../comps";


// Actions
// Ouvrir le véhicule avec mon mobile
// Mettre en route le moteur
// Fermer le véhicule

// Voyant orange sur le smartphone indiquant qu'il n'est pas encore possible pour autant de démarrer le véhicule. (éviter que quelqu'un ne s'emparer du véhicule dès que les portes sont ouvertes).
// Ce n'est donc qu'une fois à l'intérieur, qu'un récepteur vérifie la clé virtuelle du smartphone avant que le moteur ne démarre


function Actions({ route }) {

    const { vehiculeGUID, virtualKeyGUID } = route.params

    return (

        <View style={[generalStyles.container]}>

            <Text style={generalStyles.title}>Activation Voiture</Text>

            <View style={{ marginTop: 20, flexDirection: "row", justifyContent: "center" }}>

                <GradientButton
                    handlePress={() => console.log('poeut')}
                    text="Klaxoner"
                    paddingVertical={20}
                    paddingHorizontal={10}
                    borderRadius={20}
                    width={120} />

                <GradientButton
                    handlePress={() => console.log('Appel di Phares')}
                    text="Phares"
                    paddingVertical={20}
                    paddingHorizontal={10}
                    borderRadius={20}
                    width={120} />

            </View>


            <View style={{ marginTop: 20, flexDirection: "row", justifyContent: "center" }}>

                <GradientButton
                    handlePress={() => console.log('Action Open')}
                    text="Ouvrir"
                    paddingVertical={30}
                    paddingHorizontal={20}
                    borderRadius={100}
                    width={150} />


                <GradientButton
                    handlePress={() => console.log('Action Close')}
                    text="Fermer"
                    paddingVertical={30}
                    paddingHorizontal={20}
                    borderRadius={100}
                    width={150} />

            </View>

            <View style={{ marginTop: 20 }}>

                <GradientButton
                    handlePress={() => console.log('Action Start')}
                    text="Démarer"
                    paddingVertical={30}
                    paddingHorizontal={20}
                    borderRadius={100} />

            </View>

        </View>

    );
}

export default Actions;