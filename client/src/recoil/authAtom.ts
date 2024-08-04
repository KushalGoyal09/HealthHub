import axios from "axios";
import { atom, selector } from "recoil";

export const tokenAtom = atom({
    key: "tokenAtom",
    default: selector({
        key: "tokenSelector",
        get: () => {
            return localStorage.getItem("token");
        },
    }),
});

export interface User {
    name: string;
    email: string;
    role: "ADMIN" | "DOCTOR" | "PATIENT" | "USER";
    patientId: number | undefined;
    doctorId: number | undefined;
}

interface ResBody {
    success: boolean;
    message: string;
    user: User;
}

export const userAtom = atom({
    key: "userAtom",
    default: selector({
        key: "userSelector",
        get: async ({ get }) => {
            const token = get(tokenAtom);
            if (!token) {
                return null;
            }
            try {
                const { data } = await axios.get<ResBody>("/api/me", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                return data.user;
            } catch (error) {
                return null;
            }
        },
    }),
});
