import "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    name: string;
    email: string | null;
    username: string;
    avatar_url: string | null;
  }
}
