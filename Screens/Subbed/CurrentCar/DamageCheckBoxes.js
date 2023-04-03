// React stuff
import React from "react";
import { View, Dimensions } from "react-native";

// The button but gradient
// the globalcontext also
import { GradientButton } from "../../../comps";

import PicsFromB64 from "../../../Shared/PicsFromB64";

// NPM packages
import { CheckBox } from 'react-native-elements';

////////////////
// I have this mapped inside a component to make the reading clearer 
// Parent <Damage />
////////////////

export default function DamageCheckBoxes({
    navigation,
    text,
    nav,
    route,
    globalState,
    index,
    routeType
}) {

    ////////////////
    // To open to the checkbox button stuff
    ////////////////

    const [open, setIsOpen] = React.useState(false)

    ////////////////
    // For the Dispatch & for the win !
    ////////////////

    const { dispatchGeneralType } = route.params

    ////////////////
    // Checks if the checkbox needs to be checked. (Will be checked if a picture in it, can't be unchecked when done)
    ////////////////

    const checked = globalState[`${dispatchGeneralType}`]?.find(obj => obj[nav])?.[nav].length > 0

    ////////////////
    // JSX
    ////////////////

    const windowWitdh = Dimensions.get("window").width

    return (

        <View style={{ position: 'relative', zIndex: 1000 - index, elevation: 1000 - index }}>

            <CheckBox
                title={text}
                checked={checked || open}
                onPress={() => setIsOpen(c => !c)}
                containerStyle={{ marginBottom: 10, borderRadius: 15, padding: 10 }}
            />

            {(checked ? checked : open) &&

                <GradientButton
                    width={windowWitdh - 40}
                    addStyle={{ marginBottom: 5 }}
                    text={`Photo ${text}`}
                    handlePress={() => navigation.navigate(nav, { routeType })} />
            }

            {checked &&

                <>
                    <PicsFromB64
                        picsArray={globalState[`${dispatchGeneralType}`]?.find(obj => obj[nav])?.[nav]}
                        dispatchGeneralType={dispatchGeneralType}
                        dispatchType={nav}
                        checked={checked}
                    />

                </>

            }

        </View>

    )

}