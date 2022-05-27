import { useLazyQuery, useMutation } from '@apollo/client'
import jwt_decode from 'jwt-decode'
import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useState,
} from 'react'
import { useCookies } from 'react-cookie'
import { LOGIN } from '../graphql/mutation'
import { QUERY_ME } from '../graphql/query'

const UserContext = createContext()

const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null)

    const [cookie, setCookie, removeCookie] = useCookies(['token'])
    // const navigate = useNavigate()

    const [login] = useMutation(LOGIN)
    const [queryMe] = useLazyQuery(QUERY_ME)

    useEffect(() => {
        const loadMe = async () => {
            try {
                let res = await queryMe({
                    variables: { id: jwt_decode(cookie.token)?._id },
                })
                setUser(res?.data?.me)
            } catch (e) {
                console.error(e)
            }
        }
        loadMe()
    }, [])

    const handleOnLogin = useCallback(async (e) => {
        e.preventDefault()

        const [email, password] = e.target
        const record = { email: email.value, password: password.value }

        try {
            const res = await login({ variables: record })
            setCookie('token', res?.data?.login?.token, { maxAge: 86400 })
            setUser(res?.data?.login?.user)
            window.location.pathname = '/'
        } catch (e) {
            console.error(e)
        }
    }, [])

    const handleOnLogout = useCallback(() => {
        window.location.pathname = '/login'
        setUser(null)
        removeCookie('token', { maxAge: 86400, path: '/' })
    }, [])

    return (
        <UserContext.Provider
            value={{
                handleOnLogin,
                handleOnLogout,
                user,
                cookie,
            }}
        >
            {children}
        </UserContext.Provider>
    )
}

export const useUserStorage = () => useContext(UserContext)

export default UserProvider
