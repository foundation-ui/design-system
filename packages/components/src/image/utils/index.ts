export const isSafeUrl = (url?: string): url is string =>
  !!url &&
  (/^(https?:)?\/\//i.test(url) ||
    /^data:image\//i.test(url) ||
    !/^[a-z][a-z0-9+.-]*:/i.test(url.trim()));

export const sanitizeSrcSet = (srcSet?: string) =>
  srcSet
    ?.split(",")
    .filter((c) => isSafeUrl(c.trim().split(/\s+/)[0]))
    .join(",") || undefined;
