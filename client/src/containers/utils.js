import queryString from 'query-string';

export const extractTokenFromURL = () => {
    var { query } = queryString.parseUrl(window.location.href);
    return query.token ? query.token : '';
}