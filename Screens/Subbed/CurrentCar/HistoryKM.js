import { Text, View } from "react-native";

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

    return (
        <>
            <TopBorderContainer style={[style, {
                flexDirection: "row",
                justifyContent: "space-between",
                backgroundColor: greyish,
                alignItems: "center",
                paddingLeft: 30,
                paddingRight: 30
            }]}>

                {vehiculeKmArray.map(info => (

                    <StyledText style={{ fontSize: 25 }}

                        key={info.text}>{data?.[`${info.key}`]}

                    </StyledText>

                ))}

            </TopBorderContainer>

            <BottomBorderContainer style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                backgroundColor: "white",
                marginBottom: 5,
                paddingLeft: 30,
                paddingRight: 30
            }}>

                {vehiculeKmArray.map(info => (

                    <StyledText style={{ fontSize: 15 }} key={info.text}>

                        {info.text}

                    </StyledText>

                ))}

            </BottomBorderContainer>
        </>

    );
}
