import React from "react"

import { StateContext } from "../../../Context/StateContext";

import { View, Text, ScrollView, Image, Modal, StyleSheet, Dimensions } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

import { generalStyles } from "../../../Shared/css";
import { GradientButton } from "../../../comps";

import { GestureDetector } from "react-native-gesture-handler";

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


            <ScrollView style={[generalStyles.container, generalStyles.mbgeneral65]}>

                {globalState?.currentCar?.[0]?.virutualPouch.map((document, index) => (

                    <View key={index}
                        style={[generalStyles.whiteContainer, generalStyles.center]}>

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

            </ScrollView>

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
                                <GestureDetector gesture={pinchGesture}>

                                    <ScrollView horizontal={true}>

                                        <Animated.View style={[animatedStyle]}>

                                            <Animated.Image
                                                source={{ uri: `${selectedImage.picJPG}` }}
                                                style={[styles.fullScreenImage, animatedStyle]}
                                            />

                                        </Animated.View>


                                    </ScrollView>

                                </GestureDetector>

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
