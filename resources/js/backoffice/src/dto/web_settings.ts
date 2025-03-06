interface WebSettings {
    name: string;
    value: string;
    is_active: boolean;
}

interface WebSettingsCreateUpdate {
    name: string;
    value: string;
    is_active: boolean;
}

export { WebSettings, WebSettingsCreateUpdate }
