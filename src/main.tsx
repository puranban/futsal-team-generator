import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { ConfigProvider } from 'antd';
import '@ant-design/v5-patch-for-react-19';

const root = createRoot(document.getElementById('root')!);
root.render(
  <StrictMode>

    <ConfigProvider
      theme={{
        components: {
          Rate: {
            starColor: "#ee0000",
          }
        }
      }}
    >
      <App />
    </ConfigProvider>
  </StrictMode>,
);
