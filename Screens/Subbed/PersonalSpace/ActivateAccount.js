import { useContext } from "react";
import { StateContext } from "../../../Context/StateContext";

import { View, Text, ScrollView } from "react-native";

import StyledText from "../../../Shared/StyledText";

import { activateAccountList } from "../../../JSON/Fr/MyAccountArray"

import PicsFromB64 from "../../../Shared/PicsFromB64"
import PicsFromSVG from "../../../Shared/PicsFromSVG";

import { generalStyles } from "../../../Shared/css";

import useGlobalContext from "../../../Hooks/useGlobalContext";

import {
    GradientButton,
} from "../../../comps"


import { delSignature } from "../../../Reducer/GlobalReducer/globalDispatch";


// Activer mon compte utilisateur
// Upload documents (avec carte d'identité et permis de conduire)
// + Signature électronique
// + Saisie des dates d'expirations

function ActivateAccount({ navigation }) {

    const { globalState } = useContext(StateContext)

    const { handleSubmit: handleSubmitID } = useGlobalContext()
    const { handleSubmit: handleSubmitLicence } = useGlobalContext()
    const { handleSubmit: handleSubmitSignature } = useGlobalContext()
    const { handleSubmit: handleSubmitAll } = useGlobalContext()

    return (

        <ScrollView style={[generalStyles.container, generalStyles.mbgeneral65]}>

            <Text style={generalStyles.title}>
                Activation de votre compte
            </Text>

            <View style={[generalStyles.colorContainer, generalStyles.globalShadow]}>

                <StyledText style={{ marginBottom: 5 }}>
                    Pour activer votre compte nous avons besoin des documents suivants :
                </StyledText>

                {activateAccountList.map(list => (

                    <StyledText style={{ marginLeft: 15, marginTop: 2 }} key={list}>
                        * {list}
                    </StyledText>

                ))}


            </View>

            <View style={[generalStyles.colorContainer, generalStyles.globalShadow]}>

                <StyledText>Carte d'identité</StyledText>

                <View style={{ marginTop: 10 }}>

                    <GradientButton text="Piece d'identité"
                        handlePress={() => navigation.navigate("addId")} />

                </View>

                {globalState.photoID.length > 0 &&

                    <>
                        <PicsFromB64 picsArray={globalState.photoID}
                            dispatchGeneralType={`photoID`} />

                        <GradientButton text="Envoyer Identité"
                            color={['#7cb9e8', '#7cb9e8']}
                            width={300}

                            handlePress={() => {
                                handleSubmitID({
                                    url: `${process.env.API_URL}sendId`,
                                    body: globalState.photoID,
                                })
                            }}
                        />
                    </>
                }

            </View>

            <View style={[generalStyles.colorContainer, generalStyles.globalShadow]}>

                <StyledText>Permis de conduire</StyledText>

                <View style={{ marginTop: 10 }}>

                    <GradientButton text="Permis"
                        handlePress={() => navigation.navigate("addLicence")} />

                </View>

                {globalState.photoLicence.length > 0 &&

                    <>
                        <PicsFromB64
                            picsArray={globalState.photoLicence}
                            dispatchGeneralType={`photoLicence`} />

                        <GradientButton
                            text="Envoyer Permis"
                            color={['#7cb9e8', '#7cb9e8']}
                            width={300}
                            handlePress={() => {
                                handleSubmitLicence({
                                    url: `${process.env.API_URL}sendLicence`,
                                    body: globalState.photoLicence,
                                })
                            }}

                        />
                    </>
                }

            </View>

            <View style={[generalStyles.colorContainer, generalStyles.globalShadow]}>

                <StyledText>Signature</StyledText>

                <View style={{ marginTop: 10 }}>

                    <GradientButton text="Signature"
                        handlePress={() => navigation.navigate("addSignature")} />

                </View>

                {globalState.signature.length > 0 &&

                    <>
                        <PicsFromSVG
                            svg={globalState.signature[0]}
                            dispatch={delSignature} />

                        <GradientButton text="Envoyer votre signature"
                            color={['#7cb9e8', '#7cb9e8']}
                            width={300}
                            handlePress={() => {
                                handleSubmitSignature({
                                    url: `${process.env.API_URL}sendSignature`,
                                    body: globalState.signature[0],
                                })
                            }}
                        />
                    </>
                }

            </View>

            {globalState.signature.length > 0 &&
                globalState.photoLicence.length > 0 &&
                globalState.photoID.length > 0 &&

                <GradientButton text="Envoyer Tous les documents"
                    color={['#7cb9e8', '#7cb9e8']}
                    width={300}
                    handlePress={() => {
                        handleSubmitAll({
                            url: `${process.env.API_URL}sendAll`,
                            body: {
                                id: globalState.photoID,
                                licence: globalState.photoLicence,
                                signature: globalState.signature[0]
                            }
                        })
                    }} />
            }

        </ScrollView >
    );
}

export default ActivateAccount;