export type RouteItem = {
  path: string;
  name: string;
  index?: boolean;
  icon: JSX.Element;
  element: JSX.Element;
};

export type RouteItems = RouteItem[];
