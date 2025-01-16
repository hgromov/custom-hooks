This repository demonstrates a flexible and reusable approach to data fetching in React using two custom hooks: `useAxios` and `useData`. It includes a fully functional data table component with built-in support for pagination, filtering, and sorting.

## Features

### `useAxios`
A universal React hook for handling HTTP requests:
- **Supports all HTTP methods**: GET, POST, PUT, DELETE, etc.
- **State management**:
  - `data`: Stores response data.
  - `isLoading`: Indicates loading state.
  - `error`: Captures error messages.
- **Configurable**: Accepts a standard Axios configuration object to set headers, query parameters, and more.
- **Reusable**: Suitable for any component that needs API interaction.

### `useData`
A specialized hook for paginated data fetching:
- **Data fetching**: Retrieves and manages data from a specified API endpoint.
- **Pagination**: Handles navigation through pages with `next` and `previous` controls.
- **Filtering and sorting**:
  - Filter data dynamically using a search string.
  - Sort data by a specified field.
- **State management**: Manages `data`, `total` count, `page`, `limit`, `filter`, `sort`, and loading states.
- **Encapsulated Handlers**:
  - `handleNext`, `handlePrev`: Control pagination.
  - `handleFilterChange`, `handleSortChange`: Manage filter and sort changes.

Dropdown Component
The Dropdown component in React provides a simple and reusable way to create a dropdown menu with keyboard navigation, accessibility, and custom styling.

Features
State Management:

isExpanded: Tracks whether the dropdown menu is open or closed.
selectedOption: Stores the currently selected option’s title.
Keyboard Navigation:

Supports ArrowDown, ArrowUp, Enter, and Escape for easy interaction.
Accessibility:

Uses ARIA roles (role="combobox", aria-haspopup="listbox", aria-expanded) for better screen reader compatibility.
Custom Rendering:

The renderCustomOption prop allows customizing the appearance of each dropdown item.
Custom Styling:

Apply your own CSS using the styles prop to match the component's look and feel.


## Installation

Clone the repository, install dependencies, and start dev server:

```bash
git clone https://github.com/hgromov/custom-hooks.git
cd custom-hooks
npm install
npm run dev
