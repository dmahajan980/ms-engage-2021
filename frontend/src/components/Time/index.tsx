import { FC, useEffect, useState } from 'react';
import { Text } from '@chakra-ui/react';

import styleProps from './styles';

const Time: FC<{}> = () => {
  const [timeData, setTimeData] = useState(() => {
    const dateObj = new Date();

    const timeObj = {
      hours: dateObj.getHours(),
      minutes: dateObj.getMinutes(),
      seconds: dateObj.getSeconds(),
    };

    return timeObj;
  });

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeData((prevData) => {
        const newMins = (prevData.minutes + 1) % 60;
        const newHr = (!newMins ? prevData.hours + 1 : prevData.hours) % 24;

        return {
          hours: newHr,
          minutes: newMins,
          seconds: new Date().getSeconds(),
        };
      });
    }, 60000 - timeData.seconds * 1000);

    return () => clearInterval(intervalId);
  }, [timeData]);

  return (
    <Text {...styleProps.text}>
      {timeData.hours % 12}:{timeData.minutes} {timeData.hours > 11 ? 'PM' : 'AM'}
    </Text>
  );
};

export default Time;
