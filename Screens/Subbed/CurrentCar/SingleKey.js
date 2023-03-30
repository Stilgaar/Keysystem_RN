import { TouchableOpacity, View } from "react-native"
import StyledText from "../../../Shared/StyledText"

import { generalStyles, primaryColor2 } from "../../../Shared/css";

import Octicons from 'react-native-vector-icons/Octicons';

import TopBorderContainer from "../../../Shared/TopBorderContainer";
import BottomBorderContainer from "../../../Shared/BottomBorderContainer";


export default function SingleKey({
    vehicule,
    navigation
}) {

    return (

        <TouchableOpacity
            key={vehicule.virtualKeyGUID}
            style={[generalStyles.globalShadow, { margin: 3 }]}
            onPress={() => {
                navigation.navigate("SelectedVehicule", { virtualKeyGUID: vehicule.virtualKeyGUID, vehiculeGUID: vehicule.vehiculeGUID })
            }}>

            <TopBorderContainer
                style={{ backgroundColor: primaryColor2, flexDirection: "row" }}
            >

                <View style={{ flex: 0.3 }}>
                    <Octicons name="key" size={30} color="white" />
                </View>

                <View style={{ flex: 2 }}>
                    <StyledText style={{ textAlign: "center", color: "white", fontSize: 30 }}>
                        {vehicule.vehiculeBrand} {vehicule.vehiculeModel}
                    </StyledText>
                </View>


                <View style={{ flex: 0.3 }}>

                    <Octicons name="check-circle" size={30} color="white" />

                </View>
            </TopBorderContainer>

            <BottomBorderContainer style={{ backgroundColor: "white" }}>

                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>

                    <StyledText style={{ fontSize: 18 }}>Clef : {vehicule.virtualKeyGUID}</StyledText>

                    <StyledText style={{ fontSize: 18 }}>{vehicule.vehiculeImmatriculation}</StyledText>

                </View>

            </BottomBorderContainer>

        </TouchableOpacity >)

}