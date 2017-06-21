import React from 'react';
import Maps from '../screens/Map';
import Snap from '../screens/Snap';
import Wic from '../screens/Wic';
import RootNavigation from './RootNavigation';

import {
  createRouter,
} from '@expo/ex-navigation';

import { FontAwesome } from '@expo/vector-icons';

export default createRouter(() => ({
  maps: () => Maps,
  snap: () => Snap,
  wic: () => Wic,
  rootNavigation: () => RootNavigation
}));