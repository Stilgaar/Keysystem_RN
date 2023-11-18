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
            dispatcher = null,
            dispatch = null,

        }) => {

        // console.log(e)
        // console.log("Hurle useSubmit Files", url)
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

        // put the first letter for the formdata in capital
        const capitalizeFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1);

        Object.entries(body).forEach(([key, value]) => {

            if (key !== "attributionDocs") {

                formData.append(key, value);

            } else {

                value.forEach((doc, index) => {

                    Object.keys(doc).forEach((field) => {

                        if (doc[field] !== undefined) {

                            const capitalizedField = capitalizeFirstLetter(field);

                            console.log("USEUBMIT FILES capitalizedField", capitalizedField)
                            console.log("USEUBMIT FILES  doc[field]", doc[field])


                            formData.append(`attributionDocs[${index}].${capitalizedField}`, doc[field]);
                        }
                    });
                });
            }
        });

        try {
            const res = await fetch(url,
                {
                    method: method,
                    body: formData
                },
            )

            console.log("res usesubmit", res)

            if (!res.ok) {
                throw new Error('throw res use file submit', res.status)
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