import * as Yup from 'yup';

import { KeyboardAvoidingView, TouchableOpacity, View } from 'react-native';

import { Formik } from 'formik';
import GradientButton from '../../Shared/Buttons/GradientButton';
import { Input } from 'react-native-elements';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import React from 'react';
import { emailRegex } from '../../Shared/regex';
import fakePerson from "../../JSON/FAKEPERSON.json"
import { generalStyles } from '../../Shared/css';
import { loginDispatch } from '../../Reducer/GlobalReducer/globalDispatch';
import useGlobalContext from "../../Hooks/useGlobalContext"
import { KaaS } from '../../ContinentalUtilities/KaasMethods';
// Icons Lib

const Login = ({ navigation }) => {

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
        <Formik
            initialValues={{ userEmail: 'paul.auchon@oreiller.com', userPassword: 'password' }}
            validationSchema={validationSchema}
            // onSubmit={(values, { setSubmitting }) => {

            //     if (values.userPassword === "0000" && values.userEmail.toLowerCase() === "stil@stil.ar") {
            //         userDispatch(loginDispatch(fakePerson))
            //     }
            //     else {
            //         setErrorLog("Erreur de mot de passe ou email")
            //     }

            //     setSubmitting(false);
             onSubmit={async (values, { setSubmitting }) => {
              // TODO: Mettre toute cette logique dans des services adequate
                try {
                  console.log("VALUES", values)
                  let responseLogin = await fetch(`${process.env.API_URL}/api/Authentication/login/mobile`, {
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

                       // Check if session if opened
                       let isSessionOpened = await KaaS.isSessionOpen()
   
                       // If Session Opened
                       if(isSessionOpened) {
                         // Chekc retrieve last enabled device if exist
                         let fetchUserDeviceEnabled = await fetch(`${process.env.API_URL}/api/UserDevice/${responseUserData.userGuid}/last_enabled`,{
                           method: 'GET',
                           headers: {
                             Accept: 'application/json',
                             'Content-Type': 'application/json',
                           },
                         }).catch((error) => setErrorLog(error.errorMessage));
   
                         if (fetchUserDeviceEnabled.ok) {
                           const responseUserDevice = await fetchUserDeviceEnabled.json()
                           const userDeviceSessionResponseToken = responseUserDevice.sessionReponseToken
                           // If exist => Login
                           if(userDeviceSessionResponseToken != null || userDeviceSessionResponseToken != '') {
                               // Login
                               responseUserData.userClientDeviceGuid = responseUserDevice.continentalUserDeviceGuid
                               userDispatch(loginDispatch([responseUserData]))
                           } 
                           // If not Close Session, Recreate Device and open session
                           else {
                             await KaaS.closeSession()
                             // Create new device (DUPLICATE WITH GENERATE DEVICE IF SESSION NOT OPENED)
                             // GENERATE SessionRequestToken via SDK
                             let requestToken = await KaaS.createSessionRequestToken();
   
                             if(requestToken != '') {
                               //Then CREATE DEVICE via API
                               let responseCreateClientDevice = await fetch(`${process.env.API_URL}/api/UserDevice`, {
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
                                 const responseUserDevice = await responseCreateClientDevice.json()
                                 const sessionReponseToken = responseUserDevice.sessionReponseToken
                                 // Open session with the SessionReponseToken
                                 await  KaaS.openSession(sessionReponseToken)
   
                                 // Verify Session has opened corectly
                                 isSessionOpened = await KaaS.isSessionOpen()
                                 if(isSessionOpened) {
                                   // Login
                                   responseUserData.userClientDeviceGuid = responseUserDevice.continentalUserDeviceGuid
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
   
                         if(requestToken != '') {
                           //Then CREATE DEVICE via API
                           let responseCreateClientDevice = await fetch(`${process.env.API_URL}/api/UserDevice`, {
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
                             const responseUserDevice = await responseCreateClientDevice.json()
                             const SessionReponseToken = responseUserDevice.sessionReponseToken
   
                             // Open session with the SessionReponseToken
                             let openSession = await  KaaS.openSession(SessionReponseToken)
   
                             // Verify Session has opened corectly
                             isSessionOpened = await KaaS.isSessionOpen()
                             if(isSessionOpened) {
                               // Login
                               responseUserData.userClientDeviceGuid = responseUserDevice.continentalUserDeviceGuid
                               userDispatch(loginDispatch([responseUserData]))
                             } else {
                                 throw new Error('Error while opening the session');
                             }
                           }
                         }
                       }
                     }
                   } catch (error) {
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

    )
}

export default Login;
