interface LinkType {
    name: string;
    image: string;
    image_thumb: string;
    is_active: boolean;
}

interface LinkTypeCreateUpdate {
    name: string;
    image_file: any; // gw kurang tau untuk image apa isinya di js
    is_active: boolean;
}

export { LinkType, LinkTypeCreateUpdate }
