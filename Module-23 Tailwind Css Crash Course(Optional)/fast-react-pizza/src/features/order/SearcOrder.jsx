import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { useSearchParams } from 'react-router-dom'

function SearcOrder() {
  const [query, setquery] = useState("");
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query.length) {
      return;
    }
    navigate(`/order/${query}`);
    setquery("");
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search Order #"
        value={query}
        onChange={(e) => {
          setquery(e.target.value);
        }}
        className="w-28 rounded-full px-4 py-2 text-sm placeholder:text-stone-400 focus:w-72 sm:w-64 transition-all duration-300 focus:outline-none focus:ring focus:ring-yellow-500 "
      />
    </form>
  );
}

export default SearcOrder;
