import React from 'react'
import RootNavigation from './RootNavigation'
import {createRouter} from '@expo/ex-navigation'
import {FontAwesome} from '@expo/vector-icons'

import Welcome from '../screens/Welcome'
import Resources from '../screens/Resources'
import Snap from '../screens/Snap'
import Wic from '../screens/Wic'

export default createRouter(() => ({
	resources: () => Resources,
	snap: () => Snap,
	wic: () => Wic,
	rootNavigation: () => RootNavigation,
}))
