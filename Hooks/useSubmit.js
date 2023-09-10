import { useState, useEffect } from "react";

// personnal hook to submit any text

function useSubmit() {

    const [pending, setPending] = useState(null)
    const [error, setError] = useState()
    const [resMsg, setResMsg] = useState(null)
    const [resBody, setResBody] = useState(null)

    // clear the resmessage
    useEffect(() => {
        let timer;
        if (resMsg) {
            timer = setTimeout(() => {
                setResMsg(null);
            }, 450);
        }
        // cleanup function
        return () => clearTimeout(timer);
    }, [resMsg])


    // we'll send data as default set. But if we put it in the arguments it will send dataSent
    const handleSubmit = async ({
        e = "",
        url,
        method = "POST",
        body,
        headers = {
            'Content-Type': 'application/json'
        },
    }) => {

        // console.log(e)
        console.log("URL USESUMBIT", url)
        //console.log(method)
        console.log("BODY USESUBMIT", body)
        // console.log(headers)
        // console.log(dispatch)
        // console.log(dispatcher)

        e && e.preventDefault()

        setPending(true)
        setError(null)

        // ... (same as before)

        try {
            const res = await fetch(url,
                {
                    method,
                    headers,
                    body: JSON.stringify(body)
                }
            );

            if (!res.ok) {
                throw new Error(res.status);
            }

            const responseInfo = {
                ok: res.ok,
                status: res.status
            };

            let data;
            if (res.headers.get("Content-Type").includes("application/json")) {
                data = await res.json();
                // Handle JSON response
            } else {
                data = await res.text();
                // Handle plain text or other types of response
            }

            setResMsg(responseInfo);
            setResBody(data);


            setPending(false);
            setError();

        } catch (err) {
            setError(err.message);
            setPending(false);
        }
    };

    return { handleSubmit, pending, error, setError, resBody, resMsg }

}

export default useSubmit;