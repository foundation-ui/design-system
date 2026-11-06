export const isSafeUrl = (url?: string): url is string =>
  !!url &&
  (/^(https?:)?\/\//i.test(url) ||
    /^data:(image|video)\//i.test(url) ||
    !/^[a-z][a-z0-9+.-]*:/i.test(url.trim()));
