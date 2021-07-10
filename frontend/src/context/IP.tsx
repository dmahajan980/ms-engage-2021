import { createContext, FC, useContext } from 'react';

const IpContext = createContext('');
const IP = process.env.REACT_APP_SERVER_IP || '';

const IpProvider: FC<{}> = ({ children }) => {
  return <IpContext.Provider value={IP}>{children}</IpContext.Provider>;
};

const useIpContext = () => useContext(IpContext);

export { IpProvider, useIpContext };
