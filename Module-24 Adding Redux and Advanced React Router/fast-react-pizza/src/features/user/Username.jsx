import React from "react";
import { useSelector } from "react-redux";

function Username() {
  const username=useSelector((store)=>{
    return store.user.username;
  });
  if(!username)
  {
    return null;
  }
  return <div className="hidden text-sm font-semibold md:block">{username}</div>;
}

export default Username;
