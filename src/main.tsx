import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom' // Đã import
import { Provider } from 'react-redux'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { store } from './redux/store'
import theme from './theme'
import App from './App'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      {/* 👇 BỔ SUNG CẶP THẺ BROWSER ROUTER Ở ĐÂY 👇 */}
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <App />
        </ThemeProvider>
      </BrowserRouter>
      {/* 👆 KẾT THÚC CẶP THẺ 👆 */}
    </Provider>
  </React.StrictMode>,
)