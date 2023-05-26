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

// Icons Lib













const Login = ({ navigation }) => {

    const [showPassword, setShowPassword] = React.useState(false);
    const [errorLog, setErrorLog] = React.useState("")

    const validationSchema = Yup.object().shape({
        email: Yup
            .string()
            .matches(emailRegex, 'Invalid email address')
            .required('Email is required'),
        password: Yup
            .string()
            .required('Password is required'),
    });

    const { userDispatch } = useGlobalContext()

    return (
        <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting }) => {

                if (values.password === "0000" && values.email.toLowerCase() === "stil@stil.ar") {
                    userDispatch(loginDispatch(fakePerson))
                }
                else {
                    setErrorLog("Erreur de mot de passe ou email")
                }

                setSubmitting(false);

            }}>

            {({ values, handleChange, handleBlur, handleSubmit, errors, isSubmitting }) => (

                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    style={[generalStyles.container, { justifyContent: 'center' }]}>

                    <View style={[generalStyles.colorContainer, generalStyles.globalShadow]}>

                        <View>

                            <Input
                                onChangeText={handleChange('email')}
                                onBlur={() => {
                                    handleBlur('email');
                                    setErrorLog("")
                                }}
                                value={values.email}
                                placeholder="Votre Email"
                                errorMessage={errors.email} />
                        </View>

                        <Input
                            onChangeText={handleChange('password')}
                            onBlur={() => {
                                handleBlur('password');
                                setErrorLog("")
                            }}
                            value={values.password}
                            placeholder="Mot de Passe"
                            secureTextEntry={!showPassword}
                            errorMessage={errors.password}
                            rightIcon={
                                <TouchableOpacity onPress={() => setShowPassword(c => !c)}>
                                    <MaterialIcons
                                        name={showPassword ? 'visibility' : 'visibility-off'}
                                        size={24}
                                        color="#000" />
                                </TouchableOpacity>}
                        />

                        <View style={{ marginTop: 30 }}>
                            <GradientButton text="Entrez"
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
