import { FC, useState } from 'react';
import { Box, Button, Flex, Text, Img, Input } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { v4 as uuidv4, validate } from 'uuid';

import styleProps from './styles';

const JoinCallPage: FC<{}> = () => {
  const [value, setValue] = useState('');
  const handleChange = (event: any) => {
    const codeArray = event.target.value.split('/');
    const extractedValue = codeArray[codeArray.length - 1];

    if (validate(extractedValue)) {
      setValue(extractedValue);
    } else {
      setValue('');
    }
  };

  const [generatedCode] = useState(uuidv4);

  return (
    <Flex {...styleProps.wrapper}>
      <Box {...styleProps.textWrapper}>
        <Text {...styleProps.heading}>
          Video meetings accessible to everyone.
        </Text>
        <Text {...styleProps.text}>
          Cheems allows you to connect with your others in an instant.
        </Text>
        <Flex {...styleProps.buttonWrapper}>
          <Button
            as={RouterLink}
            to={`/room/${generatedCode}`}
            {...styleProps.button}
          >
            New Meeting
          </Button>
          <Input
            placeholder='Enter an invite link or code'
            onChange={handleChange}
            {...styleProps.input}
          />
          {value && (
            <Button
              as={RouterLink}
              to={`/room/${value}`}
              {...styleProps.joinButton}
            >
              Join
            </Button>
          )}
        </Flex>
      </Box>
      <Img src='img/meet.png' {...styleProps.img} />
    </Flex>
  );
};

export default JoinCallPage;
