import React, { useMemo, useEffect } from 'react';
import API from '../api/axios.config';
import { useUser } from '../context/userContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const WithAxios = ({ children }) => {
  const { setIsLoggedIn, setUserData, setAuthData, isLoggedIn } = useUser();
  const navigation = useNavigation();

  useEffect(() => {
    const setupInterceptor = async () => {
      if (isLoggedIn) {
        API.interceptors.response.use(
          (response) => response,
          async (error) => {
            const originalRequest = error.config;
            if (error.response.status === 401 && originalRequest.url === "/auth/refresh-token") {
              setIsLoggedIn(false);
              setAuthData(null);
              setUserData(null);
              navigation.navigate('Login');
              return Promise.reject(error);
            }

            if (error.response.status === 401 && !originalRequest._retry) {
              originalRequest._retry = true;
              try {
                const res = await API.post("/auth/refresh-token");
                await AsyncStorage.setItem("token", JSON.stringify(res.data.token));
                return API(originalRequest);
              } catch (err) {
                await AsyncStorage.removeItem("token");
                setIsLoggedIn(false);
                setAuthData(null);
                setUserData(null);
                navigation.navigate('Login');
              }
            }
            return Promise.reject(error);
          }
        );
      }
    };

    setupInterceptor();
  }, [isLoggedIn, setAuthData, setIsLoggedIn, setUserData, navigation]);

  return children;
};

export default WithAxios;