import { atom } from 'recoil'

export const viewPostId = atom<number>({
  key: 'viewPostId',
  default: 0,
})
