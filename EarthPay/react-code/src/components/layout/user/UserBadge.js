import React from "react";

const UserBadge = ({ userName, userImage, uid, onUserClick }) => {
  return (
    <div
      style={{ textAlign: "center", cursor: "pointer", margin: 10 }}
      onClick={() => onUserClick && onUserClick(uid, userName, userImage)}
    >
      <img
        src={userImage}
        alt={userName}
        style={{
          width: 58,
          borderRadius: 50,
          height: 58,
          margin: 10,
        }}
      />
      <p>{userName}</p>
    </div>
  );
};

export default UserBadge;
