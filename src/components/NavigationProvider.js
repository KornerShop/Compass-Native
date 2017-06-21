import React from 'react'
import {
  NavigationProvider,
  TabNavigation,
  StackNavigation,
} from '@expo/ex-navigation'
import Router from '../navigation/Router'

export default () =>
  <NavigationProvider router={Router}>
    <StackNavigation initialRoute={Router.getRoute('rootNavigation')} />
  </NavigationProvider>
