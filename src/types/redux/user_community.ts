export interface Community {
  id: number;
  name: string;
  description: string;
}

export interface UserCommunitySate {
  id: number;
  community: Community[];
  email: string;
  username: string;
}

const UpdateUserCommunityAction = "User Community";

export default UserCommunitySate;
export { UpdateUserCommunityAction };
