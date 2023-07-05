import React from "react";
import { useQuery } from "react-query";
import Ellipse1008 from "../../../assets/community/Ellipse1008.png";
import Ellipse10010 from "../../../assets/community/Ellipse10010.png";
import Ellipse10011 from "../../../assets/community/Ellipse10011.png";
import Ellipse1009 from "../../../assets/community/Ellipse1009.png";

interface Community {
  id: number;
  communityName: string;
}

interface FavoriteProps {
  searchQuery: string;
}

function Favorite({ searchQuery }: FavoriteProps) {
  const { data, isLoading, isError, error } = useQuery<Community[]>(
    "communityData",
    () =>
      fetch("http://13.251.127.67:8080/api/v1/community/all", {
        headers: {
          Authorization:
            "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ5YW1hIiwiZXhwIjoxNjg4MTI4ODUwfQ.Jdh6x3kk9slMIDqY5leQIpG-T5lMEc8-BojUwq5brzfaIYIW-oEf3UmQefNJOc7dS30iZI0U-333nyDm0-9c4Q",
        },
      })
        .then((response) => response.json())
        .then((data) => data)
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {(error as Error)?.message}</div>;
  }

  const favorites = [
    { image: Ellipse1008, name: "Party" },
    { image: Ellipse10010, name: "Game Ball Weekend" },
    { image: Ellipse10011, name: "Tv Phum C Ey" },
    { image: Ellipse1009, name: "Saturday Phirk" },
  ];

  // const filteredFavorites = favorites.filter((favorite) =>
  //   favorite.name.toLowerCase().includes(searchQuery.toLowerCase())
  // );

  return (
    <div className="profile flex flex-col gap-y-4 ml-5 mr-5">
      {data?.map((community) => (
        <div className="flex" key={community.id}>
          <img
            src={community.communityName}
            alt={`Community ${community.id}`}
            className="w-8 h-8 rounded-full mr-2 border-2 border-blue-500"
          />
          <h1>{community.communityName}</h1>
        </div>
      ))}
    </div>
  );
}

export default Favorite;
