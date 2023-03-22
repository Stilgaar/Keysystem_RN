import { View, Text } from "react-native";

function Error({ msg }) {

    return (

        <View>
            <Text>
                {msg}
            </Text>
        </View>

    );
}

export default Error;