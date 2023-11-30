"use client";

import AuthModal from "@/components/AuthModal";
import Modal from "@/components/Modal";
import useAuthModal from "@/hooks/useAuthModal";
import { useUser } from "@/hooks/useUser";
import { useEffect, useState } from "react";

const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);
  const { onOpen } = useAuthModal();

  const { user } = useUser();

  useEffect(() => {
    setIsMounted(true);
    if (!user) {
      onOpen();
    }
  }, [onOpen]);

  if (!isMounted) {
    return null;
  }
  return (
    <>
      <AuthModal />
    </>
  );
};

export default ModalProvider;
