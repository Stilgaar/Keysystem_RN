
import React, { useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, StyleSheet, ScrollView } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
// Icons Lib

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { userEmailAddressRegex, passwordRegex, nameRegex } from '../../../Shared/regex';
import { generalStyles } from '../../../Shared/css';

import { GradientButton } from "../../../comps";

import useGlobalContext from '../../../Hooks/useGlobalContext';

import useSubmit from '../../../Hooks/useSubmit';

function ModifyAccount() {

    const [showPassword, setShowPassword] = React.useState(false);
    const [showVerifPassword, setShowVerifPassword] = React.useState(false);

    const { userState } = useGlobalContext()

    const { handleSubmit: handleSubmitUserInfo, error, resMsg } = useSubmit()

    const handleSubmit = (values) => {

        handleSubmitUserInfo({
            url: `${process.env.API_URL}/api/User`,
            method: "PUT",
            body: ({
                userGuid: userState.user.userGuid,
                userLastName: values.userLastName,
                userFirstName: values.userFirstName,
                userEmailAddress: values.userEmailAddress
            })
        })
    }

    const user = userState.user

    const validationSchema = Yup
        .object()
        .shape({
            userLastName: Yup.string()
                .matches(nameRegex, 'Names can only contain letters, spaces, apostrophes and hyphens') // <= Match Regex and error message
                .nullable(),
            userFirstName: Yup.string()
                .matches(nameRegex, 'Names can only contain letters, spaces, apostrophes and hyphens') // <= Match Regex and error message
                .nullable(),
            userEmailAddress: Yup.string()
                .matches(userEmailAddressRegex, 'Invalid userEmailAddress address')
                .nullable(),
            password: Yup.string()
                .matches(passwordRegex, 'Password must contain at least 8 characters, including 1 letter, 1 number, and 1 special character')
                .nullable(),
            verifyPassword: Yup.string()
                .when('password', {
                    is: password => password,
                    then: Yup.string()
                        .oneOf([Yup.ref('password'), null], 'Passwords do not match')
                        .required('Confirm password is required')

                })
        });

    return (

        <View style={[generalStyles.container]}>

            <ScrollView contentContainerStyle={generalStyles.scrollViewStyle}>

                <Formik
                    initialValues={{
                        userLastName: user?.userLastName,
                        userFirstName: user?.userFirstName,
                        userEmailAddress: user?.userEmailAddress,
                        password: '',
                        verifyPassword: '',
                    }}
                    validationSchema={validationSchema}
                    onSubmit={(values, { setSubmitting }) => {
                        handleSubmit(values);
                        setSubmitting(false);
                    }}
                >
                    {({ values, handleChange, handleBlur, handleSubmit, errors, isSubmitting, setFieldValue }) => (
                        <>
                            <Text style={[generalStyles.title]}>Modifier informations</Text>

                            <KeyboardAvoidingView
                                behavior={Platform.OS === "ios" ? "padding" : "height"}
                                style={[generalStyles.container]}>

                                <View style={
                                    [generalStyles.colorContainer,
                                    generalStyles.center,
                                    generalStyles.globalShadow,
                                    { backgroundColor: 'white' }]}>

                                    <View style={[styles.form]}>

                                        <TextInput
                                            style={generalStyles.inputs}
                                            onChangeText={handleChange('userLastName')}
                                            onBlur={handleBlur('userLastName')}
                                            value={values.userLastName}
                                            placeholder="Nom de Famille"
                                            placeholderTextColor={"black"}
                                        />

                                        {errors.userLastName && <Text style={generalStyles.error}>{errors.userLastName}</Text>}

                                        <TextInput
                                            style={generalStyles.inputs}
                                            onChangeText={handleChange('userFirstName')}
                                            onBlur={handleBlur('userFirstName')}
                                            value={values.userFirstName}
                                            placeholder="Prènom"
                                            placeholderTextColor={"black"}
                                        />

                                        {errors.userFirstName && <Text style={generalStyles.error}>{errors.userFirstName}</Text>}

                                        <TextInput
                                            style={generalStyles.inputs}
                                            onChangeText={handleChange('userEmailAddress')}
                                            onBlur={handleBlur('userEmailAddress')}
                                            value={values.userEmailAddress}
                                            placeholder="Email"
                                            placeholderTextColor={"black"}
                                        />

                                        {errors.userEmailAddress && <Text style={generalStyles.error}>{errors.userEmailAddress}</Text>}

                                        <View style={generalStyles.fdr}>
                                            <TextInput
                                                onChangeText={handleChange('password')}
                                                style={generalStyles.inputs}
                                                placeholder="Password"
                                                placeholderTextColor={"black"}
                                                secureTextEntry={!showPassword}
                                            />

                                            <TouchableOpacity onPress={() => setShowPassword(c => !c)}>

                                                <View>

                                                    <MaterialIcons
                                                        style={generalStyles.iconEye}
                                                        name={showPassword ? 'visibility' : 'visibility-off'}
                                                        size={24}
                                                        color="#000"
                                                    />

                                                </View>

                                            </TouchableOpacity>

                                        </View>

                                        {errors.password && <Text style={generalStyles.error}>{errors.password}</Text>}

                                        <View style={[generalStyles.fdr]}>

                                            <TextInput
                                                style={generalStyles.inputs}
                                                onChangeText={handleChange('verifyPassword')}
                                                onBlur={handleBlur('verifyPassword')}
                                                value={values.verifyPassword}
                                                placeholder="Verification mot de passe"
                                                placeholderTextColor={"black"}
                                                secureTextEntry={!showVerifPassword}
                                                onPress={() => setFieldValue('verifyPassword', values.verifyPassword, true)}
                                            />

                                            <TouchableOpacity onPress={() => setShowVerifPassword(c => !c)}>

                                                <View>

                                                    <MaterialIcons
                                                        style={generalStyles.iconEye}
                                                        name={showVerifPassword ? 'visibility' : 'visibility-off'}
                                                        size={24}
                                                        color="#000"
                                                    />
                                                </View>

                                            </TouchableOpacity>

                                        </View>

                                        {errors.verifyPassword && <Text style={generalStyles.error}>{errors.verifyPassword}</Text>}
                                        {errors.submit && <Text style={generalStyles.error}>{errors.password}</Text>}

                                        <View style={{ marginTop: 30 }}>

                                            <GradientButton
                                                handlePress={handleSubmit}
                                                text="Modifier"
                                                loading={isSubmitting}
                                                disabled={isSubmitting}
                                            />

                                        </View>

                                    </View>

                                </View>

                            </KeyboardAvoidingView>

                        </>
                    )}

                </Formik >

            </ScrollView>

        </View>
    );
};

const styles = StyleSheet.create({
    form: {
        marginTop: 20,
    },
});

export default ModifyAccount;