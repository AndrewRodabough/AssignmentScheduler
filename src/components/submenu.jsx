const SubMenu = ({ groupUID, items }) => (
  <ul>
    {items.map(({ title, onClick }, index) => (
      <li key={index} onClick={() => onClick(groupUID)}>
        {title}
      </li>
    ))}
  </ul>
);

export default SubMenu;