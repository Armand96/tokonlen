import apiService from "./api"

const FetchData = {
    GetCategories: async () => {
        const res = await apiService.getData(`api/category`);
        return res.data;
    }
};

export default FetchData