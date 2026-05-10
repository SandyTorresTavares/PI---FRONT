export type UserProfile = {
	id: number;
	email: string;
	name?: string;
};

export type ProfileResponse = {
	message: string;
	user: UserProfile;
};

export type AuthResponse = {
  message: string;
  token: string;
};
