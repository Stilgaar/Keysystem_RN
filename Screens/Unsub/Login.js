import React from 'react';
import { View, TouchableOpacity, KeyboardAvoidingView } from 'react-native';

import { Input } from 'react-native-elements';
import { Formik } from 'formik';
import * as Yup from 'yup';
// Icons Lib
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { generalStyles } from '../../Shared/css';
import GradientButton from '../../Shared/Buttons/GradientButton';

import { emailRegex } from '../../Shared/regex';

import { loginDispatch } from '../../Reducer/GlobalReducer/globalDispatch';

import useGlobalContext from '../../Hooks/useGlobalContext'

import fakePerson from '../../JSON/FAKEPERSON.json'

import { KaaS } from '../../ContinentalUtilities/KaasMethods';

const Login = ({ navigation }) => {

    const [showPassword, setShowPassword] = React.useState(false);
    const [errorLog, setErrorLog] = React.useState('')

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
        <Formik
            initialValues={{ userEmail: 'admin@keysystem.fr', userPassword: 'i.coBU@Dw#[G' }}
            validationSchema={validationSchema}
            onSubmit={async (values, { setSubmitting }) => {
              // TODO: Mettre toute cette logique dans des services adequate
                try {
                    console.log('LOGIN VALUES', values)
                  let responseLogin = await fetch('http://192.168.1.24:5292/api/Authentication/login', {
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

                  if (responseLogin.ok) {
                    // CONNECTION OK
                    const responseUserData = await responseLogin.json()
                    /* User Result : 
                      {"email": "admin@keysystem.fr", 
                       "firstName": "Admin",
                       "lastName": "KeySystem", 
                       "token": "azdazdaz", 
                       "userGuid": "3b347bcc-6396-48a9-b5d1-b99ea1cbd1c6"} */
                    console.log('Response User: ', responseUserData)

                    // Check if session if opened
                    let isSessionOpened = await KaaS.isSessionOpen()
                    console.log('IsSessionOpen : ', isSessionOpened)

                    // If Session Opened
                    if(isSessionOpened) {
                      // Chekc retrieve last enabled device if exist
                      let fetchUserDeviceEnabled = await fetch(`http://192.168.1.24:5292/api/UserDevice/${responseUserData.userGuid}/last_enabled`,{
                        method: 'GET',
                        headers: {
                          Accept: 'application/json',
                          'Content-Type': 'application/json',
                        },
                      }).catch((error) => setErrorLog(error.errorMessage));

                      if (fetchUserDeviceEnabled.ok) {
                        const userDeviceSessionResponseToken = await fetchUserDeviceEnabled.json()
                        console.log('AlreadyExisting Token Response: ', userDeviceSessionResponseToken)
                        // If exist => Login
                        if(userDeviceSessionResponseToken != null || userDeviceSessionResponseToken != '') {
                            // Login
                            userDispatch(loginDispatch([responseUserData]))
                        } 
                        // If not Close Session, Recreate Device and open session
                        else {
                          await KaaS.closeSession()
                          // Create new device (DUPLICATE WITH GENERATE DEVICE IF SESSION NOT OPENED)
                          // GENERATE SessionRequestToken via SDK
                          let requestToken = await KaaS.createSessionRequestToken();
                          console.log('REQUEST TOKEN:',requestToken);

                          if(requestToken != '') {
                            //Then CREATE DEVICE via API
                            let responseCreateClientDevice = await fetch('http://192.168.1.24:5292/api/UserDevice', {
                              method: 'POST',
                              headers: {
                                Accept: 'application/json',
                                'Content-Type': 'application/json',
                              },
                              body: JSON.stringify({
                                fkUserGuid: responseUserData.userGuid,
                                fkUserName: `${responseUserData.firstName} ${responseUserData.lastName}`,
                                sessionRequestToken: requestToken,
                                enabled: true,
                                label: `${responseUserData.firstName} ${responseUserData.lastName} Device`,
                                pushProviderId: ''
                              }),
                            })
                            .catch((error) => setErrorLog(error.errorMessage));

                            // Create Device OK
                            if(responseCreateClientDevice.ok)
                            {
                              const SessionReponseToken = await responseCreateClientDevice.json()
                              console.log('Response SessionReponseToken: ', SessionReponseToken)

                              // Open session with the SessionReponseToken
                              let openSession = await  KaaS.openSession(SessionReponseToken)
                              console.log('Reponse open session after creating device', openSession)

                              // Verify Session has opened corectly
                              isSessionOpened = await KaaS.isSessionOpen()
                              console.log('IsSessionOpen 2: ', isSessionOpened)
                              if(isSessionOpened) {
                                // Login
                                userDispatch(loginDispatch([responseUserData]))
                              } else {
                                  throw new Error('Error while opening the session');
                              }
                            }
                          }     
                        }
                      }
                    }
                    // If session not opened Create device
                    else 
                    {
                      // GENERATE SessionRequestToken via SDK
                      let requestToken = await KaaS.createSessionRequestToken();
                      console.log('REQUEST TOKEN:',requestToken);

                      if(requestToken != '') {
                        //Then CREATE DEVICE via API
                        let responseCreateClientDevice = await fetch('http://192.168.1.24:5292/api/UserDevice', {
                          method: 'POST',
                          headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json',
                          },
                          body: JSON.stringify({
                            fkUserGuid: responseUserData.userGuid,
                            fkUserName: `${responseUserData.firstName} ${responseUserData.lastName}`,
                            sessionRequestToken: requestToken,
                            enabled: true,
                            label: `${responseUserData.firstName} ${responseUserData.lastName} Device`,
                            pushProviderId: ''
                          }),
                        })
                        .catch((error) => setErrorLog(error.errorMessage));

                        // Create Device OK
                        if(responseCreateClientDevice.ok)
                        {
                          const SessionReponseToken = await responseCreateClientDevice.json()
                          console.log('Response SessionReponseToken: ', SessionReponseToken)

                          // Open session with the SessionReponseToken
                          let openSession = await  KaaS.openSession(SessionReponseToken)
                          console.log('Reponse open session after creating device', openSession)

                          // Verify Session has opened corectly
                          isSessionOpened = await KaaS.isSessionOpen()
                          console.log('IsSessionOpen 2: ', isSessionOpened)
                          if(isSessionOpened) {
                            // Login
                            userDispatch(loginDispatch([responseUserData]))
                          } else {
                              throw new Error('Error while opening the session');
                          }
                        }
                      }
                    }
                  }
                } catch (error) {
                    console.log(error)
                  setErrorLog('Erreur de mot de passe ou email + ', error.errorMessage)
                }
                setSubmitting(false)
              }}>

            {({ values, handleChange, handleBlur, handleSubmit, errors, isSubmitting }) => (

                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    style={[generalStyles.container, { justifyContent: 'center' }]}>

                    <View style={[generalStyles.colorContainer, generalStyles.globalShadow]}>

                        <View>

                            <Input
                                onChangeText={handleChange('userEmail')}
                                onBlur={() => {
                                    handleBlur('userEmail');
                                    setErrorLog('')
                                }}
                                value={values.userEmail}
                                placeholder='Votre Email'
                                errorMessage={errors.userEmail} />
                        </View>

                        <Input
                            onChangeText={handleChange('userPassword')}
                            onBlur={() => {
                                handleBlur('userPassword');
                                setErrorLog('')
                            }}
                            value={values.userPassword}
                            placeholder='Mot de Passe'
                            secureTextEntry={!showPassword}
                            errorMessage={errors.userPassword}
                            rightIcon={
                                <TouchableOpacity onPress={() => setShowPassword(c => !c)}>
                                    <MaterialIcons
                                        name={showPassword ? 'visibility' : 'visibility-off'}
                                        size={24}
                                        color='#000' />
                                </TouchableOpacity>}
                        />

                        <View style={{ marginTop: 30 }}>
                            <GradientButton text='Entrez'
                                handlePress={handleSubmit}
                                disabled={isSubmitting} />
                        </View>

                    </View>
                </KeyboardAvoidingView>
            )
            }
        </Formik >

    )
}

export default Login;
