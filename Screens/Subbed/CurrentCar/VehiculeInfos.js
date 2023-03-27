import StyledText from "../../../Shared/StyledText";

import { View, Image } from "react-native";

import { GradientButton } from "../../../comps";

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import { generalStyles, greyish } from "../../../Shared/css";

import BottomBorderContainer from "../../../Shared/BottomBorderContainer";
import TopBorderContainer from "../../../Shared/TopBorderContainer";

function VehiculesInfo({
    vehicule,
    navigation,
    style,
    bgcolor = greyish,
    type
}) {

    return (

        <>
            <TopBorderContainer style={[style, { backgroundColor: bgcolor }]}>

                <View style={{ justifyContent: "center", alignItems: "center" }}>

                    <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>

                        <View style={{ flex: 0.5, justifyContent: "center", alignItems: "center" }}>

                            <View style={{ flexDirection: "row", justifyContent: "space-around" }}>

                                <View style={{ marginRight: 10 }}>

                                    <FontAwesome5 name={"file-contract"} size={25} color={"black"} />
                                </View>

                                <View>

                                    <StyledText>{vehicule?.vehiculeContractType}</StyledText>
                                    <StyledText>{vehicule?.vehiculeContractRenter}</StyledText>

                                </View>

                            </View>

                        </View>

                        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>

                            {vehicule?.vehiculeSRC ?

                                <Image source={{ uri: `${vehicule.vehiculeSRC}` }}
                                    style={{ width: 70, height: 70, borderRadius: 50 }}
                                />
                                :
                                <MaterialCommunityIcons name={"car"} size={50} color={"black"} />

                            }
                        </View>

                        <View style={{ flex: 0.5, justifyContent: "center", alignItems: "center" }}>

                            {vehicule && (vehicule?.vehiculeType === "Electrique" || vehicule.vehiculeType === "Hybride") &&

                                <MaterialCommunityIcons name={"car-electric"} size={30} color={"black"} />
                            }

                            {vehicule && (vehicule?.vehiculeType === "Essence" || vehicule.vehiculeType === "Hybride") &&

                                <MaterialCommunityIcons name={"gas-station"} size={30} color={"black"} />
                            }

                        </View>

                    </View>

                </View>

            </TopBorderContainer>

            <BottomBorderContainer style={[generalStyles.center,
            { flexDirection: 'row', marginBottom: 5, backgroundColor: "white" }]}>

                {type !== 'fromSelectCar' &&

                    <View style={{ flex: 0.5, justifyContent: "center", alignItems: "center" }}>

                        <GradientButton width={60}
                            borderRadius={50}
                            buttonPadding={5}
                            handlePress={() => navigation.navigate("CarMap")}>

                            <MaterialCommunityIcons name={"target"} size={25} color={"black"} />

                        </GradientButton>

                    </View>
                }

                <View style={{ flex: 1, justifyContent: type !== 'fromSelectCar' ? "center" : "space-between", alignItems: "center", flexDirection: type !== 'fromSelectCar' ? "column" : "row" }}>

                    <StyledText style={{ fontSize: 20, textAlign: "center" }}>

                        {vehicule?.vehiculeBrand} - {vehicule?.vehiculeModel}

                    </StyledText>

                    <StyledText style={{ textAlign: "center" }}>

                        {vehicule?.vehiculeImmatriculation}

                    </StyledText>
                </View>

                {type !== 'fromSelectCar' &&

                    <View style={{ flex: 0.5, justifyContent: "center", alignItems: "center" }}>

                        <GradientButton width={60}
                            borderRadius={50}
                            buttonPadding={5}
                            handlePress={() => navigation.navigate("VirtualPouch")}>

                            <MaterialCommunityIcons name={"file-document-multiple"} size={25} color={"black"} />

                        </GradientButton>

                    </View>
                }

            </BottomBorderContainer>

        </>
    );
}

export default VehiculesInfo;