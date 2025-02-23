
const Helpers = {
    FormatPrice: (amount: any) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
          }).format(amount);
    },
    GetImage: (url: string ) => {
        return process.env.NEXT_PUBLIC_URL_STORAGE + url
    }
};

export default Helpers