const SubMenu = ({ uid, items }) => (
  <ul>
    {items.map(({ title, onClick }, index) => (
      <li key={index} onClick={() => onClick(uid)}>
        {title}
      </li>
    ))}
  </ul>
);

export default SubMenu;