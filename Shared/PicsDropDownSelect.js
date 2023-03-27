import React from "react";
import { View } from "react-native";
import { DispatchContext } from "../Context/StateContext";
import { addDropDownInfo } from "../Reducer/GlobalReducer/globalDispatch";

import DropDownPicker from 'react-native-dropdown-picker';

export default function PicsDropDownSelect({
    pics,
    dispatchGeneralType,
    dispatchType,
    index,
}) {

    ////////////////
    // To open close the dropdown menu
    ////////////////

    const [dropDownOpen, setDropDownOpen] = React.useState(false)

    ////////////////
    // Language Picker (not bad !)
    ////////////////

    DropDownPicker.setLanguage("FR");
    DropDownPicker.setMode("BADGE");

    ////////////////
    // Value of the items
    ////////////////

    const [items, setItems] = React.useState([
        { label: 'Rayure', value: 'scratch' },
        { label: 'Enfoncement', value: 'depression' },
        { label: 'Cassure', value: 'break' },
        { label: 'Eclat / Bris', value: 'broken' },
        { label: 'Pièce Manquante', value: 'missingPiec' },
        { label: 'Autre', value: 'other' },
    ]);

    const { globalDispatch } = React.useContext(DispatchContext)

    return (

        <DropDownPicker
            zIndex={45 - index}
            zIndexInverse={50 - index}
            elevation={50 - index}
            //  multiple={true}
            open={dropDownOpen}
            setOpen={setDropDownOpen}
            value={pics.damageTypes}
            items={items}
            onSelectItem={(item) => globalDispatch(addDropDownInfo(item, dispatchGeneralType, dispatchType, "damageTypes", index))}
            setItems={setItems}
            // BORDEL
            listMode="SCROLLVIEW"
            scrollViewProps={{
                nestedScrollEnabled: true,
            }}
        />

    )

}