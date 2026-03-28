import { cookies } from 'next/headers'
import { getDict, type Dict } from './index'

export async function getServerT(): Promise<Dict> {
  const jar = await cookies()
  const lang = jar.get('kallipas_lang')?.value ?? 'EN'
  return getDict(lang)
}
