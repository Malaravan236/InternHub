import InternshipListings from '../pages/InternshipListings';
import Login from '../pages/Login';

const authRoutes = {
  navigationRouts: [
    {
      path: '/',
      name: 'internships',
      component: <InternshipListings />,
    },
    {
      path: '/login',
      name: 'login',
      component: <Login />,
    },
  ],
};

export default authRoutes;
