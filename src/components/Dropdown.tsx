import {
  useState,
  useRef,
  useEffect,
  KeyboardEvent,
  ReactNode,
  FC,
} from "react";

type Option = {
  id: string;
  value: string;
  title: string;
};

type DropdownProps = {
  options: Option[];
  onSelect: (value: string) => void;
  placeholder?: string;
  styles?: {
    container?: string;
    button?: string;
    list?: string;
    item?: string;
    itemActive?: string;
  };
  renderCustomOption?: (option: Option, isActive: boolean) => ReactNode;
};

const Dropdown: FC<DropdownProps> = ({
  options,
  onSelect,
  placeholder = "Select an option",
  styles = {},
  renderCustomOption,
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleIsExpanded = () => setIsExpanded((prev) => !prev);

  const handleOptionSelect = (option: Option, index: number) => {
    setSelectedOption(option.title);
    onSelect(option.value);
    setIsExpanded(false);
    setActiveIndex(index);
  };

  // Closes the menu when user clicks outside of dropdown
  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsExpanded(false);
    }
  };

  // Handles navigation using keyboard
  const handleNavigateDropdownViaKeyboard = (event: KeyboardEvent<HTMLDivElement>) => {
    if (!isExpanded) return;

    event.preventDefault();

    const keyActionMap: Record<string, () => void> = {
      ArrowDown: () => setActiveIndex((prev) => (prev + 1) % options.length),
      ArrowUp: () => setActiveIndex((prev) => (prev - 1 + options.length) % options.length),
      Enter: () => handleOptionSelect(options[activeIndex], activeIndex),
      Escape: () => setIsExpanded(false),
    };

    if (keyActionMap[event.key]) {
      keyActionMap[event.key]();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      className={`relative ${styles.container}`}
      ref={dropdownRef}
      onKeyDown={handleNavigateDropdownViaKeyboard}
      tabIndex={0}
      role="combobox"
      aria-expanded={isExpanded}
      aria-haspopup="listbox"
    >
      <button
        className={`w-full p-4 bg-white text-gray-800 border-gray-300 border rounded-lg shadow-sm flex items-center justify-between ${styles.button}`}
        onClick={toggleIsExpanded}
        aria-controls="dropdown-options"
        aria-label="Toggle Dropdown"
      >
        <span>{selectedOption || placeholder}</span>
        <svg
          className={`
            w-5 h-5 ml-2 transform transition-transform duration-300
            ${isExpanded ? "rotate-180" : ""}
          `}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      <ul
        id="dropdown-options"
        className={`absolute left-0 z-10 w-full mt-2 bg-white border rounded-lg shadow-lg transition-all duration-300 ease-out max-h-0 overflow-auto opacity-0
          ${isExpanded ? "opacity-100 max-h-64" : ""}
          ${styles.list}`}
        role="listbox"
      >
        {options.map((option, index) => {
          const isActive = index === activeIndex;
          return (
            <li
              key={option.id}
              className={`px-4 py-2 text-gray-800 cursor-pointer hover:bg-gray-100
                ${isActive ? "bg-gray-200" : ""}
                ${styles.item} 
                ${isActive && styles.itemActive ? styles.itemActive : ""}
              `}
              onClick={() => handleOptionSelect(option, index)}
              role="option"
              aria-selected={isActive}
            >
              {renderCustomOption
                ? renderCustomOption(option, isActive)
                : option.title}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export { Dropdown };

export default Dropdown;
