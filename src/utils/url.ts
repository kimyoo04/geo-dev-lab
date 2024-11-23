/**
 * 상대 경로를 절대 URL로 변환합니다.
 * NEXT_PUBLIC_URL 환경변수를 기반으로 완전한 URL을 생성합니다.
 * URL 경로의 중복 슬래시를 제거하고 끝의 슬래시도 제거합니다.
 *
 * @param {string} [path] - 변환할 상대 경로
 * @returns {string} 정규화된 절대 URL
 */
export function absoluteUrl(path?: string): string {
  const origin = process.env.NEXT_PUBLIC_URL!
  const uri = origin && path ? `${origin}/${path}` : origin
  const sanitized = uri?.replace(/\/+/g, '/')?.replace(/\/+$/, '')

  return new URL(sanitized).toString()
}

/**
 * 주어진 URL이 절대 URL인지 확인합니다.
 * 프로토콜(http://, https:// 등)이 포함된 URL을 절대 URL로 판단합니다.
 *
 * @param {string} url - 검사할 URL 문자열
 * @returns {boolean} 절대 URL 여부
 */
export function isAbsoluteUrl(url: string): boolean {
  return /^(?:[a-zA-Z+]+:\/\/)/.test(url)
}

/**
 * 절대 URL을 상대 URL로 변환합니다.
 * URL의 origin 부분을 제거하고 경로만 반환합니다.
 * URL 경로의 중복 슬래시를 제거하고 끝의 슬래시도 제거합니다.
 *
 * @param {string} url - 변환할 URL
 * @returns {string} 상대 URL 경로
 */
export function relativeUrl(url: string): string {
  if (!isAbsoluteUrl(url)) return url

  const sanitized = url?.replace(/\/+/g, '/')?.replace(/\/+$/, '')
  const new_url = new URL(sanitized)

  return new_url.toString().substring(new_url.origin.length)
}

/**
 * URL 경로와 쿼리 문자열을 결합하여 URN을 생성합니다.
 * 경로의 중복 슬래시를 제거하고 끝의 슬래시도 제거합니다.
 *
 * @param {string} path - URL 경로
 * @param {string} query - 쿼리 문자열
 * @returns {string} 생성된 URN
 */
export function setUrn(path: string, query: string): string {
  const sanitized = path.replace(/\/+/g, '/').replace(/\/+$/, '')

  return [sanitized, query].filter(Boolean).join('?')
}

/**
 * URLSearchParams 객체를 일반 객체로 변환합니다.
 *
 * @param {URLSearchParams} searchParams - 변환할 URLSearchParams 객체
 * @returns {Record<string, string>} 쿼리 파라미터 객체
 */
export function getQueryString(searchParams: URLSearchParams): Record<string, string> {
  return Object.fromEntries(searchParams?.entries())
}

/**
 * 객체를 URL 쿼리 문자열로 변환합니다.
 * null이나 undefined 값을 가진 속성은 제외됩니다.
 *
 * @param {T} object - 쿼리 문자열로 변환할 객체
 * @returns {string} 생성된 쿼리 문자열
 * @template T
 */
export function setQueryString<T extends Record<string, any>>(object: T): string {
  const params = Object.keys(object).reduce((acc: T, key: string) => {
    if (object[key] === undefined || object[key] === null) {
      return acc
    }
    acc[key as keyof T] = object[key]
    return acc
  }, {} as T)

  return new URLSearchParams(params).toString()
}
