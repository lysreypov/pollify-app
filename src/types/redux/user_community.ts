export interface Community {
  id: number;
  name: string;
  image: string;
}

export interface communityMember {
  id: number;
  email: string;
  username: string;
}

export interface UserCommunityState {
  id: number;
  community: Community[];
  email: string;
  username: string;
}

const UpdateUserCommunityAction = "User Community";

export default UserCommunityState;
export { UpdateUserCommunityAction };
