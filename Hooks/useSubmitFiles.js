import { useState, useEffect } from "react";

// personnal hook to submit any text + files

function useSubmitFiles() {

    const [pending, setPending] = useState(null)
    const [error, setError] = useState(null)
    const [resMsg, setResMsg] = useState(null)

    // clear the resmessage
    useEffect(() => {
        let timer;
        if (resMsg) {
            timer = setTimeout(() => {
                setResMsg(null);
            }, 50);
        }
        // cleanup function
        return () => clearTimeout(timer);
    }, [resMsg])

    const handleSubmitFiles = async (
        {
            e = "",
            url,
            method = "POST",
            body,
            headers = {}, // content-type is no longer needed
            dispatcher = null,
            dispatch = null,

        }) => {

        // console.log(e)
        // console.log("Hurle", url)
        // console.log("method", method)
        console.log("body", body)
        // console.log("head", headers)
        // console.log(dispatch)
        // console.log(dispatcher)

        e && e.preventDefault()

        setPending(true)
        setError(null)

        // For eacth key && value in body he'll make a formData. 
        const formData = new FormData()

        let key = Object.keys(body)
        let value = Object.values(body)
        for (let i = 0; i < key.length; i++) {
            if (key[i] !== "attributionDocs") {

                formData.append(key[i], value[i])

            } else {

                const attributionDocs = value[i]
                attributionDocs.forEach((doc, index) => {

                    const file = doc.documentFormFile
                    formData.append(`attributionDocs[${index}].DocumentFormFile`, file)
                    formData.append(`attributionDocs[${index}].DisplayName`, 'Toto')

                })
            }
        }

        //DEBUG FOR FORMDATA
        // for (let [key, value] of formData.entries()) {
        //     console.log("KEY", key, "VALUE", value);
        // }

        try {
            const res = await fetch(url,
                {
                    method: method,
                    headers: headers,
                    body: formData
                },
            )

            if (!res.ok) {
                throw new Error('throw res', res.status)
            }

            // const json = await res.json()

            if (dispatcher !== null && dispatch !== null) {
                dispatcher(dispatch(res))
            }
            else {
                setResMsg(res)
            }

            setPending(false)
            setError(null)

        }

        catch (err) {
            console.log("submiterror", err)
            setError(err.message)
            setPending(false)
        }

    };

    return { handleSubmitFiles, pending, error, resMsg }

}

export default useSubmitFiles;