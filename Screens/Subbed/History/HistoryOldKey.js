import { View } from "react-native"

import StyledText from "../../../Shared/StyledText"

export default function HistoryOldKey({ item }) {


    return (
        <View>

            <StyledText>Véhicule {item.vehiculeBrand} {item.vehiculeModel}</StyledText>
            <StyledText>Date d'ativation de la clef : {item.virtualKeyDateActivated}</StyledText>
            <StyledText>Date de désactivation de la clef : {item.virtualKeyDateDesactivated}</StyledText>

        </View>
    )
}