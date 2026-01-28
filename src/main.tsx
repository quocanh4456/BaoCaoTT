import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux' // 1. Import Provider
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { store } from './redux/store' // 2. Import Store
import theme from './theme'
import App from './App'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* 3. Bọc App bằng Provider và truyền store vào */}
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
)