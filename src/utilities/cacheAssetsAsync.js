import {Image} from 'react-native'
import {Asset, Font} from 'expo'

export const cacheImages = async images =>
  images.map(image => {
    if (typeof image === 'string') {
      return Image.prefetch(image)
    } else {
      return Asset.fromModule(image).downloadAsync()
    }
  })

export const cacheFonts = async fontObj =>
  Object.entries(fontObj).map(font =>
    Font.loadAsync({[font[0]]: font[1]})
  )
