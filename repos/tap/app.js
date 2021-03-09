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
import { SockrProvider } from '@ltipton/sockr'

// TODO: remove this once sockr is updated
// Currently is requires a reducer function be passed in, but it should not
const reducerNoOp = state => state

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
                debug={false}
                config={WSService}
                reducer={reducerNoOp}
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
