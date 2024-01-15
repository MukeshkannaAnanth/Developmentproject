// routes
import Router from "./routes";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// theme
import ThemeProvider from './theme';
// components
import ThemeSettings from './components/settings';

function App() {
  return (
    <ThemeProvider>
      <ThemeSettings>
        {" "}
        <Router />{" "}

        <ToastContainer
position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
/>
{/* Same as */}
<ToastContainer />
      </ThemeSettings>
    </ThemeProvider>
  );
}

export default App;
