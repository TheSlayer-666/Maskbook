import { useEffect, useState } from 'react'
import { makeStyles } from '@masknet/theme'
import { DialogContent } from '@mui/material'
import { useRemoteControlledDialog, useValueRef } from '@masknet/shared'
import { useI18N } from '../../../../utils/i18n-next-ui'
import { WalletMessages } from '../../messages'
import { InjectedDialog } from '../../../../components/shared/InjectedDialog'
import { hasNativeAPI, nativeAPI } from '../../../../utils'
import { PluginProviderRender } from './PluginProviderRender'
import { PluginNetworkWatcher } from './PluginNetworkWatcher'
import { networkIDSettings, pluginIDSettings } from '../../../../settings/settings'
import {
    useRegisteredNetworks,
    useRegisteredProviders,
    useActivatedPluginWeb3UI,
    useNetworkType,
    useRegisteredPluginNetwork,
} from '@masknet/plugin-infra'

const useStyles = makeStyles()((theme) => ({
    content: {
        padding: theme.spacing(0),
        scrollbarWidth: 'none',
        '&::-webkit-scrollbar': {
            display: 'none',
        },
    },
}))

export interface SelectProviderDialogProps {}

export function SelectProviderDialog(props: SelectProviderDialogProps) {
    const { t } = useI18N()
    const { classes } = useStyles()

    //#region remote controlled dialog logic
    const { open, closeDialog } = useRemoteControlledDialog(WalletMessages.events.selectProviderDialogUpdated)
    //#endregion

    //#region native app
    useEffect(() => {
        if (!open) return
        if (hasNativeAPI) nativeAPI?.api.misc_openCreateWalletView()
    }, [open])
    //#endregion

    const pluginID = useValueRef(pluginIDSettings)
    // const pluginID = 'com.maskbook.solana'
    const networkID = useValueRef(networkIDSettings)
    const [undeterminedPluginID, setUndeterminedPluginID] = useState(pluginID)
    const [undeterminedNetworkID, setUndeterminedNetworkID] = useState(networkID)

    const undeterminedWeb3UI = useActivatedPluginWeb3UI(undeterminedPluginID)
    const undeterminedNetworkType = useNetworkType(undeterminedPluginID)
    const undeterminedNetwork = useRegisteredPluginNetwork(undeterminedPluginID, undeterminedNetworkType)

    const networks = useRegisteredNetworks()
    const providers = useRegisteredProviders()

    console.log({
        pluginID,
        networkID,
        undeterminedPluginID,
        undeterminedNetworkID,
        undeterminedNetwork,
        undeterminedNetworkType,
    })

    const { NetworkIconClickBait, ProviderIconClickBait } = undeterminedWeb3UI?.SelectProviderDialog ?? {}

    // not available for the native app
    if (hasNativeAPI) return null

    // if the dialog closes then start capturing the currently selected network
    if (!open)
        return (
            <PluginNetworkWatcher
                network={undeterminedNetwork}
                expectedPluginID={undeterminedPluginID}
                expectedNetworkID={undeterminedNetworkID}
            />
        )

    return (
        <InjectedDialog title={t('plugin_wallet_select_provider_dialog_title')} open={open} onClose={closeDialog}>
            <DialogContent className={classes.content}>
                <PluginProviderRender
                    networks={networks}
                    providers={providers}
                    undeterminedPluginID={undeterminedPluginID}
                    undeterminedNetworkID={undeterminedNetworkID}
                    setUndeterminedPluginID={setUndeterminedPluginID}
                    setUndeterminedNetworkID={setUndeterminedNetworkID}
                    NetworkIconClickBait={NetworkIconClickBait}
                    ProviderIconClickBait={ProviderIconClickBait}
                    onSubmit={closeDialog}
                />
            </DialogContent>
        </InjectedDialog>
    )
}
