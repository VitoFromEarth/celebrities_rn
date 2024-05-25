export function composeURLWithQueryParams(
  baseURL: string,
  params?: Record<string, string | number>,
) {
  try {
    if (!params) {
      return baseURL;
    }

    const url = new URL(baseURL);
    for (const key in params) {
      if (params.hasOwnProperty(key)) {
        url.searchParams.append(key, params[key].toString());
      }
    }

    return url.toString().replace(/\/$/, '');
  } catch (error) {
    console.error('Invalid URL:', error);
    return '';
  }
}
