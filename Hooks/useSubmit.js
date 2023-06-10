import { useState, useEffect } from "react";

function useSubmit() {

    const [data, setData] = useState({})
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


    // we'll send data as default set. But if we put it in the arguments it will send dataSent
    const handleSubmit = async (
        {
            e = "",
            url,
            option = "POST",
            body = data,
            headers = {
                'Content-Type': 'application/json'
            },
            dispatcher = null,
            dispatch = null,
        }
    ) => {

        // console.log(url)
        // console.log(option)
        //   console.log(body)
        // console.log(headers)
        // console.log(dispatch)
        // console.log(dispatcher)

        e && e.preventDefault()

        setPending(true)
        setError(null)

        try {
            const res = await fetch(url,
                {
                    method: option,
                    headers: headers,
                    body: JSON.stringify(body)
                }
            )

            if (!res.ok) {
                throw new Error('throw res', res.statusText)
            }

            const json = await res.json()

            if (dispatcher !== null && dispatch !== null) {
                dispatcher(dispatch(json))
            }
            else {
                setResMsg(json)
            }

            setPending(false)
            setError(null)

        }

        catch (err) {
            console.log(err)
            setError(err.message)
            setPending(false)
        }

    }

    const handleChange = (e) => {
        e.persist()
        setData((data) => ({ ...data, [e.target.name]: e.target.value.trim() }))
    }

    return { data, handleSubmit, handleChange, pending, error, resMsg }

}

export default useSubmit;