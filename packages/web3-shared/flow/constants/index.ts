import Auth from '@masknet/web3-constants/flow/auth.json'
import Token from '@masknet/web3-constants/flow/token.json'
import TopShot from '@masknet/web3-constants/flow/top-shot.json'
import { hookTransform, transform } from '@masknet/web3-kit'
import { ChainId } from '../types'

export const getAuthConstants = transform(ChainId, Auth)
export const useAuthConstants = hookTransform(getAuthConstants)

export const getTokenConstants = transform(ChainId, Token)
export const useTokenConstants = hookTransform(getTokenConstants)

export const getTopShotConstants = transform(ChainId, TopShot)
export const useTopShotConstants = hookTransform(getTopShotConstants)
