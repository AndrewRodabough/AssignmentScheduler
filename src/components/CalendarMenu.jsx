/**
 * CalendarMenu - Renders menu options for a calendar (edit, share, delete).
 *
 * @param {Object} calendar - The calendar object.
 * @param {string} activeMenu - The currently active menu name.
 * @param {function} onEdit - Callback for editing the calendar.
 * @param {function} onShare - Callback for sharing the calendar.
 * @param {function} onDelete - Callback for deleting the calendar.
 * @param {function} onToggleMenu - Callback for toggling the menu.
 * @returns {React.ReactNode} The calendar menu component.
*/

import React from 'react';

const CalendarMenu = ({
  calendar,
  activeMenu,
  onEdit,
  onShare,
  onDelete,
  onToggleMenu
}) => (

  <div className='calendar-list-icons'>
    <div>
      {calendar.shared && <span className="material-symbols-outlined">group</span>}
    </div>
    <div className="calendar-list-menu-container">
      <div className="calendar-list-menu-trigger" onClick={e => onToggleMenu(calendar.name, e)}>
        <span className="calendar-list-three-dots">&#8942;</span>
      </div>
      <div className={`calendar-list-dropdown-menu ${activeMenu === calendar.name ? 'active' : ''}`}>
        <ul>
          <li onClick={() => onEdit(calendar.name)}>Edit Calendar</li>
          <li onClick={() => onShare(calendar.name)}>Share Calendar</li>
          <li onClick={() => onDelete(calendar.name)}>Delete Calendar</li>
        </ul>
      </div>
    </div>
  </div>
);

export default CalendarMenu;
