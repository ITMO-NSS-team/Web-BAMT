declare namespace HeaderModuleScssNamespace {
  export interface IHeaderModuleScss {
    auth: string;
    email: string;
    head: string;
    item: string;
    link: string;
    list: string;
  }
}

declare const HeaderModuleScssModule: HeaderModuleScssNamespace.IHeaderModuleScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: HeaderModuleScssNamespace.IHeaderModuleScss;
};

export = HeaderModuleScssModule;
