// react native stuff
import React from 'react';
import { KeyboardAvoidingView, TouchableOpacity, View } from 'react-native';
import { Input } from 'react-native-elements';

import { API_URL } from "@env"

// Work together (forms in native made easy)
import * as Yup from 'yup';
import { Formik } from 'formik';

// global button
import GradientButton from '../../Shared/Buttons/GradientButton';
// Icons Lib
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

// Regex
import { emailRegex } from '../../Shared/regex';
import { generalStyles } from '../../Shared/css';

// Global functions
import useGlobalContext from "../../Hooks/useGlobalContext"
import { loginDispatch } from '../../Reducer/GlobalReducer/globalDispatch';

// Kaas methods - conti -
import { KaaS } from '../../ContinentalUtilities/KaasMethods';
// import fakePerson from "../../JSON/FAKEPERSON.json"

const Login = () => {

  const [showPassword, setShowPassword] = React.useState(false);
  const [errorLog, setErrorLog] = React.useState("")

  const validationSchema = Yup.object().shape({
    userEmail: Yup
      .string()
      .matches(emailRegex, 'Invalid email address')
      .required('Email is required'),
    userPassword: Yup
      .string()
      .required('Password is required'),
  });

  const { userDispatch } = useGlobalContext()

  return (
    <>

      <Formik
        initialValues={{ userEmail: 'paul.auchon@oreiller.com', userPassword: 'password' }}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          // TODO: Mettre toute cette logique dans des services adequate
          try {
            const responseLogin = await fetch(`${API_URL}/api/Authentication/login/mobile`, {
              method: 'POST',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                userEmail: values.userEmail,
                userPassword: values.userPassword,
              }),
            });

            console.log("RESPONSE LOGIN", responseLogin)

            if (responseLogin.ok) {

              // CONNECTION OK
              const responseUserData = await responseLogin.json()

              // Check if session if opened
              let isSessionOpened = await KaaS.isSessionOpen()

              // If Session Opened
              if (isSessionOpened) {
                // Check retrieve last enabled device if exist
                const fetchUserDeviceEnabled =
                  await fetch(`${API_URL}/api/UserDevice/${responseUserData.userGuid}/last_enabled`)
                    .catch((error) => setErrorLog(error.errorMessage));

                if (fetchUserDeviceEnabled.ok) {

                  const responseUserDevice = await fetchUserDeviceEnabled.json()
                  const userDeviceSessionResponseToken = responseUserDevice.sessionReponseToken
                  // If exist => Login
                  if (userDeviceSessionResponseToken != null || userDeviceSessionResponseToken != '') {
                    // Login
                    responseUserData.userClientDeviceGuid = responseUserDevice.continentalUserDeviceGuid
                    userDispatch(loginDispatch(responseUserData))
                  }

                  // If not Close Session, Recreate Device and open session
                  else {

                    await KaaS.closeSession()
                    // Create new device (DUPLICATE WITH GENERATE DEVICE IF SESSION NOT OPENED)
                    // GENERATE SessionRequestToken via SDK
                    let requestToken = await KaaS.createSessionRequestToken();

                    if (requestToken) {

                      //Then CREATE DEVICE via API
                      const responseCreateClientDevice = await fetch(`${API_URL}/api/UserDevice`, {
                        method: 'POST',
                        headers: {
                          Accept: 'application/json',
                          'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                          userGuid: responseUserData.userGuid,
                          fkUserName: `${responseUserData.firstName} ${responseUserData.lastName}`,
                          sessionRequestToken: requestToken,
                          enabled: true,
                          label: `${responseUserData.firstName} ${responseUserData.lastName} Device`,
                          pushProviderId: ''
                        }),
                      })
                        .catch((error) => setErrorLog(error.errorMessage));

                      // Create Device OK
                      if (responseCreateClientDevice.ok) {

                        const responseUserDevice = await responseCreateClientDevice.json()
                        const sessionReponseToken = responseUserDevice.sessionReponseToken
                        // Open session with the SessionReponseToken
                        await KaaS.openSession(sessionReponseToken)

                        // Verify Session has opened corectly
                        isSessionOpened = await KaaS.isSessionOpen()
                        if (isSessionOpened) {

                          // Login
                          responseUserData.userClientDeviceGuid = responseUserDevice.continentalUserDeviceGuid
                          userDispatch(loginDispatch(responseUserData))
                        } else {
                          throw new Error('Error while opening the session');
                        }
                      }
                    }
                  }
                }
              }
              // If session not opened Create device
              else {
                // GENERATE SessionRequestToken via SDK
                let requestToken = await KaaS.createSessionRequestToken();

                if (requestToken) {

                  //Then CREATE DEVICE via API
                  const responseCreateClientDevice = await fetch(`${API_URL}/api/UserDevice`, {
                    method: 'POST',
                    headers: {
                      Accept: 'application/json',
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                      userGuid: responseUserData.userGuid,
                      userName: `${responseUserData.userFirstName} ${responseUserData.userLastName}`,
                      sessionRequestToken: requestToken,
                      enabled: true,
                      label: `${responseUserData.userFirstName} ${responseUserData.userLastName} Device`,
                      pushProviderId: ''
                    }),
                  })
                    .catch((error) => {
                      console.error("ERROR LOGGIN responseCreateClientDevice", error.errorMessage)
                      setErrorLog(error.errorMessage)
                    });

                  // Create Device OK
                  if (responseCreateClientDevice.ok) {

                    const responseUserDevice = await responseCreateClientDevice.json()
                    const SessionReponseToken = responseUserDevice.sessionReponseToken

                    // Open session with the SessionReponseToken
                    //enlist-desacitvate-notifications
                    let openSession = await KaaS.openSession(SessionReponseToken)

                    // Verify Session has opened corectly
                    isSessionOpened = await KaaS.isSessionOpen()

                    if (isSessionOpened) {
                      // Login
                      responseUserData.userClientDeviceGuid = responseUserDevice.continentalUserDeviceGuid
                      userDispatch(loginDispatch(responseUserData))
                    } else {
                      throw new Error('Error while opening the session');
                    }
                  }
                }
              }
            }

          } catch (error) {
            console.error("ERROR LOGGIN LAST ONE", error.message, error)
            setErrorLog('Erreur de mot de passe ou email + ', error.errorMessage)
          }
          setSubmitting(false)
        }}>
        {({ values, handleChange, handleBlur, handleSubmit, errors, isSubmitting }) => (

          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={[generalStyles.container, { justifyContent: 'center' }]}>

            <View style={[generalStyles.colorContainer, generalStyles.globalShadow]}>

              <View>

                <Input
                  onChangeText={handleChange('userEmail')}
                  onBlur={() => {
                    handleBlur('userEmail');
                    setErrorLog("")
                  }}
                  value={values.userEmail}
                  placeholder="Votre Email"
                  errorMessage={errors.userEmail} />
              </View>

              <Input
                onChangeText={handleChange('userPassword')}
                onBlur={() => {
                  handleBlur('userPassword');
                  setErrorLog("")
                }}
                value={values.userPassword}
                placeholder="Mot de Passe"
                secureTextEntry={!showPassword}
                errorMessage={errors.userPassword}
                rightIcon={
                  <TouchableOpacity onPress={() => setShowPassword(c => !c)}>
                    <MaterialIcons
                      name={showPassword ? 'visibility' : 'visibility-off'}
                      size={24}
                      color="#000" />
                  </TouchableOpacity>}
              />

              <View style={{ marginTop: 30 }}>
                <GradientButton text="Connexion"
                  handlePress={handleSubmit}
                  disabled={isSubmitting} />
              </View>

            </View>
          </KeyboardAvoidingView>
        )
        }
      </Formik >
    </>
  )
}

export default Login;
