import { useEffect, useState, useContext } from "react"

import useFetch from "../useFetch"
import useGlobalContext from "../useGlobalContext"

const useCostTypeFetch = (bool = true, dolist = false) => {

    const { userState } = useGlobalContext()

    const [transformedCostTypes, setTransformedCostTypes] = useState([])

    // actual fetch for the cost types
    const {
        data: allCostType,
        pending: pendingCostType,
        error: errorCostType,
        setError: setErrorCostType,
    } = useFetch(`${process.env.API_URL}/api/Company/${userState.user.companyGuid}/cost-types`, bool)

    useEffect(() => {
        if (allCostType) {
            const newCostTypes = [...allCostType.keySystemCostTypes, ...allCostType.companyCostTypes]
            setTransformedCostTypes(newCostTypes)
        }
    }, [allCostType])

    // usestate for the list of the dataList component for the cost types
    const [costTypeArray, setcostTypeArray] = useState([])
    const [selectedCostType, setSelecedCostType] = useState("")

    // Making the list for the datalist component
    useEffect(() => {
        if (transformedCostTypes && dolist) {
            const dataArray = transformedCostTypes?.map((costTypeFr) => ({
                label: `${costTypeFr.costTypeDescriptionFr} `,
                value: costTypeFr.costTypeGuid,
            }));

            setcostTypeArray(dataArray);
        }
    }, [transformedCostTypes, dolist]);

    return {
        allCostType,
        pendingCostType,
        errorCostType,
        setErrorCostType,
        costTypeArray,
        selectedCostType,
        setSelecedCostType
    }

}

export default useCostTypeFetch