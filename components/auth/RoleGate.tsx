"use client";

import { useCurrentUser } from "@/hooks/useCurrentUser";
import { UserRole } from "@prisma/client";

interface RoleGateProps {
  children: React.ReactNode;
  allowedRole: UserRole;
}

export const RoleFate = ({ children, allowedRole }: RoleGateProps) => {
  const user = useCurrentUser();
  if (user?.role !== allowedRole) {
  }
};
