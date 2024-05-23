import { AppRegistry } from 'react-native'
import App from './App'
import { messageModule } from '@utils/_const'
import PushNotification, { Importance } from 'react-native-push-notification'

messageModule.setBackgroundMessageHandler(async (remoteMessage) => {
  console.log('[Background/Quit]', remoteMessage)
})

PushNotification.createChannel(
  {
    channelId: 'channel-id',
    channelName: 'My channel',
    importance: Importance.HIGH,
  },
  (created) => console.log(`createChannel returned '${created}'`)
)

AppRegistry.registerComponent('app', () => App)
