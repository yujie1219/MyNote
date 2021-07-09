export default interface RouterConfig {
    key: string;
    title: string;
    path: string;
    exact: boolean;
    main: () => JSX.Element;
}