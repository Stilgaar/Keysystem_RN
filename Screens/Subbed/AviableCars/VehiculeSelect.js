import { View } from "react-native";
import { Avatar } from "react-native-elements";
import { greyish, generalStyles, primaryColor2 } from "../../../Shared/css";


import StyledText from "../../../Shared/StyledText";

export default function VehiculeSelect({
    vehicule,
    selectedVehicule
}) {

    const selected = selectedVehicule.vehiculeGUID === vehicule.vehiculeGUID

    return (

        <View style={{ flexDirection: "row", borderRadius: 15, }}>

            <View style={{
                flexDirection: "row",
                alignItems: "center",
                jutifyContent: "center",
                flex: 2,
                backgroundColor: selected ? primaryColor2 : "white", padding: 5
            }}>

                <View style={[generalStyles.center, generalStyles.globalShadow]}>

                    <Avatar
                        size={50}
                        rounded
                        source={{ uri: vehicule.vehiculeSRC }}
                    />

                </View>

                <View style={{ marginLeft: 10 }}>

                    <StyledText style={{ color: selected ? "white" : "black" }}>
                        {vehicule.vehiculeBrand} - {vehicule.vehiculeModel}
                    </StyledText>

                    <StyledText style={{ color: selected ? "white" : "black" }}>
                        {vehicule.vehiculeImmatriculation}
                    </StyledText>

                </View>

            </View>


            <View style={{
                flex: 1, backgroundColor: greyish, justifyContent: "flex-end", padding: 5, flexDirection: "row", alignContent: "flex-end"
            }}>

                {vehicule.vehiculeIsUsed ?

                    <StyledText>Utilisée</StyledText>

                    :

                    <StyledText>Libre</StyledText>
                }



            </View>

        </View >

    );
}

