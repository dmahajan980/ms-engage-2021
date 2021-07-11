import { Dispatch, FC, SetStateAction } from 'react';
import { Button, Flex, Text } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

import CallIcon from '../Icons/Call';
import ChatIcon from '../Icons/Chat';

import { SelectedSection } from '../../types/SelectedSection';

import styleProps from './styles';

interface Props {
  selectedSection: SelectedSection;
  onSectionClick: Dispatch<SetStateAction<SelectedSection>>;
}

const SideBar: FC<Props> = ({ selectedSection, onSectionClick }) => {
  return (
    <Flex {...styleProps.wrapper}>
      <Button
        as={RouterLink}
        to={`/${SelectedSection.Chat}`}
        onClick={() => onSectionClick(SelectedSection.Chat)}
        {...styleProps.button}
        {...(selectedSection === SelectedSection.Chat &&
          styleProps.buttonSelected)}
      >
        <ChatIcon
          isSelected={selectedSection === SelectedSection.Chat}
          {...styleProps.buttonIcon}
        />
        <Text {...styleProps.buttonLabel}>Chat</Text>
      </Button>
      <Button
        as={RouterLink}
        to={`/${SelectedSection.Call}`}
        onClick={() => onSectionClick(SelectedSection.Call)}
        {...styleProps.button}
        {...(selectedSection === SelectedSection.Call &&
          styleProps.buttonSelected)}
      >
        <CallIcon
          isSelected={selectedSection === SelectedSection.Call}
          {...styleProps.buttonIcon}
        />
        <Text {...styleProps.buttonLabel}>Call</Text>
      </Button>
    </Flex>
  );
};

export default SideBar;
