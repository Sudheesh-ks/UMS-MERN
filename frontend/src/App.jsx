import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from "./redux/store"
import AppRoutes from './routes/AppRoutes'
import './App.css'

function App() {

  return (
    <Provider store={store}>
      <BrowserRouter>
        <AppRoutes/>
      </BrowserRouter>
    </Provider>
  )
}

export default App
