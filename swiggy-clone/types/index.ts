export interface MenuItem {
    id: string;
    name: string;
    description: string;
    price: number;
    category: string;
    image: string;
    isVeg: boolean;
    isBestseller?: boolean;
    rating?: number;
    calories?: number;
    customizable?: boolean;
}

export interface Category {
    id: string;
    name: string;
    icon: string;
}

export interface CartItem extends MenuItem {
    quantity: number;
}

export interface Restaurant {
    name: string;
    tagline: string;
    cuisine: string;
    rating: number;
    totalRatings: string;
    deliveryTime: string;
    minOrder: number;
    deliveryFee: number;
    address: string;
    phone: string;
    openTime: string;
    closeTime: string;
    heroImage: string;
    logo: string;
}
