import React from "react";
import useFetch from "../Components/useFetch";
import SingleFetchUser from "./SingleFetchUser";
import TopbarPage from "../Components/TopbarPage";

const FetchUsers = () => {
  const url = "https://reqres.in/api/users?page=2";
  const [result, error, isLoading] = useFetch(url);

  if (isLoading) return <h2>Loading...</h2>;

  return (
    <>
      <TopbarPage />
      <div className="fetch-users mt-5">
        <div className="card">
          {error && <p>Error: {error}</p>}

          {result &&
            result.data.map((user) => (
              <SingleFetchUser key={user.id} result={user} />
            ))}
        </div>
      </div>
    </>
  );
};

export default FetchUsers;
