import React from "react";
import Avatar from "../../../assets/userProfile/Avatar.png";
import Avatar1 from "../../../assets/userProfile/Avatar-1.png";
import Avatar2 from "../../../assets/userProfile/Avatar-2.png";
import Avatar3 from "../../../assets/userProfile/Avatar-3.png";
import Avatar4 from "../../../assets/userProfile/Avatar-4.png";
import Avatar5 from "../../../assets/userProfile/Avatar-5.png";
import Avatar6 from "../../../assets/userProfile/Avatar-6.png";
import Avatar7 from "../../../assets/userProfile/Avatar-7.png";
import Avatar8 from "../../../assets/userProfile/Avatar-8.png";
import Avatar9 from "../../../assets/userProfile/Avatar-9.png";

interface Profile {
  id: number;
  name: string;
  avatar: string;
}

const items: Profile[] = [
  {
    id: 1,
    name: "Allan Gislason IV",
    avatar: Avatar,
  },
  {
    id: 2,
    name: "Jasmine King",
    avatar: Avatar1,
  },
  {
    id: 3,
    name: "Desiree Prohaska ll",
    avatar: Avatar2,
  },
  {
    id: 4,
    name: "Tracy Jaskolki",
    avatar: Avatar3,
  },
  {
    id: 5,
    name: "Sherri Beier",
    avatar: Avatar4,
  },
  {
    id: 6,
    name: "Donald Considine",
    avatar: Avatar5,
  },
  {
    id: 7,
    name: "Erick Stracke l",
    avatar: Avatar6,
  },
  {
    id: 8,
    name: "Eric Stehr DVM",
    avatar: Avatar7,
  },
  {
    id: 9,
    name: "Aaron Collier",
    avatar: Avatar8,
  },
  {
    id: 10,
    name: "Terence Kovacek",
    avatar: Avatar9,
  },
];

function CommunityMembers() {
  return (
    <div className="profile flex flex-col gap-y-4">
      {items.map((item) => (
        <div className="profile-line flex flex-col gap-y-3" key={item.id}>
          <div className="ml-5 flex">
            <img
              src={item.avatar}
              alt="Profile 1"
              className="w-8 h-8 rounded-full mr-2 border-2 border-blue-500"
            />
            <h1>{item.name}</h1>
          </div>
          <div className="border-t transp border-gray-300 w-5/6 ml-4"></div>
        </div>
      ))}
    </div>
  );
}

export default CommunityMembers;
