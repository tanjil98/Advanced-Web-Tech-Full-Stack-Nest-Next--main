import '@/styles/globals.css'
import { AuthProvider } from './utilis/authcontext';

export default function App({ Component, pageProps }) {
  return(    <AuthProvider>
  <Component {...pageProps} />
  </AuthProvider>);
}
