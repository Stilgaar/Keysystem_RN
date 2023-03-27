import React from "react"
import { ListItem } from '@rneui/themed';
import { StateContext } from "../../../Context/StateContext";

import { View, Text, ScrollView, Dimensions } from "react-native";
import StyledText from "../../../Shared/StyledText";

import AsyncStorage from "@react-native-async-storage/async-storage";

import format from "date-fns/format";

import { generalStyles, greyish } from "../../../Shared/css";

import HistoryRoute from "./HistoryRoute";
import HistoryNextReservation from "./HistoryNexReservations";
import HistoryOldKey from "./HistoryOldKey";
import { GradientButton } from "../../../comps";
import useGlobalContext from "../../../Hooks/useGlobalContext";

export default function AccordeonSingleItem({ route }) {

    ////////////////
    // Route (initialParmas props)
    ////////////////

    const { mapType, title } = route.params

    ////////////////
    // GlobalState
    ////////////////

    const { userState } = useGlobalContext()

    ////////////////
    // For expanding the tabs
    ////////////////


    const [thisDate, setThisDate] = React.useState(new Date())

    ////////////////
    // Where the array is stored
    ////////////////

    const historyArray = userState?.user?.[0]?.userHistory?.find(name => Object.keys(name)[0] === mapType)?.[mapType] || []


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

    const ListCustom = ({ history, index }) => {

        const [expanded, setExpanded] = React.useState(false)

        return (

            <ListItem.Accordion
                containerStyle={[generalStyles.globalShadow, generalStyles.colorContainer, { backgroundColor: "white" }]}
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

                <ListItem containerStyle={(mapType === "userRoutes" ? [generalStyles.colorContainer, { backgroundColor: greyish }] : { backgroundColor: "transparent", justifyContent: "center", alignItems: 'center' })}>

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

        )
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

                <ScrollView contentContainerStyle={generalStyles.scrollViewStyle} style={{ marginTop: 15, marginBottom: 15 }}>

                    {filteredArray.length > 0 ?

                        filteredArray.map((history, index) => (

                            <ListCustom key={index} index={index} history={history} />

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
