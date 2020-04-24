import React, { useRef, useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/mobile';
import {
  Image,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  View,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import logoImage from '../../assets/logo.png';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Title, BackToSignIn, BackToSignInText } from './styles';

const SignUp: React.FC = () => {
  const navigation = useNavigation();
  const formRef = useRef<FormHandles>(null);
  const emailInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);

  const handleSignUp = useCallback((data: object) => {
    console.log(data);
  }, []);

  return (
    <KeyboardAvoidingView
      enabled
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ flex: 1 }}
      >
        <Container>
          <Image source={logoImage} />

          <View>
            <Title>Crie sua conta</Title>
          </View>

          <Form ref={formRef} onSubmit={handleSignUp}>
            <Input
              name="name"
              icon="user"
              placeholder="Nome"
              autoCorrect
              autoCapitalize="words"
              returnKeyType="next"
              onSubmitEditing={() => emailInputRef.current?.focus()}
            />

            <Input
              ref={emailInputRef}
              autoCorrect={false}
              name="email"
              icon="mail"
              placeholder="E-mail"
              keyboardType="email-address"
              autoCapitalize="none"
              returnKeyType="next"
              onSubmitEditing={() => passwordInputRef.current?.focus()}
            />

            <Input
              ref={passwordInputRef}
              secureTextEntry
              name="password"
              icon="lock"
              placeholder="Senha"
              textContentType="newPassword"
              returnKeyType="send"
              onSubmitEditing={() => formRef.current?.submitForm()}
            />

            <Button onPress={() => formRef.current?.submitForm()}>
              Entrar
            </Button>
          </Form>
        </Container>
      </ScrollView>

      <BackToSignIn onPress={() => navigation.goBack()}>
        <Icon name="arrow-left" size={20} color="#fff" />

        <BackToSignInText>Voltar para logon</BackToSignInText>
      </BackToSignIn>
    </KeyboardAvoidingView>
  );
};

export default SignUp;
