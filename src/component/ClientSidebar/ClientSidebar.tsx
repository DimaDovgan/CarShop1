import React from 'react';


// import  ClientChat  from '../ClientPages/Chat';

interface SidebarProps {
    onSelect: (page: string | null) => void;
  }

const ClientSidebar: React.FC<SidebarProps> = ({ onSelect }) => (
    <div className="sidebar">
      <ul>
        <li onClick={() => onSelect("PersonalCabinet")}>Особистий кабінет</li>
        <li onClick={() => onSelect("MyAvb")}>Мої оголошення</li>
        <li onClick={() => onSelect("ClientChat")}>Чат</li>
      </ul>
    </div>
  );
  

export default ClientSidebar;