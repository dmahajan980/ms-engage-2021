import { ChakraProps, ThemingProps } from '@chakra-ui/react';

type AllChakraProps = ChakraProps | ThemingProps;

interface StyleSheet {
  [key: string]: AllChakraProps;
}

export default StyleSheet;
