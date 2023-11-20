export class NavigationItem {
    id: number;
    name: string;
    url: string;
    parentId: number | null;
    children: NavigationItem[];
    hasChildren: boolean;
}
