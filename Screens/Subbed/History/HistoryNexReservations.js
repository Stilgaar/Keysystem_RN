import { View } from "react-native"

import StyledText from "../../../Shared/StyledText"

export default function HistoryNextReservation({ item }) {

    return (
        <View>
            <StyledText>Véhicule : {item.vehiculeBrand} {item.vehiculeModel}</StyledText>
            <StyledText>Date d'ativation de la clef : {item.virtualKeyDateActivated}</StyledText>
        </View>
    )
}