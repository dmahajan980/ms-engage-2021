import { Dispatch, FC, useRef } from 'react';
import { Box } from '@chakra-ui/react';
import AsyncSelect from 'react-select/async';
import axios from 'axios';

import { useIpContext } from '../../context/IP';

const SearchBar: FC<{
  setTerm: Dispatch<any>;
}> = ({ setTerm }) => {
  const IP = useIpContext();

  const timeoutRef = useRef<any>(null);
  const loadOptions = (value: string, callback: Function) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      axios
        .post(`${IP}/users/search`, {
          headers: {
            Authorization: localStorage.getItem('msAuthToken'),
          },
          data: value,
        })
        .then(({ data }) => {
          const results: any[] = [];
          const email = localStorage.getItem('email');
          data.forEach((details: any) => {
            if (email !== details.email) {
              results.push({
                label: details.email,
                value: details._id,
                name: details.name,
              });
            }
          });
          callback(results);
        });
    }, 500);
  };

  return (
    <Box>
      <AsyncSelect
        cacheOptions
        loadOptions={loadOptions}
        defaultOptions
        onChange={(data) => {
          if (data) {
            setTerm(data);
          }
        }}
        placeholder="Enter user's email"
      />
    </Box>
  );
};

export default SearchBar;
