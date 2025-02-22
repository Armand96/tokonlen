import apiService from "./api"

const FetchData = {
    GetNavbar: async () => {
        const res = await apiService.getData(`api/category`);
        return res.data;
    }
};

export default FetchData