import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, SafeAreaView, Button, Image } from "react-native";
import { useEffect, useRef, useState } from "react";
import { Camera } from "expo-camera";

// J'ai laissé pleins de functions en commentaire, parce qu'ils peuvent servir sur d'autres projets =)

// Au cas ou on veuille, avec l'application, engeristrer les photos dans le téléphone
// import { shareAsync } from "expo-sharing";
//import * as MediaLibrary from "expo-media-library";

export default function App({ photos, setPhotos }) {
    let cameraRef = useRef();
    const [hasCameraPermission, setHasCameraPermission] = useState();
    // Au cas ou on veuille, avec l'application, engeristrer les photos dans le téléphone
    //const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState();

    // Je laisse ça là, dans mon original c'était directement ici que je prennais les photos et que les stockais.
    // Maintenant je les fais passer à l'étage du dessus
    // const [photos, setPhotos] = React.useState([]);

    // Verification des droits de l'applactions
    useEffect(() => {
        (async () => {
            const cameraPermission = await Camera.requestCameraPermissionsAsync();
            // Au cas ou on veuille, avec l'application, engeristrer les photos dans le téléphone
            // const mediaLibraryPermission = await MediaLibrary.requestPermissionsAsync();
            setHasCameraPermission(cameraPermission.status === "granted");
            // Au cas ou on veuille, avec l'application, engeristrer les photos dans le téléphone
            // setHasMediaLibraryPermission(mediaLibraryPermission.status === "granted");
        })();
    }, []);

    // Fonction de controle des permission sur le téléphone
    if (hasCameraPermission === undefined) {
        return <Text>Requesting permissions...</Text>;
    } else if (!hasCameraPermission) {
        return <Text>Permission for camera not granted. Please change this in settings.</Text>;
    }

    // Fonction de prise de photos avec options
    let takePicture = async () => {
        let options = {
            quality: 0.5,
            base64: true,
            exif: false,
        };

        let newPhoto = await cameraRef.current.takePictureAsync(options);
        let photoArray = [...photos];
        photoArray.push(newPhoto);
        setPhotos(photoArray);
    };

    //   if (photos.length > 0) {
    //     // Sauvgarde la photo dans la pellicule
    //     let savePhoto = () => {
    //       MediaLibrary.saveToLibraryAsync(photos.uri).then(() => {
    //         setPhotos(undefined);
    //       });

    //       // Ouvre le menu de partage de photos pour les différentes applications. Neccessite aussi normalement un accord
    //       // let sharePic = () => {
    //       //   shareAsync(photos.uri).then(() => {
    //       //     setPhotos(undefined);
    //       //   });
    //       // };
    //     };

    //     return (
    //       <SafeAreaView style={styles.container}>
    //         {/* <View>
    //           {photos.length > 0 &&
    //             photos.map((photo) => {
    //               <Image style={styles.preview} source={{ uri: "data:image/jpg;base64," + photo.base64 }} />;
    //             })}
    //         </View> */}
    //         {/* <Button title={`Share`} onPress={sharePic} /> */}
    //         {hasMediaLibraryPermission ? <Button title={`Sauvgarder dans la pellicule`} onPress={savePhoto} /> : undefined}
    //         {/* Le bouton supprimer ne supprime, pour le moment, toutes les photos prises */}
    //         {photos.length > 0 && <Button title={`Supprimer`} onPress={() => setPhotos([])} />}
    //       </SafeAreaView>
    //     );
    //   }

    return (
        <Camera style={styles.container} ref={cameraRef}>
            <View style={styles.buttonContainer}>
                <Button title={`> Photo <`} onPress={takePicture} />
            </View>
        </Camera>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 15,
        marginBottom: 10,
    },
    buttonContainer: {
        backgroundColor: "#fff",
        alignSelf: "center",
    },
    preview: {
        alignSelf: "stretch",
        flex: 0.5,
    },
});