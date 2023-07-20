interface Option {
  percentage: number;
  id: number;
  optionText: string;
}

interface User {
  id: number;
  username: string;
  email: string;
  createdAt: string;
  createdBy: string;
  updatedAt: string;
  updatedBy: string;
  verified: boolean;
}

export interface Poll {
  duration: string;
  hasVoted: boolean;
  pollDate: string;
  options: Option[];
  id: number;
  pollQuestion: string;
  limitVote: number;
  user: User;
  votedOn: number;
  totalVote: number;
}

interface CreatePollState {
  isCreatePollPopupOpen: boolean;
  polls: Poll[];
  pollCommunityId: string | null;
}

export default CreatePollState;
