import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3001"   // ✅ BACKEND
});

export const Apiservice = {
    async get(path, config = {}) {
        const res = await api.get(path, config);
        return res.data;
    },

    async post(path, data = {}, config = {}) {
        const res = await api.post(path, data, config);
        return res.data;
    },

    async put(path, data = {}, config = {}) {
        const res = await api.put(path, data, config);
        return res.data;
    },

    async delete(path, config = {}) {
        const res = await api.delete(path, config);
        return res.data;
    }
};
