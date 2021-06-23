import { FC } from 'react';
import { Global } from '@emotion/react';

const HindFont: FC = () => {
  const fonts = [
    {
      url: '/fonts/Hind/Light.ttf',
      weight: 300,
      style: 'normal',
    },
    {
      url: '/fonts/Hind/Regular.ttf',
      weight: 400,
      style: 'normal',
    },
    {
      url: '/fonts/Hind/Medium.ttf',
      weight: 500,
      style: 'normal',
    },
    {
      url: '/fonts/Hind/SemiBold.ttf',
      weight: 600,
      style: 'normal',
    },
    {
      url: '/fonts/Hind/Bold.ttf',
      weight: 700,
      style: 'normal',
    },
  ];

  let fontFaces = '';
  fonts.forEach(({ url, weight, style }) => {
    fontFaces += `
        @font-face {
          font-family: 'Hind';
          src: url(${url}) format('truetype');
          font-weight: ${weight};
          font-style: ${style};
          font-display: swap;
        }
      `;
  });

  return <Global styles={fontFaces} />;
};

export default HindFont;
