export const HelperFunction = {
    FormatToRupiah: function (angka: number | string) {
        let rupiah = '';
        const angkaRev = Number.parseFloat(angka.toString()).toFixed(0).toString().split('').reverse().join('');
        for (let i = 0; i < angkaRev.length; i++) {
            if (i % 3 === 0) {
                rupiah += angkaRev.substr(i, 3) + '.';
            }
        }
        return 'Rp ' + rupiah.split('', rupiah.length - 1).reverse().join('');
    },
    FormatToRupiah2: function (angka: number ) {
        let rupiah = '';
        const angkaRev = angka.toString().split('').reverse().join('');
        for (let i = 0; i < angkaRev.length; i++) {
            if (i % 3 === 0) {
                rupiah += angkaRev.substr(i, 3) + '.';
            }
        }
        return rupiah.split('', rupiah.length - 1).reverse().join('');
    },
    onlyNumber(parseNumber: string) {

        const parse = parseNumber.replace(/[^\d]/g, '')

        parseInt(parse)

        return parse

    },
    FormatOptions: (data: any[], label: string, value: string,  label2?: string  ) => {
        const options = data?.map((x: { [key: string]: unknown }) => {
            return {
                label: label2 ?`${ x?.[label as keyof typeof x] as string } - ${x?.[label2 as keyof typeof x] as string }` :  x?.[label as keyof typeof x] as string ,
                value: x?.[value as keyof typeof x]as string,
                detail: x
            };
        });

        return options
    },
    FormatOptionsVariants: (data: any[], label: string, value: string,    ) => {
        const options = data?.map((x: { [key: string]: unknown }) => {
            return {
                label: `${ x?.[label as keyof typeof x] as string } - ${ x?.product?.["name"] as string } - ${ x?.["size"] as string }`,
                value: x?.[value as keyof typeof x]as string,
                detail: x
            };
        });

        return options
    },
    GetImage: (img: string) => {
        return `${import.meta.env.VITE_PUBLIC_URL_STORAGE}${img}`
    }
}

