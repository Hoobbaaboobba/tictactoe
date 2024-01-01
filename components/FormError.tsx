import { AlertCircle } from "lucide-react";

interface FormErrorProps {
  message?: string;
}

export const FormError = ({ message }: FormErrorProps) => {
  if (!message) {
    return null;
  }

  return (
    <div className="bg-destructive/10 dark:bg-rose-500 p-3 rounded-md flex items-center text-sm gap-x-2 text-destructive">
      <AlertCircle className="h-4 w-4" />
      <p>{message}</p>
    </div>
  );
};
