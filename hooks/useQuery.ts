import useAsyncEffect from 'use-async-effect'
import { useStateIfMounted } from 'use-state-if-mounted'
import instance from '../api/instance'

const useQuery = <T>(
    url: string,
    args?: any,
    type: 'post' | 'get' = 'get',
    middleware?: (data: T) => T
): [boolean, T | null, string, (args?: any) => void] => {
    const [loading, setLoading] = useStateIfMounted(true)
    const [data, setData] = useStateIfMounted<T | null>(null)
    const [error, setError] = useStateIfMounted('')

    const getData = async (args?: any) => {
        try {
            setLoading(true)

            const { data } =
                type === 'get'
                    ? await instance.get(url, { params: args })
                    : await instance.post(url, { args })

            setData(middleware?.(data.data) || data.data)
        } catch ({ response }) {
            if (response) {
                setError(response.message)

                response.status === 500 &&
                    setError('Произошла ошибка на сервере. Сервис временно недоступен')
            } else {
                setError('Произошла непредвиденная ошибка')
            }
        } finally {
            setLoading(false)
        }
    }

    useAsyncEffect(async () => {
        await getData(args)
    }, [])

    return [loading, data, error, getData]
}

export default useQuery
