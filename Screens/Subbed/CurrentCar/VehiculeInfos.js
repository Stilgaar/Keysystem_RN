import { Text } from "react-native";

import { TextInfo } from "../../../comps";

import { vehicleInfoArray } from "../../../JSON/Fr/CurrentVehiculeArray"

import { generalStyles } from "../../../Shared/css";

function VehiculesInfo({ data }) {

    return (

        <>
            <Text style={generalStyles.titleInfo}>Information générales</Text>
            <TextInfo array={vehicleInfoArray} data={data} />
        </>
    );
}

export default VehiculesInfo;