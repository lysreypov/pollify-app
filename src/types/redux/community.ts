// Define state action

export interface User {
  id: number;
  username: string;
  email: string;
  role: string;
}

interface CommunitySate {
  userCommunity: number;
  communityName: string;
  inCommunityId: number;
  searchTerm: string;
  isCreateCommunityOpen: boolean;
  isBackToCommunity: boolean;
  isCommunityProfileOpen: boolean;
  userData: User[];
  invitedUsers: User[];
  communityMembers: User[];
  isOpenUserProfileMobile: boolean;
}

const UpdateCommunityAction = "Community";

export default CommunitySate;
export { UpdateCommunityAction };
