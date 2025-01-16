import { useNavigate } from "react-router-dom";
import Dropdown from "./Dropdown";

const Nav: React.FC = () => {
  const navigate = useNavigate();
  const handleSelect = (route: string) => {
    console.log(route);

    navigate(route);
  };

  return (
    <Dropdown
      options={[
        {
          id: "1",
          value: "/simple-list",
          title: "Simple list",
        },
        {
          id: "2",
          value: "/data-list",
          title: "Data Table",
        },
      ]}
      onSelect={handleSelect}
      placeholder="Choose an route"
    />
  );
};

export { Nav };

export default Nav;
