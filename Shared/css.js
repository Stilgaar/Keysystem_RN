import { StyleSheet, Dimensions } from "react-native";

export const primaryColor2 = "#94ecd3"
export const blackA = "#171919"

export const blue = "#4daafe"
export const greenblue = '#94ecd3'

export const gradientColor = ['#94ecd3', '#3ac1b1', '#128c7e']
export const greyGradientColor = ['#e5e5e5', '#e5e5e5', '#e5e5e5']

export const generalStyles = StyleSheet.create({

    ////////////////
    // REGULAR CONTAINERS \\ 
    ////////////////

    container: {
        flex: 1,
        backgroundColor: "white",
    },
    container2: {
        flex: 2,
        backgroundColor: "#efefef",
    },
    container3: {
        flex: 3,
        backgroundColor: "#efefef",
    },
    whiteContainer: {
        padding: 20,
        marginTop: 2,
        marginBottom: 5,
        marginLeft: 10,
        marginRight: 10,
        borderRadius: 25,
        backgroundColor: "#efefef",
        justifyContent: 'center',
    },
    smallWhiteContainer: {
        backgroundColor: "white",
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50,
        padding: 10,
    },

    ////////////////
    /// TEXT  
    ////////////////

    title: {
        fontWeight: "bold",
        fontSize: 25,
        marginLeft: 20,
        marginTop: 10,
        marginBottom: 5,
        fontFamily: "brandonBold",
        color: blue,
    },
    titleInfo: {
        fontSize: 17,
        fontWeight: "bold",
        padding: 6,
        color: blue,
    },
    textInfoStyles: {
        fontFamily: "brandonBold",
        fontWeight: "bold",
        fontSize: 15,
        marginTop: 2,
    },
    textDataStyles: {
        fontFamily: "brandonBold",
        fontWeight: "bold",
        fontSize: 15,
        marginTop: 2,
        color: "grey",
    },
    textCenter: {
        textAlign: "center",
    },

    ////////////////
    /// INPUTS  
    ////////////////

    inputs: {
        height: 40,
        width: Dimensions.get('screen').width - 110,
        margin: 5,
        padding: 5,
        borderRadius: 3,
        backgroundColor: "#efefef",
    },

    //////////////// 
    /// ABOUT COLORS  
    ////////////////

    error: {
        color: "crimson",
    },

    ////////////////
    /// FLEX  
    //////////////// 

    fdr: {
        flexDirection: "row",
    },
    fdc: {
        flexDirection: "column",
    },
    tCenter: {
        textAlign: "center",
    },
    center: {
        alignItems: 'center',
        justifyContent: 'center',
    },

    ////////////////
    /// ICON POSITIONNING 
    ////////////////

    iconEye: { // Icon from the Login/Signup Screens
        position: "absolute",
        top: 13,
        zIndex: 9999,
    },

    ////////////////
    /// FONTS  
    ////////////////

    brandonBold: {
        fontFamily: "brandonBold"
    },

    ////////////////
    /// SHADOOZZ 
    ////////////////

    globalShadow:
    {
        shadowOffset: { width: 0, height: 2 },
        shadowColor: '#000',
        shadowOpacity: 1,
        shadowRadius: 2,
        elevation: 7,
    },

    ////////////////
    /// Button Stuff
    ////////////////

    buttonContainer: {
        position: "absolute",
        alignSelf: "center",
        flexDirection: 'row', // set the flexDirection to row
        justifyContent: 'center', // set the justifyContent to space-between
        bottom: 5, // set the bottom to 0
        left: 0, // set the left to 0
        right: 0, // set the right to 0
    },

    buttonSeparated: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginLeft: 5,
        marginRight: 5
    },

    ////////////////
    /// For the textAera Stuff thing (i'm tired)
    ////////////////

    textAeraContainer: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        backgroundColor: '#efefef',
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginBottom: 10,
    },
    textAeraContentContainer: {
        borderBottomWidth: 0,
    },

    ////////////////
    /// For absolute overlay (like in <DamageShema />)
    ////////////////

    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },


    mbgeneral65: {
        marginBottom: 65
    },

    ////////////////
    /// BADGER BADGER BADGER BADGER BADGER MUSHROOM MUSHROOM
    ////////////////

    badge: {
        padding: 10,
        borderRadius: 50,
    },

    ////////////////
    /// MODAL STUFF
    ////////////////

    modalContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
    },
});
