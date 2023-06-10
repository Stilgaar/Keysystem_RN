import { View, Image, Text } from "react-native";

import ksLogo from "../../assets/Pics/ks.png"

export default function SplashScreen() {

    // Note : didn't had the time to do somehting pretty tho :///


    return (

        <View
            style={{
                flex: 1,
                height: '100%',
                width: '100%',
                justifyContent: "center",
                alignItems: "center",
            }}>

            <Image
                style={{ 
                    flex:1,
                    width: '200px',
                    height: '200px'
                }}
                source={ksLogo}
            />

        </View>
    );



}

