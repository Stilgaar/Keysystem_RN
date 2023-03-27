import { View } from "react-native"

import StyledText from "../../../Shared/StyledText"
import TopBorderContainer from "../../../Shared/TopBorderContainer"

import { greyish, greenblue } from "../../../Shared/css"
import BottomBorderContainer from "../../../Shared/BottomBorderContainer"

export default function HistoryNextReservation({ item }) {

    return (

        <View style={[{ flexDirection: "column", flex: 1, }]}>

            <TopBorderContainer style={{ backgroundColor: greyish }}>

                <StyledText>Véhicule {item.vehiculeBrand} {item.vehiculeModel}</StyledText>

            </TopBorderContainer>

            <BottomBorderContainer style={{ backgroundColor: greenblue }} >

                <StyledText>Date d'activation de la clef : {item.virtualKeyDateActivated}</StyledText>

            </BottomBorderContainer>

        </View>
    )
}