import { Link } from 'react-router-dom';
import { UserButton, SignInButton, useUser } from '@clerk/clerk-react';
import { assets } from '../../assets/assets';
import { useEffect } from 'react';
import axios from 'axios';

const Navbar = ({ isCourselistPage }) => {
  const { user, isSignedIn } = useUser();
  const role = user?.publicMetadata?.role; // 👈 Get role from metadata

  useEffect(() => {
    if (isSignedIn && user) {
      const userSent = localStorage.getItem('userSent');

      if (!userSent) {
        const sendUserToBackend = async () => {
          try {
            // You can send user info here
            // await axios.post('http://localhost:5000/api/users', {
            //   id: user.id,
            //   name: user.fullName,
            //   email: user.primaryEmailAddress.emailAddress,
            //   role: user.publicMetadata?.role
            // });

            console.log('User sent to backend');
            localStorage.setItem('userSent', 'true');
          } catch (error) {
            console.error('Error sending user data:', error);
          }
        };

        sendUserToBackend();
      }
    }
  }, [isSignedIn, user]);

  return (
    <nav className={`flex items-center justify-between px-4 sm:px-10 md:px-14 lg:px-36 border-b border-gray-500 py-4 ${isCourselistPage ? 'bg-white' : 'bg-cyan-100/70'}`}>
      <Link to="/">
        <img src={assets.logo} alt="Logo" className="w-28 lg:w-32 cursor-pointer" />
      </Link>

      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center gap-5 text-gray-500">
        {role === 'admin' ? (
          <>
            <Link to="/dashboard" className="hover:text-gray-700">Admin Dashboard</Link>
            <UserButton />
          </>
        ) : (
          <>
            <div className="flex items-center gap-5">
              <button className="hover:text-gray-700">Become Educator</button>
              {user && (
                <>
                  <span>|</span>
                  <Link to="/my-enrollments" className="hover:text-gray-700">My Enrollments</Link>
                </>
              )}
            </div>
            {user ? (
              <UserButton />
            ) : (
              <SignInButton mode="modal">
                <button className="bg-blue-600 text-white px-5 py-2 rounded-full hover:bg-blue-700">Create Account</button>
              </SignInButton>
            )}
          </>
        )}
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden flex items-center gap-2 sm:gap-5 text-gray-500">
        {role === 'admin' ? (
          <>
            <Link to="/dashboard" className="hover:text-gray-700 text-sm">Admin Dashboard</Link>
            <UserButton />
          </>
        ) : (
          <>
            <div className="flex items-center gap-1 sm:gap-2 max-sm:text-xs">
              {user && (
                <>
                  <button className="hover:text-gray-700">Become Educator</button>
                  <span>|</span>
                  <Link to="/my-enrollments" className="hover:text-gray-700">My Enrollments</Link>
                </>
              )}
            </div>
            {user ? (
              <UserButton />
            ) : (
              <SignInButton mode="modal">
                <button>
                  <img src={assets.user_icon} alt="User icon" className="w-6 h-6" />
                </button>
              </SignInButton>
            )}
          </>
        )}
      </div>
    </nav>
  );
};


export default Navbar;


