import { UserType } from "./users";

export type RouteAuthType = UserType | "all" | "guest";

export interface AuthorizationProps {
  allowedRoles: RouteAuthType[];
  isAdditionalAuthRequired?: boolean;
}

export interface PrivateRouteProps extends AuthorizationProps {
  location: string | number;
  modalMessage?: string;
  isAdditionalAuthRequired?: boolean;
}
