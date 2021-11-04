import React from 'react';
import PropTypes from 'prop-types';
import UseDarkMode from '../../hooks/UseDarkMode';
// Styles
import './Menu.css';
// Icons
import { FaMoon, FaSun } from 'react-icons/fa';

/*
 * TODO: Refactor Menu as a functional component
 *
 * Requirements:
 * - Create a custom hook to implement dark mode named useDarkMode
 * - Switch from setState to the useDarkMode hook
 * - Use function closures instead of this for callbacks and event handlers OK
 * - Menu logic and behavior should remain the same OK
 *
 */

const Menu = ({ items, selectedItem, onSelectItem }) => {
  const {dark, setDark} = UseDarkMode();

  const handleOnChangeMode = () => {
   setDark(prev => !prev);
  };

  const ModeIcon = dark ? FaSun : FaMoon;

  const brandLogo = dark
    ? `${process.env.PUBLIC_URL}/logo_white.svg`
    : `${process.env.PUBLIC_URL}/logo.svg`;

  return (
    <div className="menu-container">
      <a href="https://alterclass.io/courses/react" className="logo">
        <img src={brandLogo} alt="AlterClass" />
      </a>
      <ul className="menu-nav">
        {items.map((item, i) => (
          <li
            key={item}
            onClick={() => onSelectItem(i)}
            className={selectedItem === i ? 'selected' : null}
          >
            <h2>{item}</h2>
          </li>
        ))}
      </ul>
      <ModeIcon className="mode-icon" onClick={handleOnChangeMode} />
    </div>
  );
}

Menu.propTypes = {
  items: PropTypes.arrayOf(PropTypes.string),
  selectedItem: PropTypes.number,
  onSelectItem: PropTypes.func,
};

export default Menu;
