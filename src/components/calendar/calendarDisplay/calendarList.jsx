import React, { useContext } from 'react';
import ModalContext from '../../../context/modalContext.jsx';
import CalendarContext from '../../../context/calendarContext.jsx';
import ListWithSubMenu from '../../menu/list_with_submenu.jsx';
import CalendarShareCalendar from '../calendarForms/calendarShareCalendar.jsx';
import CalendarDeleteCalendar from '../calendarForms/calendarDeleteCalendar.jsx';
import '../calendar.css';
import '../../menu/list_with_submenu.css';

const CalendarList = ({ groups }) => {
    const { openModal, closeModal } = useContext(ModalContext);
    const { permissions } = useContext(CalendarContext);

    // Open edit modal
    const onEdit = (groupUID) => {
        openModal("modal_close", {
            content: <></>,
            title: "Edit Calendar"
        })
    }

    // Open share modal
    const onShare = (groupUID) => {
        openModal("modal_close", {
            content: <CalendarShareCalendar selectedCalendarUID={groupUID} onCalendarShared={closeModal} />,
            title: "Share Calendar"
        })
    }

    // Open delete modal
    const onDelete = (groupUID) => {
        openModal("modal_close", {
            title: "Delete Calendar",
            content: <CalendarDeleteCalendar selectedCalendarUID={groupUID} onCalendarDeleted={closeModal} />,
        })
    }

    // Render icons area for each calendar item, with permission info for debugging
    const getIcons = (item) => {
        let permissionInfo = null;
        if (permissions && permissions.length > 0) {
            const found = permissions.find(p => p.groupUID === item.groupUID);
            if (found) {
                permissionInfo = (
                    <span style={{ fontSize: '0.95em', color: '#888', marginLeft: '0.3em' }}>
                        
                        {`(${found.permission})`}
                    </span>
                );
            }
        }
        return (
            <>
                {item.privacy === "public" && (
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.3em' }}>
                        <span className="material-symbols-outlined">group</span>
                        {permissionInfo}
                    </span>
                )}
            </>
        );
    };

    // Render dropdown menu for each calendar item
    const menuItems = (item) => (
        <>
            <div className="submenu-item" onClick={() => onEdit(item.groupUID)}>Edit</div>
            <div className="submenu-item" onClick={() => onShare(item.groupUID)}>Share</div>
            <div className="submenu-item" onClick={() => onDelete(item.groupUID)}>Delete</div>
        </>
    );

    return (
        <ListWithSubMenu
            items={groups}
            getTitle={item => item.title}
            getIcons={getIcons}
            menuItems={menuItems}
            getKey={item => item.groupUID}
        />
    );
};

export default CalendarList;