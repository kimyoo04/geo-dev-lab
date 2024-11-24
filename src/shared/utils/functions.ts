import { type Tag } from '@/shared/lib'
import { type Meta } from '@/shared/types/database'

/**
 * Meta 배열에서 특정 키에 대한 값을 설정하거나 새로운 Meta를 추가합니다.
 *
 * @template T
 * @param {T} meta - Meta 객체들의 배열
 * @param {string} key - 설정할 meta_key
 * @param {string | null} value - 설정할 meta_value
 * @param {Object} [options] - 추가적인 옵션들
 * @returns {T} 업데이트된 Meta 배열
 *
 * @example
 * setMeta(metaArray, 'theme', 'dark');
 * setMeta(metaArray, 'language', 'ko', { priority: 1 });
 */
export function setMeta<T extends Meta[] | undefined>(
  meta: T,
  key: string,
  value: string | null,
  options?: { [x: string]: any },
): T {
  const found: boolean = !!meta?.find((r: Meta) => r.meta_key === key)

  if (meta && found) {
    const newMeta = meta?.map((r: Meta) => {
      if (r.meta_key === key) r.meta_value = value
      return r
    })
    return newMeta as T
  }

  const data = options
    ? Object.assign({}, { meta_key: key, meta_value: value }, options)
    : { meta_key: key, meta_value: value }

  const newMeta = Array.isArray(meta) && meta?.length > 0 ? [...meta, data] : [data]

  return newMeta as T
}

/**
 * Meta 배열에서 특정 키를 가진 Meta 객체를 찾아 반환합니다.
 *
 * @param {Meta[] | undefined} meta - Meta 객체들의 배열
 * @param {string} key - 찾을 meta_key
 * @returns {Meta | undefined} 찾은 Meta 객체 또는 undefined
 *
 * @example
 * const themeMeta = getMeta(metaArray, 'theme');
 */
export function getMeta(meta: Meta[] | undefined, key: string): Meta | undefined {
  return meta?.find((r: Meta) => r.meta_key === key)
}

/**
 * Meta 배열에서 특정 키의 값을 반환합니다. 값이 없을 경우 기본값을 반환합니다.
 *
 * @param {Meta[] | undefined} meta - Meta 객체들의 배열
 * @param {string} key - 찾을 meta_key
 * @param {string} [defaultValue=''] - 기본값
 * @returns {string} meta_value 또는 기본값
 *
 * @example
 * const theme = getMetaValue(metaArray, 'theme', 'light');
 */
export function getMetaValue(
  meta: Meta[] | undefined,
  key: string,
  defaultValue: string = '',
): string {
  return meta?.find((r: Meta) => r.meta_key === key)?.meta_value ?? defaultValue
}

/**
 * 이전 Meta 배열과 새로운 Meta 객체의 특정 키에 대한 값을 비교합니다.
 *
 * @param {Meta[] | undefined} older - 이전 Meta 객체들의 배열
 * @param {Meta} newer - 새로운 Meta 객체
 * @param {string} key - 비교할 meta_key
 * @returns {boolean} 값이 동일한지 여부
 *
 * @example
 * const isThemeSame = compareMetaValue(oldMetaArray, newMeta, 'theme');
 */
export function compareMetaValue(older: Meta[] | undefined, newer: Meta, key: string): boolean {
  const oldValue: string = older?.find((r: Meta) => r.meta_key === key)?.meta_value ?? ''
  const newValue: string = newer?.meta_value ?? ''

  return oldValue === newValue
}

/**
 * 두 Tag 배열을 비교하여 추가, 제거, 업데이트, 동일한 태그들을 분류합니다.
 *
 * @param {Tag[]} older - 이전 Tag 배열
 * @param {Tag[]} newer - 새로운 Tag 배열
 * @returns {{
 *   added: Tag[],     // 새로 추가된 태그들
 *   removed: Tag[],   // 제거된 태그들
 *   updated: Tag[],   // 업데이트된 태그들
 *   same: Tag[],      // 변경되지 않은 태그들
 *   other: Tag[]      // ID는 같지만 내용이 다른 태그들
 * }}
 *
 * @example
 * const { added, removed, updated, same, other } = compareTags(oldTags, newTags);
 */
export function compareTags(
  older: Tag[],
  newer: Tag[],
): { added: Tag[]; removed: Tag[]; updated: Tag[]; same: Tag[]; other: Tag[] } {
  const olderIds = older.map((r: Tag) => r.id)
  const newerIds = newer.map((r: Tag) => r.id)

  const added = newer.filter((r: Tag) => !olderIds.includes(r.id))
  const removed = older.filter((r: Tag) => !newerIds.includes(r.id))
  const other = newer.filter((r: Tag) => olderIds.includes(r.id))

  const updated = other.filter((r: Tag) => r.text !== older.find((x) => x.id === r.id)?.text)
  const updatedIds = updated.map((r: Tag) => r.id)
  const same = other.filter((r: Tag) => !updatedIds.includes(r.id))

  return { added, removed, updated, same, other }
}
