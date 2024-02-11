const Header = () => {
  return (
    <header className="bg-gray-800 text-white py-6">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-medium">My Application</h1>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <a href="#" className="hover:underline">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                About
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Contact
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};
export default Header;
