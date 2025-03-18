import { Link, useLocation } from "react-router-dom";
import { Flex } from "antd";

interface LinkItemProps {
  name: string;
  path: string;
}

const LinkItems: LinkItemProps[] = [
  {
    name: 'Players',
    path: "/",
  },
  {
    name: 'Teams',
    path: "/teams",
  },
  {
    name: 'Generate Teams',
    path: "/generate-teams",
  },
];

const Navbar: React.FC = () => {
  const location = useLocation();
  return (
    <nav>
      <Flex gap={32}>
        {LinkItems.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className={`${link.path === location.pathname ? 'is-active' : 'in-active'}`}
          >
            { link.name }
          </Link>
        ))}
      </Flex>
    </nav>
  );
}

export default Navbar;
