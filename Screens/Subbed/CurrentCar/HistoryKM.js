import { Text } from "react-native";

import { generalStyles } from "../../../Shared/css";

import { TextInfo } from "../../../comps";

import { vehiculeKmArray } from "../../../JSON/Fr/CurrentVehiculeArray";

// Historique des relevés kilométriques
// Nombre de km effectués depuis l'obtention du véhicule
// Nombre de KM par jour / par mois


function HistoryKM({ data }) {
    return (

        <>
            <Text style={generalStyles.titleInfo}>Historique Kilomètriques</Text>
            <TextInfo array={vehiculeKmArray} data={data} />
        </>

    );
}

export default HistoryKM;