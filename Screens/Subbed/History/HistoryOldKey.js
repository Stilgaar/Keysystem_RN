import { View, Text } from "react-native"

export default function HistoryOldKey({ item }) {


    return (
        <View>

            <Text>Véhicule {item.vehiculeBrand} {item.vehiculeModel}</Text>
            <Text>Date d'ativation de la clef : {item.virtualKeyDateActivated}</Text>
            <Text>Date de désactivation de la clef : {item.virtualKeyDateDesactivated}</Text>

        </View>
    )
}