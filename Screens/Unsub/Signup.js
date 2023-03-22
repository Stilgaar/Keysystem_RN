// To use React \o/
import React from 'react';
// Regular React-Native components
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
// To use Forms easyly in RN 
import { Formik } from 'formik';
// To check the forms in Formik
import * as Yup from 'yup';
// Icons Lib
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// General Styles
import { blackA, generalStyles } from '../../Shared/css';
// Custom Button
import GradientButton from '../../Shared/Buttons/GradientButton';

import { KeyboardAvoidingView } from 'react-native';

// Regex for - email - password - nameS
import { emailRegex, passwordRegex, nameRegex } from '../../Shared/regex';

const SingUp = ({ navigation }) => {

    const [showPassword, setShowPassword] = React.useState(false);
    const [showVerifPassword, setShowVerifPassword] = React.useState(false);

    // Models of validations with YUP
    const validationSchema = Yup
        .object()
        .shape({
            firstname: Yup.string() // <== Type
                .matches(nameRegex, 'Names can only contain letters, spaces, apostrophes and hyphens') // <= Match Regex and error message
                .required('First name is required'), // Required if requierd
            lastname: Yup.string()
                .matches(nameRegex, 'Names can only contain letters, spaces, apostrophes and hyphens')
                .required('Last name is required'),
            email: Yup.string()
                .matches(emailRegex, 'Invalid email address')
                .required('Email is required'),
            password: Yup.string()
                .matches(passwordRegex, 'Password must contain at least 8 characters, including 1 letter, 1 number, and 1 special character')
                .required('Password is required'),
            verifyPassword: Yup.string()
                .oneOf([Yup.ref('password'), null], 'Passwords do not match')
                .required('Confirm password is required'),
        });

    return (
        <>
            <Formik
                initialValues={{
                    firstname: '',
                    lastname: '',
                    email: '',
                    password: '',
                    verifyPassword: '',
                }}
                validationSchema={validationSchema}
                onSubmit={(values, { setSubmitting }) => {
                    // submit the form
                    setSubmitting(false);
                }}
            >

                {/* Functions and values decomposed from de Formik package */}
                {({ values, handleChange, handleBlur, handleSubmit, errors, isSubmitting, setFieldValue, }) => (

                    <KeyboardAvoidingView
                        behavior={Platform.OS === "ios" ? "padding" : "height"}
                        style={[generalStyles.container, { justifyContent: 'center' }]}>

                        <View style={[generalStyles.whiteContainer, generalStyles.center, generalStyles.globalShadow]}>

                            <View>
                                <TextInput
                                    style={generalStyles.inputs}
                                    onChangeText={handleChange('firstname')}
                                    onBlur={handleBlur('firstname')}
                                    value={values.firstname}
                                    placeholder="Prénom"
                                />

                            </View>
                            {errors.firstname && <Text style={generalStyles.error}>{errors.firstname}</Text>}

                            <View>
                                <TextInput
                                    style={generalStyles.inputs}
                                    onChangeText={handleChange('lastname')}
                                    onBlur={handleBlur('lastname')}
                                    value={values.lastname}
                                    placeholder="Nom de famille"
                                />
                            </View>
                            {errors.lastname && <Text style={generalStyles.error}>{errors.lastname}</Text>}



                            <View>
                                <TextInput
                                    style={generalStyles.inputs}
                                    onChangeText={handleChange('email')}
                                    onBlur={handleBlur('email')}
                                    value={values.email}
                                    placeholder="Entrez votre email"
                                />
                            </View>

                            {errors.email && <Text style={generalStyles.error}>{errors.email}</Text>}

                            <View>

                                <View style={generalStyles.fdr}>

                                    <View>
                                        <TextInput
                                            style={generalStyles.inputs}
                                            onChangeText={handleChange('password')}
                                            onBlur={handleBlur('password')}
                                            value={values.password}
                                            placeholder="Choisissez un mot de passe"
                                            secureTextEntry={!showPassword}
                                        />
                                    </View>

                                    <TouchableOpacity onPress={() => setShowPassword(c => !c)}>
                                        <View>
                                            <MaterialIcons
                                                style={generalStyles.iconEye}
                                                name={showPassword ? 'visibility' : 'visibility-off'}
                                                size={24}
                                                color="#000" />
                                        </View>
                                    </TouchableOpacity>

                                </View>
                            </View>
                            {errors.password && <Text style={generalStyles.error}>{errors.password}</Text>}

                            <View>

                                <View style={generalStyles.fdr}>

                                    <TextInput
                                        style={generalStyles.inputs}
                                        onChangeText={handleChange('verifyPassword')}
                                        onBlur={handleBlur('verifyPassword')}
                                        value={values.verifyPassword}
                                        placeholder="Verification mot de passe"
                                        secureTextEntry={!showVerifPassword}
                                        onPress={() => setFieldValue('verifyPassword', values.verifyPassword, true)}
                                    />

                                    <TouchableOpacity onPress={() => setShowVerifPassword(c => !c)}>
                                        <View>
                                            <MaterialIcons
                                                style={generalStyles.iconEye}
                                                name={showVerifPassword ? 'visibility' : 'visibility-off'}
                                                size={24}
                                                color="#000" />
                                        </View>
                                    </TouchableOpacity>

                                </View>
                            </View>

                            {errors.verifyPassword && <Text style={generalStyles.error}>{errors.verifyPassword}</Text>}

                            <View style={{ marginTop: 30 }}>
                                <GradientButton text="Commencer !"
                                    handlePress={handleSubmit}
                                    disabled={isSubmitting} />
                            </View>

                            <TouchableOpacity onPress={() => navigation.navigate('Login')}>

                                <Text style={{ marginTop: 20 }}>Déjà un compte ? </Text>

                            </TouchableOpacity>
                        </View>
                    </KeyboardAvoidingView>

                )}

            </Formik>

        </>
    );
};

export default SingUp;