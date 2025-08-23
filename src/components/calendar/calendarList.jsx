import React, { useContext } from 'react';
import ModalContext from '../../context/modalContext';
import ListWithSubMenu from '../list_with_submenu';
import CalendarShareCalendar from './calendarShareCalendar';
import CalendarDeleteCalendar from './calendarDeleteCalendar';
import './calendar.css';

const CalendarList = ({ groups }) => {

    const { openModal, closeModal } = useContext(ModalContext);

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

    const subMenuItems=[
        { title: "Edit", onClick: (groupUID) => onEdit(groupUID) },
        { title: "Share", onClick: (groupUID) => onShare(groupUID) },
        { title: "Delete", onClick: (groupUID) => onDelete(groupUID) }
    ]

    return (
        <ListWithSubMenu
            items={groups}
            subMenuItems={subMenuItems}
        />
    )
};

export default CalendarList;