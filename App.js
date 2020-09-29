import React, { useState, useEffect } from 'react'
import { theme } from 'SVTheme'
import { SafeAreaView, StatusBar } from 'react-native'
import { ReThemeProvider, getDefaultTheme, setDefaultTheme } from '@keg-hub/re-theme'
import { Provider } from 'react-redux'
import { getStore } from 'SVStore'
import { initAppAction } from 'SVActions'
import { View } from 'SVComponents'
import { Router } from 'SVComponents/router'
import { checkCall, get } from '@keg-hub/jsutils'
import { ContainerRoutes } from 'SVNavigation/containerRoutes'
import { keg } from 'SVConfig'
import { getHistory } from 'SVNavigation'
import { isNative } from 'SVUtils/platform'
import { Provider as PaperProvider, DefaultTheme } from 'react-native-paper';

const paperTheme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#3498db',
    accent: '#f1c40f',
  },
};

setDefaultTheme(theme)

const checkAppInit = setInit => {
  setInit(true)
  checkCall(initAppAction)
}

const App = props => {
  const [ activeTheme, switchTheme ] = useState(getDefaultTheme())
  const [ init, setInit ] = useState(false)

  useEffect(() => {
    !init && checkAppInit(setInit)
  })

  return init && (
    <>
      { isNative() && (
        <SafeAreaView
          style={{
            backgroundColor: get(activeTheme, 'colors.surface.primary.colors.dark')
          }}
        />
      )}
      <StatusBar barStyle={'default'} />
      <Router history={getHistory()}>
        <SafeAreaView>
          <Provider store={getStore()}>
            <ReThemeProvider theme={ activeTheme } >
              <PaperProvider theme={paperTheme} >
                <View style={activeTheme.app.main} >
                  <ContainerRoutes navigationConfigs={keg.routes}/>
                </View>
              </PaperProvider>
            </ReThemeProvider>
          </Provider>
        </SafeAreaView>
      </Router>
    </>
  )
}

export default App
