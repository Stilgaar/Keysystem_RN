import { Text, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import { gradientColor } from '../css';

export default function CustomTabBarButton({ children }) {

    return (
        <LinearGradient // Button Linear Gradient
            colors={gradientColor}
            style={styles.button}>

            <Text>{children}</Text>

        </LinearGradient>
    )

}

const styles = StyleSheet.create({
    activeBtn: {
        flex: 1,
        backgroundColor: "transparent",
    },
    button: {
        borderRadius: 50,
        paddingVertical: 10,
        paddingHorizontal: 10,
        justifyContent: 'center',
        alignItems: 'center',
        width: 60,
        height: 60,
        alignSelf: 'center',
    },

})