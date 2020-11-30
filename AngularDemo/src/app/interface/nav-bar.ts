export interface Navbar {
    id: number;
    title: string;
    url: string;
    alignment: number;
    childId: NavbarChild[];
}

export interface NavbarChild {
    id: number;
    title: string;
    url: string;
}