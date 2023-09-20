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
            headers = {

            }, // content-type is no longer needed
            dispatcher = null,
            dispatch = null,

        }) => {

        // console.log(e)
        console.log("Hurle useSubmit Files", url)
        // console.log("method", method)
        console.log("body useSubmit Files", body)
        // console.log("head", headers)
        // console.log(dispatch)
        // console.log(dispatcher)

        e && e.preventDefault()

        setPending(true)
        setError(null)

        // For eacth key && value in body he'll make a formData. 
        const formData = new FormData()

        const capitalizeFirstLetter = (string) => {
            return string.charAt(0).toUpperCase() + string.slice(1);
        }

        Object.entries(body).forEach(([key, value]) => {

            if ((key !== "attributionDocs" || key !== "inventoryImages")) {

                formData.append(key, value);

            } else {

                value.forEach((doc, index) => {

                    Object.keys(doc).forEach(field => {

                        if (doc[field] !== undefined) {

                            const capitalizedField = capitalizeFirstLetter(field);

                            if (key === "inventoryImages") {
                                formData.append(`inventoryImages[${index}].${capitalizedField}`, doc[field]);
                            } else {
                                formData.append(`attributionDocs[${index}].${capitalizedField}`, doc[field]);
                            }
                        }
                    });
                });
            }
        });

        console.log("FORMDATA", formData)

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
            console.error("submiterror", "message", err.message, "err", err)
            setError(err.message)
            setPending(false)
        }

    };

    return { handleSubmitFiles, pending, error, resMsg }

}

export default useSubmitFiles;