import React, { useState, useEffect } from 'react'
import { theme } from 'SVTheme/tapIndex'
import { SafeAreaView, StatusBar } from 'react-native'
import { ReThemeProvider, getDefaultTheme } from '@keg-hub/re-theme'
import { Provider } from 'react-redux'
import { getStore } from 'SVStore'
import { initAppAction, init } from 'SVActions'
import { View, ModalManager, DomStyles, Toast } from 'SVComponents'
import { Router } from 'SVComponents/router'
import { checkCall, get } from '@keg-hub/jsutils'
import { ContainerRoutes } from 'SVNavigation/containerRoutes'
import { keg } from 'SVConfig'
import { getHistory } from 'SVNavigation'
import { isNative } from 'SVUtils/platform'
import { WSService } from 'SVServices'
import { SockrProvider } from 'SVUtils/sockr'
import { sockrReducer } from './reducers/sockrReducer'

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
              <DomStyles />
              <SockrProvider
                debug={true}
                config={WSService}
                reducer={sockrReducer}
              >
                <View style={activeTheme.app.main} >
                  <ContainerRoutes navigationConfigs={keg.routes}/>
                  <ModalManager />
                  <Toast />
                </View>
              </SockrProvider>
            </ReThemeProvider>
          </Provider>
        </SafeAreaView>
      </Router>
    </>
  )
}

export default App
