export const FilterEverything = (value, query) => {

    if (query === undefined) {
        return value;

    } else if (value?.vehiculeBrand?.toLowerCase()?.includes(query?.toLowerCase())) {
        return value;
    }
    else if (value?.vehiculeModel?.toLowerCase()?.includes(query?.toLowerCase())) {
        return value;
    }
    else if (value?.vehiculeImmatriculation?.toLowerCase()?.includes(query?.toLowerCase())) {
        return value;
    }
    else if (value?.fullName?.toLowerCase()?.includes(query?.toLowerCase())) {
        return value;
    }
    else if (value?.Location?.toLowerCase().includes(query?.toLowerCase())) {
        return value
    }
    else if (value?.firstName?.toLowerCase().includes(query?.toLowerCase())) {
        return value;
    }
    else if (value?.lastName?.toLowerCase().includes(query?.toLowerCase())) {
        return value;
    }
    else if (value?.userAdress?.toLowerCase().includes(query?.toLowerCase())) {
        return value;
    }
    else if (value?.vehiculeContractType?.toLowerCase().includes(query?.toLowerCase())) {
        return value;
    }
    else {
        return false;
    }
}
