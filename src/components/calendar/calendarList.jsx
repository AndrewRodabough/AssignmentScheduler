import React, { useContext } from 'react';
import ModalContext from '../../context/modalContext';
import ListWithSubMenu from '../list_with_submenu';
import CalendarShareCalendar from './calendarShareCalendar';
import CalendarDeleteCalendar from './calendarDeleteCalendar';
import './calendar.css';

const CalendarList = ({ groups }) => {

    const { openModal, closeModal } = useContext(ModalContext);

    // Open edit modal
    const onEdit = () => {
        openModal("modal_close", {
            content: <></>,
            title: "Edit Calendar"
        })
    }

    // Open share modal
    const onShare = () => {
        openModal("modal_close", {
            content: <CalendarShareCalendar onCalendarShared={closeModal} />,
            title: "Share Calendar"
        })
    }

    // Open delete modal
    const onDelete = () => {
        openModal("modal_close", {
            title: "Delete Calendar",
            content: <CalendarDeleteCalendar onCalendarDeleted={closeModal} />,
        })
    }

    const subMenuItems=[
        { title: "Edit", onClick: (uid) => onEdit(uid) },
        { title: "Share", onClick: (uid) => onShare(uid) },
        { title: "Delete", onClick: (uid) => onDelete(uid) }
    ]

    return (
        <ListWithSubMenu
            items={groups}
            subMenuItems={subMenuItems}
        />
    )
};

export default CalendarList;