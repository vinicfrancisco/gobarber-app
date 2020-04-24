import React, {
  useState,
  createContext,
  useContext,
  useEffect,
  useCallback,
} from 'react';
import { Keyboard, Platform, LayoutAnimation } from 'react-native';

interface KeyboardContextData {
  keyboardHeight: number;
  layoutAnimation: {
    duration: number;
    update: {
      duration: number;
      type: string;
    };
  } | null;
}

export const KeyboardContext = createContext<KeyboardContextData>(
  {} as KeyboardContextData
);

export const KeyboardProvider: React.FC = ({ children }) => {
  const [keyboard, setKeyboard] = useState<KeyboardContextData>({
    keyboardHeight: 0,
    layoutAnimation: null,
  });

  const onChangeKeyboard = useCallback((event) => {
    if (!event) {
      setKeyboard({
        layoutAnimation: null,
        keyboardHeight: 0,
      });
      return;
    }

    const { duration, easing, startCoordinates, endCoordinates } = event;

    let keyboardHeight;

    if (
      Platform.OS === 'ios' &&
      endCoordinates.screenY > startCoordinates.screenY
    ) {
      keyboardHeight = 0;
    } else if (
      Platform.OS === 'ios' &&
      endCoordinates.screenY === startCoordinates.screenY
    ) {
      return;
    } else {
      keyboardHeight = endCoordinates.height;
    }

    let layoutAnimation;

    if (duration && easing) {
      layoutAnimation = {
        duration,
        update: {
          duration,
          type: LayoutAnimation.Types[easing] || 'keyboard',
        },
      };
    }

    setKeyboard({
      keyboardHeight,
      layoutAnimation: layoutAnimation || null,
    });
  }, []);

  useEffect(() => {
    if (Platform.OS === 'ios') {
      Keyboard.addListener('keyboardWillChangeFrame', onChangeKeyboard);
    } else {
      Keyboard.addListener('keyboardDidShow', onChangeKeyboard);
      Keyboard.addListener('keyboardDidHide', onChangeKeyboard);
    }

    return () => {
      if (Platform.OS === 'ios') {
        Keyboard.removeListener('keyboardWillChangeFrame', () => {});
      } else {
        Keyboard.removeListener('keyboardDidShow', () => {});
        Keyboard.removeListener('keyboardDidHide', () => {});
      }
    };
  }, []);

  return (
    <KeyboardContext.Provider
      value={{
        keyboardHeight: keyboard.keyboardHeight,
        layoutAnimation: keyboard.layoutAnimation,
      }}
    >
      {children}
    </KeyboardContext.Provider>
  );
};

export function useKeyboard(): KeyboardContextData {
  const context = useContext(KeyboardContext);

  if (!context) {
    throw new Error('useKeyboard musb be used within an Keyboard Provider');
  }

  return context;
}

export default KeyboardContext;
