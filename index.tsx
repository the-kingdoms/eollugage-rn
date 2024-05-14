import { AppRegistry } from 'react-native'
import App from './App'
import { messageModule } from '@utils/_const'
messageModule.setBackgroundMessageHandler(async (remoteMessage) => {
  console.log('[Background/Quit]', remoteMessage)
})
AppRegistry.registerComponent('app', () => App)
