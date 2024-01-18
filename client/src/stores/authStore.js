import { action, makeAutoObservable, observable } from "mobx"
import { serviceCheckUser, serviceSignIn, serviceSignOut, serviceSignUp } from "../services/authService"
import axios from "axios"
import { API_URL } from "../http"

export default class AuthStore {
    user = {}
    isAuth = false
    isLoading = false

    constructor() {
        makeAutoObservable(this, {
            user: observable,
            isAuth: observable,
            isLoading: observable,
            setUser: action,
            setAuth: action,
            setLoading: action,
        })
    }

    setUser(user) {
        this.user = user
    }

    setAuth(bool) {
        this.isAuth = bool
    }

    setLoading(bool) {
        this.isLoading = bool
    }

    async checkUser(email) {
        try {
            const response = await serviceCheckUser(email)
            return response.data
        } catch (e) {
            console.log(e.response?.data?.message)
        }
    }

    async signIn(email, password) {
        try {
            const response = await serviceSignIn(email, password)
            localStorage.setItem('token', response.data.accessToken)
            this.setAuth(true)
            this.setUser(response.data.user)
        } catch (e) {
            console.log(e.response?.data?.message)
        }
    }

    async signUp(email, name, surname, password) {
        try {
            const response = await serviceSignUp(email, name, surname, password)
            localStorage.setItem('token', response.data.accessToken)
            this.setAuth(true)
            this.setUser(response.data.user)
        } catch (e) {
            console.log(e.response?.data?.message)
        }
    }

    async signOut() {
        try {
            await serviceSignOut()
            localStorage.removeItem('token')
            this.setAuth(false)
            this.setUser({})
        } catch (e) {
            console.log(e.response?.data?.message)
        }
    }

    async checkAuth() {
        this.setLoading(true)
        try {
            const response = await axios(`${API_URL}/refresh`, {
                withCredentials: true,
            })
            localStorage.setItem('token', response.data.accessToken)
            this.setAuth(true)
            this.setUser(response.data.user)
        } catch (e) {
            console.log(e.response?.data?.message)
        } finally {
            this.setLoading(false)
        }
    }
}