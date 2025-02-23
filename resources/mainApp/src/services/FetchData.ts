import apiService from "./api"

const FetchData = {
    GetCategories: async () => {
        const res = await apiService.getData(`api/category`);
        return res.data;
    },
    GetBanners: async (params: string = '' ) => {
        const res = await apiService.getData(`api/banner${params}`);
        return res.data;
    },
    GetProduk: async (params: string = '' ) => {
        const res = await apiService.getData(`api/product${params}`);
        return res.data;
    },
    SearchAll: async (params: string = '' ) => {
        const res = await apiService.getData(`api/product${params}`);
        return res.data;
    },
};

export default FetchData