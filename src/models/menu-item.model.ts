

export interface IMenuItem{
    text: string;
    icon: JSX.Element;
    onClick: (event: React.MouseEvent<HTMLLIElement>) => void
}