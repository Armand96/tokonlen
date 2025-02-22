import { useState } from "react";

const useLoading = () => {
    const [loading, setLoading] = useState<boolean>(true);

    const SetLoading = (loading: boolean) => {
        setLoading(() => loading);
    };

    return {
        SetLoading,
        loading
    };
};

export default useLoading;
