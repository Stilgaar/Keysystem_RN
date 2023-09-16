import { useEffect, useState, useCallback } from 'react'

// HOOK TO FETCH EVERYTING YOU CAN IN ONE LINE !
// THOU SHALL NOT FETCH

const useFetch = (url, shouldFetch = true) => {

    const [data, setData] = useState()
    const [pending, setPending] = useState(null)
    const [error, setError] = useState(null)

    console.log(url)

    const refresh = useCallback(async () => {

        if (!shouldFetch) return;

        let results = [];

        setPending(true)
        setError(null)

        // if url is an array, so it can make more calls
        try {
            if (Array.isArray(url)) {
                const controllers = url.map(() => new AbortController());

                results = await Promise.all(
                    url.map((eachUrl, index) =>
                        fetch(eachUrl,
                            {
                                signal: controllers[index].signal
                            }
                        )
                    )
                );

                // Régular simple URL
            } else {

                const controller = new AbortController();
                results = [await fetch(url,
                    {
                        signal: controller.signal
                    }
                )];

            }

            const jsons = [];

            for (let res of results) {

                if (!res.ok) {
                    throw new Error(res.status);
                }

                jsons.push(await res.json());
            }

            // sets what it needs
            setData(Array.isArray(url) ? jsons : jsons[0]);

            setPending(false)
            setError(null)
        }
        // error getter
        catch (err) {
            setError(err.toString())
            setPending(false)
        }

        return () => {
            /// Clean up function for eacth call
            if (Array.isArray(url)) {
                url.forEach(() => new AbortController().abort());
            } else {
                // Clean up function for simmple call
                new AbortController().abort();
            }
        };

    }, [url, shouldFetch])

    useEffect(() => {
        refresh()
    }, [refresh])

    return { data, refresh, pending, error, setError };
}

export default useFetch;