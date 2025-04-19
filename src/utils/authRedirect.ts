/**
 * Redirects to the token authentication page with the provided tokens
 * @param accessToken The access token
 * @param refreshToken The refresh token
 * @param redirectTo Where to redirect after successful authentication
 */
export function redirectToTokenAuth(
  accessToken: string,
  refreshToken: string,
  redirectTo: string = '/home'
): void {
  // Create URL with tokens as query parameters
  const url = new URL('/auth/token', window.location.origin);
  url.searchParams.append('access_token', accessToken);
  url.searchParams.append('refresh_token', refreshToken);
  url.searchParams.append('redirect', redirectTo);
  
  // Redirect to the token authentication page
  window.location.href = url.toString();
}

/**
 * Generates a login URL with the provided tokens
 * @param accessToken The access token
 * @param refreshToken The refresh token
 * @param redirectTo Where to redirect after successful authentication
 * @returns The login URL with tokens as query parameters
 */
export function getTokenAuthUrl(
  accessToken: string,
  refreshToken: string,
  redirectTo: string = '/home'
): string {
  // Create URL with tokens as query parameters
  const url = new URL('/auth/token', window.location.origin);
  url.searchParams.append('access_token', accessToken);
  url.searchParams.append('refresh_token', refreshToken);
  url.searchParams.append('redirect', redirectTo);
  
  return url.toString();
}