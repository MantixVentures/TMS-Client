import logo from './logo.svg';
import './App.css';
import DriverLoginPage from './view/LoginPage/DriverLoginPage';
import AdminLogin from './view/LoginPage/AdminLogin';
import PoliceOfficer from './view/LoginPage/PoliceOfficer';
import DrawerPage from './Layout/DrawerPage';
import { HashRouter, Route, Routes, Navigate } from 'react-router-dom';
import DashboardPage from './view/Admin/DashBoardPage';
import PoliceUser from './view/UserManagement/policeUser';
import CivilUser from './view/UserManagement/civilUser';
import UserDetails from './view/UserManagement/UserDetails';
import EditUser from './view/UserManagement/EditUser';
import EditPoliceUser from './view/UserManagement/editPoliceUser';
import EditCivilUser from './view/UserManagement/editCivilUser';
import NewPoliceUser from './view/UserManagement/NewPoliceUser';
import NewCivilUser from './view/UserManagement/NewCivilUser';
import RegisterPage from './view/LoginPage/Register';
import FinesManagement from './pages/FinesManagement';
import NormalFines from './pages/FinesManagement/NormalFines';
import CourtFines from './pages/FinesManagement/CourtFines';
import { Reports } from './view/Reports/Reports';
import FinesDetails from './view/FinesManagement/FinesDetails';
import EditFines from './view/FinesManagement/EditFines';
import PageHandling from './utils/PageHandling';
import FineIssureForm from './view/Driver/FineIssureForm';
import DriverPage from './view/Driver/DriverPage';
import Home from './view/home/Home';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from './utils/theme';
import { AuthProvider } from './utils/AuthContext';
import { CssBaseline } from '@mui/material';
import { ProtectedRoute } from './utils/ProtectedRoute';
import PoliceOfficerPage from './view/policeOfficer/policeOfficerpage';
import PaymentSuccess from './pages/paymentPages/PaymentSuccess';
import PaymentCancelled from './pages/paymentPages/PaymentCancelled';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <div className="App">
          <HashRouter>
            <Routes>
              {/* Redirect root to home */}
              <Route path="/" element={<Navigate to="/home" replace />} />

              {/* Public Routes */}
              <Route path='/home' element={<Home />} />
              <Route path='/driver-login' element={<DriverLoginPage />} />
              <Route path='/admin-login' element={<AdminLogin />} />
              <Route path='/officer-login' element={<PoliceOfficer />} />
              <Route path='/register' element={<RegisterPage />} />

              {/* Protected Routes */}
              <Route path='/driver-dashboard' element={
                <ProtectedRoute>
                  <DriverPage />
                </ProtectedRoute>
              } />

              <Route path='officer-dashboard' element={
                <ProtectedRoute>
                  <PoliceOfficerPage />
                </ProtectedRoute>
              } />
              <Route path='/handlePage' element={
                <ProtectedRoute>
                  <PageHandling />
                </ProtectedRoute>
              } />
              <Route path='/fine-issure-page' element={
                <ProtectedRoute>
                  <FineIssureForm />
                </ProtectedRoute>
              } />
              <Route path="/" element={
                <ProtectedRoute>
                  <DrawerPage />
                </ProtectedRoute>
              }>
                <Route path='dashboard' element={<DashboardPage />} />
                <Route path='payment-success' element={<PaymentSuccess />} />
                <Route path='payment-cancelled' element={<PaymentCancelled />} />
                <Route path='user/police' element={<PoliceUser />} />
                <Route path='user/civil' element={<CivilUser />} />
                <Route path='fines/*' element={<FinesManagement />} />
                <Route path='userdetails' element={<UserDetails />} />
                <Route path='newpolice' element={<NewPoliceUser />} />
                <Route path='newcivil' element={<NewCivilUser />} />
                <Route path='editAdmin/:id' element={<EditUser />} />
                <Route path='editCivil/:id' element={<EditCivilUser />} />
                <Route path='editPolice/:id' element={<EditPoliceUser />} />
                <Route path='finesdetails' element={<FinesDetails />} />
                <Route path='editFines/:fineid' element={<EditFines />} />
                <Route path='analyze' element={<Reports />} />
              </Route>
            </Routes>
          </HashRouter>
        </div>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
