import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useQuery } from "../../queryClient";
import fetch from "cross-fetch";

const fetchPosts = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  const data = await response.json();
  return data;
};

export const preload = async (queryClient) => {
  console.log("na clientu sam");
  await queryClient.prefetchQuery("posts", () => fetchPosts());
};

export const Component = () => {
  const [clientMessage, setClientMessage] = useState("");
  const { data } = useQuery("posts", () => fetchPosts());
  console.log("data", data);

  useEffect(() => {
    setClientMessage("Hello From React");
  });

  return (
    <>
      <Helmet>
        <title>{data[0].body}</title>
        <link rel="canonical" href="https://www.tacobell.com/" />
      </Helmet>
      <div>
        <h1>Hello Wodafdasrld!</h1>
        <h2>{clientMessage}</h2>
        {data.map((el) => (
          <div>{el.body}</div>
        ))}
      </div>
    </>
  );
};
