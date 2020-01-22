export interface User {
  _id: string;
  username: string;
  display_name: string;
  avatar: string;
  friends: [];
  rooms: [];
  status: boolean;
}
