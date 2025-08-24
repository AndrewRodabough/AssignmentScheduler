import React, { useState, useEffect, useRef } from 'react';

const ListWithSubMenu = ({ items, getTitle, getIcons, menuItems, getKey }) => {
  const [activeMenu, setActiveMenu] = useState("");
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setActiveMenu("");
      }
    };
    if (activeMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [activeMenu]);

  return (
    <ul className="list-with-submenu">
      {items.map(item => {
        const key = getKey ? getKey(item) : item.id || item.key || item.title;
        const textColor = item.color || '#fff';
        return (
          <li key={key} className="list-with-submenu-item">
            <div className="list-with-submenu-title" style={{ color: textColor }}>
              {getTitle ? getTitle(item) : item.title}
            </div>
            <div className="list-with-submenu-icons">
              {getIcons ? getIcons(item) : null}
              <div className="list-with-submenu-menu-container" ref={activeMenu === key ? menuRef : null}>
                <div
                  className="list-with-submenu-menu-trigger"
                  onClick={() => setActiveMenu(prev => (prev === key ? "" : key))}
                >
                  <span className="list-with-submenu-three-dots">&#8942;</span>
                </div>
                {activeMenu === key && (
                  <div className="list-with-submenu-dropdown-menu active">
                    {menuItems && menuItems(item)}
                  </div>
                )}
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default ListWithSubMenu;