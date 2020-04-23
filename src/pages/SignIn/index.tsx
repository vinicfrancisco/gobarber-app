import React from 'react';
import { Image } from 'react-native';

import logoImage from '../../assets/logo.png';

import { Container } from './styles';

const SignIn: React.FC = () => {
  return (
    <Container>
      <Image source={logoImage} />
    </Container>
  );
};

export default SignIn;
