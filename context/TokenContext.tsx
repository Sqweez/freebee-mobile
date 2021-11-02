import { createContext } from 'react'

type TokenContextType = {
    tokens: boolean
    setTokens: (tokens: boolean) => void
}

const TokenContext = createContext<TokenContextType>({
    tokens: false,
    setTokens: tokens => {},
})

export default TokenContext
