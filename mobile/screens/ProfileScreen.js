// librarys
import React from 'react';
import { View } from 'react-native';
import * as Keychain from 'react-native-keychain';

// components
import Text from '../components/common/Text';
import Button from '../components/common/Button';

// styles
import styles from '../styles/ProfileStyles';

// hooks / contexts
import { useAuthContext, useAuthContextState } from '../contexts/AuthContext';

const ProfileScreen = () => {
  const { signOut } = useAuthContext();
  const state = useAuthContextState();

  return (
    <View style={styles.container}>
      <Text style={styles.regularText}>ABCDEFGHabcdefgh</Text>
      <Text style={styles.customFontText}>ABCDEFGHabcdefgh</Text>

      <Button title="signout" onPress={signOut}></Button>
      <Button
        title="Print auth state"
        onPress={() => {
          console.log('AuthContextState: ', state);
          Keychain.getInternetCredentials('jwt').then(creds => {
            console.log('Keychain: ', creds);
          });
        }}
      />
    </View>
  );
};

export default ProfileScreen;
