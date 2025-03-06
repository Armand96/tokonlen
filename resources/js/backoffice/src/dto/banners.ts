interface Banners {
    name: string;
    image: string;
    slug: string;
    is_active: boolean;
    id: number;

}

interface BannersType {
    name: string;
    image_file: any; // gw kurang tau untuk image apa isinya di js
    is_active: boolean;
    caption?: string;
}

export { Banners, BannersType }
