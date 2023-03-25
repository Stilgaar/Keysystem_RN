import StyledText from "../../../Shared/StyledText";

import { View, Image } from "react-native";

import { GradientButton } from "../../../comps";

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import { generalStyles, greyish } from "../../../Shared/css";

import BottomBorderContainer from "../../../Shared/BottomBorderContainer";
import TopBorderContainer from "../../../Shared/TopBorderContainer";

function VehiculesInfo({
    globalState,
    navigation,
    style
}) {

    return (

        <>
            <TopBorderContainer style={[style, { backgroundColor: greyish }]}>

                <View style={{ justifyContent: "center", alignItems: "center" }}>

                    <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>

                        <View style={{ flex: 0.5, justifyContent: "center", alignItems: "center" }}>

                            <View style={{ flexDirection: "row", justifyContent: "space-around" }}>

                                <View style={{ marginRight: 10 }}>

                                    <FontAwesome5 name={"file-contract"} size={25} color={"black"} />
                                </View>

                                <View>

                                    <StyledText>{globalState.currentCar?.[0]?.vehiculeContractType}</StyledText>
                                    <StyledText>{globalState.currentCar?.[0]?.vehiculeContractRenter}</StyledText>

                                </View>

                            </View>

                        </View>

                        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>

                            {globalState.currentCar.length > 0 && globalState.currentCar[0].vehiculeSRC ?

                                <Image source={{ uri: `${globalState.currentCar[0].vehiculeSRC}` }}
                                    style={{ width: 70, height: 70, borderRadius: 50 }}
                                />
                                :
                                <MaterialCommunityIcons name={"car"} size={50} color={"black"} />

                            }
                        </View>

                        <View style={{ flex: 0.5, justifyContent: "center", alignItems: "center" }}>

                            {(globalState?.currentCar?.[0]?.vehiculeType === "Electrique" || globalState.currentCar?.[0]?.vehiculeType === "Hybride") &&
                                <MaterialCommunityIcons name={"car-electric"} size={30} color={"black"} />
                            }

                            {(globalState?.currentCar?.[0]?.vehiculeType === "Essence" || globalState.currentCar?.[0]?.vehiculeType === "Hybride") &&
                                <MaterialCommunityIcons name={"gas-station"} size={30} color={"black"} />
                            }

                        </View>

                    </View>

                </View>

            </TopBorderContainer>

            <BottomBorderContainer style={[globalState.center,
            { flexDirection: 'row', marginBottom: 5, backgroundColor: "white" }]}>

                <View style={{ flex: 0.5, justifyContent: "center", alignItems: "center" }}>

                    <GradientButton width={60}
                        borderRadius={50}
                        buttonPadding={5}
                        handlePress={() => navigation.navigate("CarMap")}>

                        <MaterialCommunityIcons name={"target"} size={25} color={"black"} />

                    </GradientButton>

                </View>

                <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>

                    <StyledText style={{ fontSize: 20, textAlign: "center" }}>

                        {globalState.currentCar?.[0]?.vehiculeBrand} - {globalState.currentCar?.[0]?.vehiculeModel}

                    </StyledText>

                    <StyledText style={{ textAlign: "center" }}>

                        {globalState.currentCar?.[0]?.vehiculeImmatriculation}

                    </StyledText>
                </View>

                <View style={{ flex: 0.5, justifyContent: "center", alignItems: "center" }}>

                    <GradientButton width={60}
                        borderRadius={50}
                        buttonPadding={5}
                        handlePress={() => navigation.navigate("VirtualPouch")}>

                        <MaterialCommunityIcons name={"file-document-multiple"} size={25} color={"black"} />

                    </GradientButton>

                </View>

            </BottomBorderContainer>

        </>
    );
}

export default VehiculesInfo;