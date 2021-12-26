// @ts-check
import React from 'react'
import { ThemeProvider, StyledEngineProvider } from '@mui/material'
import { MaskLightTheme, applyMaskColorVars, CustomSnackbarProvider, MaskDarkTheme } from '@masknet/theme'
import { addSharedI18N, I18NextProviderHMR } from '@masknet/shared'
import { fallbackLng } from '../../shared-base/src/i18n/fallbackRule'
// import { withMatrix } from 'storybook-addon-matrix'
import { addDashboardI18N } from '../src/locales/languages'
import { initReactI18next } from 'react-i18next'
import i18n from 'i18next'
i18n.init({
    keySeparator: false,
    interpolation: { escapeValue: false },
    fallbackLng,
    nonExplicitSupportedLngs: true,
})
i18n.use(initReactI18next)
addDashboardI18N(i18n)
addSharedI18N(i18n)
export const parameters = {
    actions: { argTypesRegex: '^on[A-Z].*' },
}
export const decorators = [
    // withMatrix,
    (Story) => (
        <React.Suspense fallback="">
            <StyledEngineProvider injectFirst>
                <ThemeProvider theme={MaskDarkTheme}>
                    <I18NextProviderHMR i18n={i18n}>
                        <CustomSnackbarProvider>
                            <Story />
                        </CustomSnackbarProvider>
                    </I18NextProviderHMR>
                </ThemeProvider>
            </StyledEngineProvider>
        </React.Suspense>
    ),
]
applyMaskColorVars(document.body, 'light')
