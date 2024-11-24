import { revalidatePath, revalidateTag } from 'next/cache'

/**
 * Next.js의 캐시를 무효화하는 함수들을 통합적으로 처리합니다.
 *
 * @param {Object} options - 캐시 무효화 옵션
 * @param {(string|string[]|null)} [options.revalidatePaths] - 무효화할 경로 또는 경로 배열
 * @param {(string|string[]|null)} [options.revalidateTags] - 무효화할 태그 또는 태그 배열
 * @param {any} [options[key]] - 추가 옵션
 * @returns {boolean} 캐시 무효화 성공 여부
 *
 * @example
 * revalidates({
 *   revalidatePaths: ['/blog', '/posts'],
 *   revalidateTags: ['posts']
 * });
 */
export function revalidates(options: {
  revalidatePaths?: string | string[] | null
  revalidateTags?: string | string[] | null
  [key: string]: any
}): boolean {
  let revalidated: boolean = false

  if (options?.revalidatePaths) {
    revalidated = revalidatePaths(options?.revalidatePaths)
  }

  if (options?.revalidateTags) {
    revalidated = revalidateTags(options?.revalidateTags)
  }

  return revalidated
}

/**
 * 지정된 경로의 캐시를 무효화합니다.
 *
 * @param {(string|string[]|null)} [paths] - 무효화할 경로 또는 경로 배열
 * @returns {boolean} 캐시 무효화 성공 여부
 *
 * @example
 * revalidatePaths('/blog');
 * revalidatePaths(['/blog', '/posts']);
 */
export function revalidatePaths(paths?: string | string[] | null): boolean {
  let revalidated: boolean = false

  if (Array.isArray(paths) && paths?.length > 0) {
    paths.forEach((path: string) => {
      revalidatePath(encodeURI(path))
      revalidated = true
    })
  } else if (typeof paths === 'string') {
    revalidatePath(encodeURI(paths))
    revalidated = true
  }

  return revalidated
}

/**
 * 지정된 태그의 캐시를 무효화합니다.
 *
 * @param {(string|string[]|null)} [tags] - 무효화할 태그 또는 태그 배열
 * @returns {boolean} 캐시 무효화 성공 여부
 *
 * @example
 * revalidateTags('posts');
 * revalidateTags(['posts', 'comments']);
 */
export function revalidateTags(tags?: string | string[] | null): boolean {
  let revalidated: boolean = false

  if (Array.isArray(tags) && tags?.length > 0) {
    tags.forEach((path: string) => {
      revalidateTag(path)
      revalidated = true
    })
  } else if (typeof tags === 'string') {
    revalidateTag(tags)
    revalidated = true
  }

  return revalidated
}
