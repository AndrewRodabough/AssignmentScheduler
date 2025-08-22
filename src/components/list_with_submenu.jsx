import React, { useState, useEffect, useRef } from 'react';
import SubMenu from "./submenu.jsx"

const ListWithSubMenu = ({ items, subMenuItems }) => {
  const [activeMenu, setActiveMenu] = useState("");
  const menuRef = useRef(null);

  // Click outside handler
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

    // Cleanup
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [activeMenu]);

  return (
    <ul>
      {items.map(item => (
        <li key={item.uid} className="calendar-list-item">
          <div className="calendar-list-title">{item.title}</div>
          <div className='calendar-list-icons'>
            <div>
              {item.privacy === "public" && <span className="material-symbols-outlined">group</span>}
            </div>
            <div className="calendar-list-menu-container" ref={activeMenu === item.uid ? menuRef : null}>
              <div 
                className="calendar-list-menu-trigger" 
                onClick={() => { setActiveMenu(prev => (prev === item.uid ? "" : item.uid)); }}
              >
                <span className="calendar-list-three-dots">&#8942;</span>
              </div>
              {activeMenu === item.uid && (
                <div className={`calendar-list-dropdown-menu active`}>
                  <SubMenu uid={item.uid} items={subMenuItems} />
                </div>
              )}
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default ListWithSubMenu;