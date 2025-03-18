import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ConfigProvider } from 'antd';
import '@ant-design/v5-patch-for-react-19';

import App from './App.tsx';
import './index.css';

const root = createRoot(document.getElementById('root')!);
root.render(
  <StrictMode>
    <ConfigProvider
      theme={{
        components: {
          Rate: {
            starColor: '#ee0000',
            starBg: 'rgba(18, 8, 8, 0.26)',
            starHoverScale: 'scale(1.5)',
          }
        }
      }}
    >
      <App />
    </ConfigProvider>
  </StrictMode>,
);
