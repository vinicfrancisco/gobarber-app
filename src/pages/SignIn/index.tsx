import React from 'react';
import {
  Image,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import logoImage from '../../assets/logo.png';

import Input from '../../components/Input';
import Button from '../../components/Button';

import {
  Container,
  Title,
  ForgotPassword,
  ForgotPasswordText,
  CreateAccount,
  CreateAccountText,
} from './styles';

const SignIn: React.FC = () => {
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
            <Title>Faça seu logon</Title>
          </View>

          <Input name="email" icon="mail" placeholder="E-mail" />

          <Input name="password" icon="lock" placeholder="Senha" />

          <Button onPress={() => console.log('clicou')}>Entrar</Button>

          <ForgotPassword onPress={() => console.log('click')}>
            <ForgotPasswordText>Esqueci minha senha</ForgotPasswordText>
          </ForgotPassword>
        </Container>
      </ScrollView>

      <CreateAccount onPress={() => console.log('click')}>
        <Icon name="log-in" size={20} color="#ff9000" />

        <CreateAccountText>Criar uma conta</CreateAccountText>
      </CreateAccount>
    </KeyboardAvoidingView>
  );
};

export default SignIn;
