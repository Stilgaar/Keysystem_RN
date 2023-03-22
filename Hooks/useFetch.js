import { useEffect, useState, useCallback } from 'react'

// HOOK TO FETCH EVERYTING YOU CAN IN ONE LINE !
// THOU SHALL NOT FETCH

const useFetch = (url) => {

    console.log(url)

    const [data, setData] = useState({})
    const [pending, setPending] = useState(null)
    const [error, setError] = useState(null)

    const refresh = useCallback(async () => {

        const controller = new AbortController()

        setPending(true)
        setError(null)

        try {
            const res = await fetch(url, { signal: controller.signal })
            if (!res.ok) {
                throw new Error(res.statusText)
            }
            const json = await res.json()

            setData(json)

            setPending(false)
            setError(null)
        }
        catch (err) {
            console.log(err)
            setError(err.message)
            setPending(false)
        }

        return () => controller.abort()

    }, [url])

    useEffect(() => {
        refresh()
    }, [refresh])

    return { data, refresh, pending, error };
}

export default useFetch;