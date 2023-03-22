import { View, Text } from "react-native";

import StyledText from "./StyledText";

function Error({ msg }) {

    return (

        <View>
            <StyledText>
                {msg}
            </StyledText>
        </View>

    );
}

export default Error;