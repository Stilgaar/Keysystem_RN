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
            }}>

            <Text>-Key System-</Text>

            <Image
                style={{ flex: 0.5, width: 200, height: 200 }}
                source={ksLogo}
            />

        </View>
    );



}

