import { useRegisteredPlugin } from './useRegisteredPlugin'

export function useRegisteredPluginNetwork(pluginID: string, networkTypeOrID?: string) {
    return useRegisteredPlugin(pluginID)?.networks?.find((x) => x.type === networkTypeOrID || x.ID === networkTypeOrID)
}
