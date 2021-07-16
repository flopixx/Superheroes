import React from "react";

const Error = ({ mensaje }) => {
  return (
    <div class="alert alert-danger mt-5 text-center w-100" role="alert">
      <p className="red darken-4 error text-uppercase">{mensaje}</p>
    </div>
  );
};

export default Error;
