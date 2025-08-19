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
