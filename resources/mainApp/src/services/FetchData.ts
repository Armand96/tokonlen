import apiService from "./api"

const FetchData = {
    GetCategories: async (params: string = '' ) => {
        const res = await apiService.getData(`api/category${params}`);
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
    GetSize: async (params: string = '' ) => {
        const res = await apiService.getData(`api/size${params}`);
        return res.data;
    },
    GetBrand: async (params: string = '' ) => {
        const res = await apiService.getData(`api/brand${params}`);
        return res.data;
    },
    GetWebSettings: async (params: string = '' ) => {
        const res = await apiService.getData(`api/web_setting${params}`);
        return res.data;
    },
    SearchAll: async (params: string = '' ) => {
        const res = await apiService.getData(`api/search?words=${params}`);
        return res.data;
    },
    PostClickToOtherShop: async (body: any ) => {
        const res = await apiService.postDataWithFormData(`api/link_visit`, body);
        return res.data;
    },
};

export default FetchData