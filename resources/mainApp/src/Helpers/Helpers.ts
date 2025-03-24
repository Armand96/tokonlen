
const Helpers = {
    FormatPrice: (amount: any) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(amount);
    },
    GetImage: (url: string) => {
        return process.env.NEXT_PUBLIC_URL_STORAGE + url
    },
    CheckDecimal: (number: number | string) => {
        if (typeof number === 'string') {
            number = Number.parseFloat(number)
        }
        const numberCheck = number % 1 !== 0;
        if (numberCheck) {
            return number?.toFixed(2)
        } else {
            return number?.toFixed(0)
        }
    }
};

export default Helpers