import { FaGithub } from "react-icons/fa6";

const Header = () => {
  return (
    <div className="mb-4 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold text-yellow-500">🎰 Slot Machine 🎰</h1>
      <span className="font-semibold text-neutral-200">
        <a
          href="https://github.com/gospaleks"
          className="flex items-center transition duration-300 hover:text-yellow-500"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaGithub className="mr-1" />
          gospaleks
        </a>
      </span>
    </div>
  );
};

export default Header;
