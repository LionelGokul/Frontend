import { useLocation, Link } from 'react-router-dom';
import {
  Navbar,
  Typography,
  Button,
  IconButton,
  Breadcrumbs,
} from '@material-tailwind/react';
import {
  UserCircleIcon,
  ArrowLongLeftIcon,
  CheckCircleIcon,
} from '@heroicons/react/24/solid';
import {
  useMaterialTailwindController,
  logoutUser,
  showAlert,
} from '@/context';

export function DashboardNavbar() {
  const [controller, dispatch] = useMaterialTailwindController();
  const { fixedNavbar } = controller;
  const { pathname } = useLocation();
  const [layout, page] = pathname.split('/').filter(el => el !== '');

  return (
    <Navbar
      color={fixedNavbar ? 'white' : 'transparent'}
      className={`rounded-xl transition-all ${
        fixedNavbar
          ? 'sticky top-4 z-40 py-3 shadow-md shadow-blue-gray-500/5'
          : 'px-0 py-1'
      }`}
      fullWidth
      blurred={fixedNavbar}
    >
      <div className='flex flex-col-reverse justify-between gap-6 md:flex-row md:items-center'>
        <div className='capitalize'>
          <Breadcrumbs
            className={`bg-transparent p-0 transition-all ${
              fixedNavbar ? 'mt-1' : ''
            }`}
          >
            <Link to={`/${layout}`}>
              <Typography
                variant='small'
                color='blue-gray'
                className='font-normal opacity-50 transition-all hover:text-blue-500 hover:opacity-100'
              >
                {layout}
              </Typography>
            </Link>
            <Typography
              variant='small'
              color='blue-gray'
              className='font-normal'
            >
              {page}
            </Typography>
          </Breadcrumbs>
          <Typography variant='h6' color='blue-gray'>
            {page}
          </Typography>
        </div>
        <div className='flex items-center'>
          <Button
            variant='text'
            color='blue-gray'
            className='hidden items-center gap-1 px-4 xl:flex normal-case'
            onClick={e => {
              e.preventDefault();
              logoutUser(dispatch, {
                id: null,
                userDetails: null,
                token: null,
              });
              showAlert(dispatch, {
                color: 'light-green',
                content: 'Logged out successfully',
                icon: <CheckCircleIcon strokeWidth={2} className='h-6 w-6' />,
              });
            }}
          >
            <ArrowLongLeftIcon className='h-5 w-5 text-blue-gray-500' />
            Log out
          </Button>
          <IconButton
            variant='text'
            color='blue-gray'
            className='grid xl:hidden'
          >
            <UserCircleIcon className='h-5 w-5 text-blue-gray-500' />
          </IconButton>
        </div>
      </div>
    </Navbar>
  );
}

DashboardNavbar.displayName = '/src/widgets/layout/dashboard-navbar.jsx';

export default DashboardNavbar;
