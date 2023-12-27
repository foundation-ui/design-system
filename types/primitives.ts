export type TComponentAPI = boolean | string | number | null;

export interface IReactChildren {
  children: React.ReactNode;
}
export interface IComponentAPI {
  id: string;
  states: Record<string, TComponentAPI>;
  methods: Record<string, (args?: TComponentAPI | any) => void>;
}
export interface IComponentStyling {
  raw?: boolean;
}
