import { ALLOWED_HOST, PROTOCOL } from '../constants';

/**
 * to check if url is a valid url.
 * @param url
 * @returns true if url is valid, else false.
 */
export const isValidURL = (url: string): boolean => {
  try {
    const validURL = new URL(url);
    return !!validURL;
  } catch (e) {
    return false;
  }
};

/**
 * this is to check if url is in the allowed list
 * @param urls list of url
 * @returns an array of allowed urls
 */
export const getAllowedUrls = (urls: string[]) => {
  return urls.filter((url) => {
    if (!isValidURL(url)) return false;

    const fullURL = new URL(url);

    return (
      ALLOWED_HOST.includes(fullURL.host) && fullURL.protocol === `${PROTOCOL}:`
    );
  });
};
