import { View, Image, Text } from "react-native";

import ksLogo from "../../assets/Pics/ks.png"

export default function SplashScreen() {

    // Note : didn't had the time to do somehting pretty tho :///


    return (

        <View
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: '#53e9f7',
            }}>

            <Image
                style={{
                    width: 200,
                    height: 200,
                    resizeMode: "contain",
                }}
                source={ksLogo}
            />

        </View>
    );



}

