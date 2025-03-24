interface Size {
    name: string;
    format_size: string;
    is_active: boolean;
}

interface SizeCreateUpdate {
    name: string;
    format_size: string;
    is_active: boolean;
}

export { Size, SizeCreateUpdate }
