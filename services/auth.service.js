import AsyncStorage from '@react-native-async-storage/async-storage';
import API from '../api/axios.config';

class AuthService {
    async login(email, password) {
        const { data } = await API.post("/auth/login", {
            email,
            password,
        });
        return data;
    }

    async googleLogin(code) {
        const { data } = await API.post("/auth/google", {
            code,
        });
        return data;
    }

    async logout() {
        await AsyncStorage.removeItem("user");
        await AsyncStorage.removeItem("token");
        await AsyncStorage.removeItem("expiresAt");
    }

    forgotPassword(email) {
        return API.post("/auth/forgot-password", {
            email,
        });
    }

    checkToken(token, email) {
        return API.post("/auth/check-token", {
            token,
            email,
        });
    }

    resetPassword(token, email, password, password2) {
        return API.post("auth/reset-password", {
            token,
            email,
            password,
            password2,
        });
    }

    register(username, email, password) {
        return API.post("auth/signup", {
            username,
            email,
            password,
        });
    }

    getCurrentUser() {
        return API.get("/user/profile");
    }
}

export default new AuthService();