import { useState } from "react";
import {
  Avatar,
  Dropdown,
  DropdownHeader,
  DropdownItem,
  Navbar,
  NavbarBrand,
  NavbarToggle,
} from "flowbite-react";
import { signInWithGoogle, logout } from "../firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export function Navigation() {
  const [user, setUser] = useState<any>(null);

  // Firebase Authentication State Listener
  const auth = getAuth();
  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });

  return (
    <Navbar fluid className="bg-gray-900">
      <NavbarBrand href="#">
        <img src="/favicon.svg" className="mr-3 h-6 sm:h-9" alt="Flowbite React Logo" />
        <span className="self-center whitespace-nowrap text-xl font-semibold text-white">Gmail Assistant</span>
      </NavbarBrand>
      <div className="flex md:order-2">
        {user ? (
          <Dropdown arrowIcon={false} inline label={<Avatar alt="User settings" img={user.photoURL} rounded />}>
            <DropdownHeader>
              <span className="block text-sm">{user.displayName}</span>
              <span className="block truncate text-sm font-medium">{user.email}</span>
            </DropdownHeader>
            <DropdownItem onClick={logout}>Sign out</DropdownItem>
          </Dropdown>
        ) : (
          <button onClick={signInWithGoogle} className="bg-blue-500 text-white px-4 py-2 rounded-lg">
            Sign in with Google
          </button>
        )}
        <NavbarToggle />
      </div>
    </Navbar>
  );
}
