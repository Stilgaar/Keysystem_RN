import { useContext } from "react";
import { GlobalContext } from "../Context/GlobalContext";

const useGlobalContext = () => {

    const submit = useContext(GlobalContext);
    return submit;

}

export default useGlobalContext;