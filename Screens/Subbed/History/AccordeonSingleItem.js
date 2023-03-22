import React from "react"
import { ListItem } from '@rneui/themed';
import { StateContext } from "../../../Context/StateContext";

import { View, Text, ScrollView, Dimensions } from "react-native";
import StyledText from "../../../Shared/StyledText";


import format from "date-fns/format";

import { generalStyles } from "../../../Shared/css";

import HistoryRoute from "./HistoryRoute";
import HistoryNextReservation from "./HistoryNexReservations";
import HistoryOldKey from "./HistoryOldKey";
import { GradientButton } from "../../../comps";

export default function AccordeonSingleItem({ route }) {

    ////////////////
    // Route (initialParmas props)
    ////////////////

    const { mapType, title } = route.params

    ////////////////
    // GlobalState
    ////////////////

    const { globalState } = React.useContext(StateContext)

    ////////////////
    // For expanding the tabs
    ////////////////

    const [expanded, setExpanded] = React.useState(false)
    const [thisDate, setThisDate] = React.useState(new Date())

    ////////////////
    // Where the array is stored
    ////////////////

    const historyArray = globalState?.user?.[0]?.userHistory?.find(name => Object.keys(name)[0] === mapType)?.[mapType] || []


    const filteredArray = historyArray.filter(date => {

        if (mapType === "userRoutes") {
            return date.date === format(thisDate, 'yyyy-MM-dd')
        }

        else { return date }
    })

    const typeEmpty = () => {

        switch (mapType) {
            case "userRoutes": return "Pas de trajets ce jour là"
            case "userOldKeys": return "Pas d'anciennes clefs numériques"
            case "userNexReservations": return "Vous n'avez pas de réservation en attente"

        }

    }

    ////////////////
    // JSX
    ////////////////

    return (
        <>

            <View style={[generalStyles.container]}>

                {mapType === "userRoutes" &&

                    <View style={{ marginTop: 10, flexDirection: "row", justifyContent: "center" }}>

                        <GradientButton text={`<-`}
                            width={Dimensions.get("window").width - 320}
                            handlePress={() => setThisDate(date => new Date(date.setDate(date.getDate() - 1)))}
                        />

                        <GradientButton
                            text={`${format(thisDate, 'yyyy-MM-dd')}`}
                            width={Dimensions.get("window").width - 200}
                        />

                        <GradientButton text={`->`}
                            width={Dimensions.get("window").width - 320}
                            handlePress={() => setThisDate(date => new Date(date.setDate(date.getDate() + 1)))}
                        />

                    </View>
                }

                <ScrollView style={[generalStyles.container, { marginTop: 10, flexGrow: 1 }]}>

                    {filteredArray.length > 0 ?

                        filteredArray.map((history, index) => (

                            <ListItem.Accordion key={index}
                                containerStyle={[generalStyles.globalShadow, generalStyles.colorContainer]}
                                content={
                                    <>
                                        <ListItem.Content>
                                            <ListItem.Title>{title} {index + 1}</ListItem.Title>
                                        </ListItem.Content>
                                    </>
                                }
                                isExpanded={expanded}
                                onPress={() => {
                                    setExpanded(!expanded);
                                }}>

                                <ListItem containerStyle={{ flex: 1, justifyContent: "center", alignContent: "center" }}>

                                    {mapType === "userRoutes" &&

                                        <HistoryRoute item={history} />

                                    }

                                    {mapType === "userOldKeys" &&

                                        <HistoryOldKey item={history} />
                                    }

                                    {mapType === "userNexReservations" &&

                                        <HistoryNextReservation item={history} />

                                    }

                                </ListItem>

                            </ListItem.Accordion>
                        ))

                        :

                        <View style={[generalStyles.center, generalStyles.colorContainer]}>
                            <StyledText>{typeEmpty()}</StyledText>
                        </View>

                    }

                </ScrollView>

            </View>
        </>

    )
}
