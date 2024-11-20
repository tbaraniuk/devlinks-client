export type LinkType = {
  platform: string;
  link: string;
};

export type UserType = {
  id: string | null;
  username: string;
  password: string;
  first_name: string | null;
  last_name: string | null;
  email: string | null;
  avatar_id: string | null;

  links: LinkType[];
};

export type UserLoginDataType = {
  username: string;
  password: string;
};

export type UserRegisterDataType = {
  email: string;
  username: string;
  password: string;
};

export type UserUpdateDataType = {
  first_name: string;
  last_name: string;
  email: string;
  file: File | null;
};

export type TokenType = {
  access_token: string;
  type: string;
};
