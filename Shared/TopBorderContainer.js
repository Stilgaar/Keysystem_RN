import { View } from "react-native";
import { generalStyles } from "./css";

export default function TopBorderContainer(props) {

    return (
        <View  {...props} style={[generalStyles.topBorderContainer, generalStyles.globalShadow, props.style]}>

            {props.children}

        </View>

    )
}