import { View, Text } from "react-native"

export default function HistoryNextReservation({ item }) {

    return (
        <View>
            <Text>Véhicule : {item.vehiculeBrand} {item.vehiculeModel}</Text>
            <Text>Date d'ativation de la clef : {item.virtualKeyDateActivated}</Text>
            <Text></Text>
        </View>
    )
}