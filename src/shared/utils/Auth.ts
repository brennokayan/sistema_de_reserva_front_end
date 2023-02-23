const STORAGE_KEY = "como decriptar uma string com sha256 reactTS"

const isLogged = () => !!localStorage.getItem(STORAGE_KEY);
const login = (token: string) => {
    localStorage.setItem(STORAGE_KEY, token)
}
const logout = () => localStorage.removeItem(STORAGE_KEY);

export { isLogged, login, logout }