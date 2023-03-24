import { StyleSheet, Dimensions } from "react-native";

export const primaryColor2 = "#94ecd3"
export const blackA = "#171919"

export const blue = "#4daafe"
export const greenblue = '#94ecd3'

export const flatgreen = [primaryColor2, primaryColor2]

export const gradientColor = ['#0d7463', '#3ac1b1', '#94ecd3', '#128c7e']
export const greyGradientColor = ['#e5e5e5', '#e5e5e5', '#e5e5e5']

// OLD : ['#94ecd3', '#3ac1b1', '#128c7e']
// NICE : ['#0d7463', '#3ac1b1', '#94ecd3', '#128c7e']
const swidth = Dimensions.get('screen').width
const sheight = Dimensions.get('screen').height

export const generalStyles = StyleSheet.create({

    ////////////////
    // REGULAR CONTAINERS \\ 
    ////////////////

    container: {
        flex: 1,
        backgroundColor: "#d6d6d6",
    },
    container2: {
        flex: 2,
        backgroundColor: "#efefef",
    },
    container3: {
        flex: 3,
        backgroundColor: "#efefef",
    },
    colorContainer: {
        padding: 20,
        marginTop: 2,
        marginBottom: 5,
        marginLeft: 10,
        marginRight: 10,
        borderRadius: 25,
        backgroundColor: "#efefef",
        justifyContent: 'center',
    },
    topGreyContainer: {
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#efefef",
        padding: 10,
        marginLeft: 5,
        marginRight: 5,
        borderTopEndRadius: 15,
        borderTopStartRadius: 15,
    },
    bottomWhiteContainer: {
        backgroundColor: "white",
        padding: 10,
        marginLeft: 5,
        marginRight: 5,
        borderBottomEndRadius: 15,
        borderBottomStartRadius: 15
    },
    smallcolorContainer: {
        backgroundColor: "#efefef",
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 25,
        padding: 3,
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 5,
    },

    ////////////////
    /// TEXT  
    ////////////////

    title: {
        fontSize: 35,
        marginLeft: 20,
        marginTop: 10,
        marginBottom: 5,
        color: blackA,
        fontFamily: "BrandonBold",
    },
    titleInfo: {
        fontSize: 17,
        fontWeight: "bold",
        padding: 6,
        color: blackA,
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
        fontFamily: "BrandonBold",
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
    spbetween: {
        flexDirection: "row",
        justifyContent: "space-between"
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
