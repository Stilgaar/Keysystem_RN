import { StyleSheet, Text } from 'react-native';

import LinearGradient from 'react-native-linear-gradient';

export default function CustomTabBarButton({ children }) {

    return (
        <LinearGradient
              colors={['#53e9f7',  '#632ec4']}
              style={[styles.button, { borderRadius: 50 }]}
              start={{x: 0, y: 0}}
              end={{x: 0, y: 1}}>

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