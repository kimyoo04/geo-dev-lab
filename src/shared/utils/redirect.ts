import { redirect } from 'next/navigation'

/**
 * 메시지를 URL 인코딩하여 지정된 경로로 리다이렉트합니다.
 * 에러나 성공 메시지를 쿼리 파라미터로 포함시킵니다.
 *
 * @param {'error' | 'success'} type - 메시지 타입 ('error' 또는 'success')
 * @param {string} path - 리다이렉트할 경로
 * @param {string} message - 전달할 메시지
 * @returns {never} 리다이렉트가 발생하므로 함수가 반환되지 않음
 *
 * @example
 * // 성공 메시지와 함께 리다이렉트
 * encodedRedirect('success', '/dashboard', '저장되었습니다');
 *
 * // 에러 메시지와 함께 리다이렉트
 * encodedRedirect('error', '/login', '로그인이 필요합니다');
 */
export function encodedRedirect(type: 'error' | 'success', path: string, message: string): never {
  return redirect(`${path}?${type}=${encodeURIComponent(message)}`)
}
