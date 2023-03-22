/* eslint-disable */
import i18n from "../Functions/i18n"
import { useTranslation } from "react-i18next"
import { useState, useEffect } from "react"

// One Hook to controoool all the languages.

const useLanguage = (fileName, arrName) => {

    const { i18n } = useTranslation()

    const [languageArray, setLanguageArray] = useState()

    useEffect(() => {

        switch (true) {
            case i18n.language.includes("en"): {

                setLanguageArray(require(`../JSON/en-UK-US/${fileName}`)[`${arrName}`])
                break;
            }

            case i18n.language.includes("fr"): {

                setLanguageArray(require(`../JSON/fr-fr/${fileName}`)[`${arrName}`])
                break;
            }

            default:
                break;
        }

    }, [languageArray, i18n.language, arrName, fileName])

    return { languageArray }
}

export default useLanguage;