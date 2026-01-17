export default interface User {
  id: string;
  email: string;
  name?: string;
  enabled: boolean;
  image?: string;
  updatedAt?: Date;
  createdAt?: Date;
  provider: string;
}