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
      />
    </form>
  );
}

export default SearcOrder;
