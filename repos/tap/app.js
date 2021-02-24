import React, { useState, useEffect } from 'react'
import { theme } from 'SVTheme/tapIndex'
import { SafeAreaView, StatusBar } from 'react-native'
import { ReThemeProvider, getDefaultTheme } from '@keg-hub/re-theme'
import { Provider } from 'react-redux'
import { getStore } from 'SVStore'
import { initAppAction } from 'SVActions'
import { View, ModalManager } from 'SVComponents'
import { Router } from 'SVComponents/router'
import { checkCall, get } from '@keg-hub/jsutils'
import { ContainerRoutes } from 'SVNavigation/containerRoutes'
import { keg } from 'SVConfig'
import { getHistory } from 'SVNavigation'
import { isNative } from 'SVUtils/platform'
import { init } from 'SVActions'
import { WSService } from 'SVServices'
import { WebSocketProvider } from '@ltipton/sockr/build/client/esm'
import { socketConfig } from '../../configs/socket.config'

const checkAppInit = async setInit => {
  await init()
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
              <WebSocketProvider config={socketConfig} >
                <View style={activeTheme.app.main} >
                  <ContainerRoutes navigationConfigs={keg.routes}/>
                  <ModalManager />
                </View>
              </WebSocketProvider>
            </ReThemeProvider>
          </Provider>
        </SafeAreaView>
      </Router>
    </>
  )
}

export default App
