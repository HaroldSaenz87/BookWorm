import {create} from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface User{
    id: string;
    username: string;
    email: string;
    profileImage: string;

}

interface AuthState {
    user: User | null;
    token: string | null;
    isLoading: boolean;

    register: (username: string, email: string, password: string) => Promise<{success: boolean; error?: string}>;
    login: (email:string, password:string) => Promise<{success: boolean; error?: string}>;
    checkAuth: () => Promise<void>;
    logout: () => Promise<void>;
}


export const useAuthStore = create<AuthState>((set) => ({

    user: null,
    token: null,
    isLoading: true,

    register: async (username, email, password) => {
        set({ isLoading: true });
        try {
            
            const response = await fetch("https://bookworm-xkkg.onrender.com/api/auth/register", {
                method: "POST",
                headers: { 
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username, 
                    email, 
                    password
                    
                }),
            })

            const data = await response.json();

            if(!response.ok){
                
                throw new Error(data.message || "Something went wrong");
            
            }

            await AsyncStorage.setItem("user", JSON.stringify(data.user));
            await AsyncStorage.setItem("token", data.token);

            set({token: data.token, user: data.user, isLoading: false});

            return {success: true};


        } catch (error: any) {

            set({isLoading: false});

            return {success: false, error: error.message};
        
        } finally {

            set({ isLoading: false });
        
        }
    },

    checkAuth: async() => {

        set({ isLoading: true });

        try {

            const token = await AsyncStorage.getItem("token");
            const userJson = await AsyncStorage.getItem("user");

            if (token && userJson) {
                set({ token, user: JSON.parse(userJson), isLoading: false });
            }
            else {
                set({ isLoading: false });
            }

            
        } catch (error) {

            console.log("Auth check failed", error);
            
        }

    },

    logout: async() => {

        await AsyncStorage.removeItem("token");
        await AsyncStorage.removeItem("user");

        set({ token: null, user: null});

    },

   
    login: async (email, password) => {

        set({ isLoading: true });

        try {

            const response = await fetch("https://bookworm-xkkg.onrender.com/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            });

            const data = await response.json();

            if(!response.ok){
                throw new Error(data.message || "Something went wrong");
            }

            await AsyncStorage.setItem("user", JSON.stringify(data.user));
            await AsyncStorage.setItem("token", data.token);

            set({ token: data.token, user: data.user, isLoading: false});

            return {success: true};
            
        } catch (error: any) {
            
            set({ isLoading: false });

            return {success: false, error: error.message};
            
        }
    },

}));