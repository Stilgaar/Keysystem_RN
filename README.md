## WELCOME TO KEY SYSTEM STUFF

Alright.

You know the jazz : 
First clone it.
Go in the folder cd whatheverfolderyouused
Then make a beautiful npm i in this folder
Then go for a cd android
Go a beautiful "./gradlew clean" (beacause, reasons and)
Then cd ..
Finaly try to launch the app, 'npm run android' (and pray ?)

- Sometimes check if your device is there

The App is sometimes crashing, well not really crashing, it just turns out. I don't know why (yet) Maybe its the SDK continenal part ? IDK. Didnt had the time to check it out.

Some easy rules: 
- for the hooks i use React.useState or React.useAnyHook. (thats juste a mnemotechnique way to know when im on a web app or native app)
- same goes for functions i export default them at first lines and thats pretty it

// General stuff 
- general css is in /Shared/css.js
- Screens are in /Screens, obviously. Separated between subbed ones and unsubbed ones.
- Data from a userReducer pass trought a useGlobalState with context (mostly information about users and stuff)
- Otherwise i have a state and a dispatch context trought a stateContext.

For the login it's simple email : "stil@stil.ar", password : 0000 (its hardcoded)

Google Maps API : AIzaSyDrCiuEdo1QVqLEthD1oLDlGJy4vD8LIcQ (its jeff's at the moment, dont screw over !) (pliz ?)

If you need to add a font, put it in the assets/Font folder and run a npx react-native-asset