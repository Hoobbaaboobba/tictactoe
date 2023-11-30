"use client";

import {
  useSessionContext,
  useSupabaseClient,
} from "@supabase/auth-helpers-react";
import Modal from "./Modal";
import { useRouter } from "next/navigation";

import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import useAuthModal from "@/hooks/useAuthModal";
import { useEffect } from "react";
import { useUser } from "@/hooks/useUser";

const AuthModal = () => {
  const supabaseClient = useSupabaseClient();
  const router = useRouter();
  const { session } = useSessionContext();
  const { onClose, isOpen, onOpen } = useAuthModal();
  const { user } = useUser();

  useEffect(() => {
    if (session && user) {
      onClose();
      router.refresh();
    }
  }, [session, router, onClose]);

  const onChange = (open: boolean) => {
    if (!user) {
      onOpen();
    }
  };
  return (
    <Modal
      title="Снова рад тебя видеть!"
      description="Войди в аккаунт, чтобы продолжить"
      isOpen={isOpen}
      onChange={onChange}
    >
      <Auth
        supabaseClient={supabaseClient}
        providers={[]}
        appearance={{
          theme: ThemeSupa,
        }}
      />
    </Modal>
  );
};

export default AuthModal;
