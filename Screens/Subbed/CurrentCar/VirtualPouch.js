import React from "react"

import { StateContext } from "../../../Context/StateContext";

import { View, Text, ScrollView, Animated, Image, Modal, StyleSheet, Dimensions, TouchableOpacity } from "react-native";

import { generalStyles } from "../../../Shared/css";
import { GradientButton } from "../../../comps";

import AsyncStorage from "@react-native-async-storage/async-storage";

// Pochette virtuelle (accès au stockage virtuel des papiers importants du véhicule)
// Carte grise
// Carte verte d’assurance
// Rapports de contrôles techniques
// Document(s) véhicule

export default function VirtualPouch() {

    ////////////////
    // GlobalStatiche !
    ////////////////

    const { globalState } = React.useContext(StateContext)

    const [state, setGlobalState] = React.useState(globalState);

    React.useEffect(() => {

        setTimeout(

            async () => {
                const state = await AsyncStorage.getItem('globalState');
                setGlobalState(JSON.parse(state));
            },

            10)

    }, [globalState]);

    ////////////////
    // State for modal (selected image // open close modal)
    ////////////////

    const [isModalVisible, setIsModalVisible] = React.useState(false);
    const [selectedImage, setSelectedImage] = React.useState()

    ////////////////
    // JSX
    ////////////////

    return (

        <>

            {/* 
            ////////////////
            /// MAPED IMAGES
            //////////////// 
            */}

            <View style={[]}>

                <ScrollView contentContainerStyle={generalStyles.scrollViewStyle}>

                    {state?.currentCar?.virutualPouch.map((document, index) => (

                        <View key={index}
                            style={[generalStyles.colorContainer, generalStyles.center]}>

                            <Text style={generalStyles.title}>
                                {document.docType}
                            </Text>

                            <TouchableOpacity onPress={() => {
                                setIsModalVisible(c => !c)
                                setSelectedImage(document)
                            }}>

                                <Image
                                    source={{ uri: `${document.picJPG}` }}
                                    style={styles.image}
                                />

                            </TouchableOpacity>

                        </View>
                    ))}



                    {/* 
            ////////////////
            /// MODAL STUFF
            //////////////// 
            */}


                    <Modal visible={isModalVisible} transparent={true}>

                        <View style={generalStyles.modalContainer}>

                            <View style={generalStyles.modalContent}>

                                {selectedImage &&

                                    <>
                                        <ScrollView horizontal={true}>

                                            <View>

                                                <Image
                                                    source={{ uri: `${selectedImage.picJPG}` }}
                                                    style={[styles.fullScreenImage]}
                                                />

                                            </View>

                                        </ScrollView>

                                        <GradientButton text={`Fermer ${selectedImage.docType}`}
                                            width={Dimensions.get('window').width - 10}
                                            handlePress={() => {
                                                setIsModalVisible(c => !c)
                                                setSelectedImage()
                                            }} />

                                    </>
                                }

                            </View>

                        </View>

                    </Modal>
                </ScrollView>
            </View>

        </>

    );
}

const styles = StyleSheet.create({
    image: {
        width: 100,
        height: 100,
    },
    fullScreenImage: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        resizeMode: 'contain',
    },
});
