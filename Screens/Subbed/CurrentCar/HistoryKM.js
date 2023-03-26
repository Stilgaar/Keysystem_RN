import { Text, View, Dimensions } from "react-native";

import { generalStyles, greyish } from "../../../Shared/css";
import { vehiculeKmArray } from "../../../JSON/Fr/CurrentVehiculeArray";

import BottomBorderContainer from "../../../Shared/BottomBorderContainer";
import TopBorderContainer from "../../../Shared/TopBorderContainer";
import StyledText from "../../../Shared/StyledText";

// Historique des relevés kilométriques
// Nombre de km effectués depuis l'obtention du véhicule
// Nombre de KM par jour / par mois


export default function HistoryKM({
    data,
    style,
}) {

    const { width } = Dimensions.get('window');
    const itemWidth = width / vehiculeKmArray.length;

    return (
        <>

            <View style={{ flexDirection: "row", justifyContent: "center" }}>

                {vehiculeKmArray.map(info => (

                    <View key={info.key} style={{ width: itemWidth }}>

                        <TopBorderContainer style={[style, {
                            flexDirection: "row",
                            justifyContent: "space-between",
                            backgroundColor: greyish,
                            alignItems: "center",
                        }]}>


                            <StyledText style={{ fontSize: 13 }}>

                                {data?.[`${info.key}`]}

                            </StyledText>

                        </TopBorderContainer>


                        <BottomBorderContainer style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                            backgroundColor: "white",
                        }}>

                            <StyledText style={{ fontSize: 15 }}>

                                {info.text}

                            </StyledText>


                        </BottomBorderContainer>
                    </View>

                ))}
            </View>

        </>

    );
}
