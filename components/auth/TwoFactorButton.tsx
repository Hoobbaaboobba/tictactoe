"use client";

import { profile } from "@/actions/profile";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { Switch } from "../ui/switch";

interface Props {
  isTwoFactor: boolean;
}

const TwoFactorButton = ({ isTwoFactor }: Props) => {
  const router = useRouter();
  const onClick = () => {
    profile({
      isTwoFactorEnabled: !isTwoFactor,
    });
    router.refresh();
  };

  return <Switch checked={isTwoFactor} onCheckedChange={onClick} />;
};

export default TwoFactorButton;
