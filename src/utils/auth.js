const TOKEN_NAME = 'hkzf_token'

const GetToken = () => localStorage.getItem(TOKEN_NAME)

const SetToken = () => localStorage.setItem(TOKEN_NAME)

const RemoveToken = () => localStorage.removeItem(TOKEN_NAME)

const HasAuth = () => !!GetToken()


export { GetToken,SetToken,RemoveToken,HasAuth}