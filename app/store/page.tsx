import { Button } from "@/components/ui/button";
import { Clock, Instagram, Twitch, Twitter } from "lucide-react";
import Link from "next/link";

const ShopPage = () => {
  return (
    <div className="w-full flex justify-center items-center">
      <div className="max-w-[1300px] w-full px-4 flex flex-col gap-4 justify-center items-center">
        <div className="flex gap-2 text-3xl mt-16 justify-center items-center font-bold">
          <h1>Скоро откроется</h1>
          <Clock size={24} strokeWidth={3} />
        </div>
        <div className="flex gap-2">
          <Button variant="secondary" size="icon" asChild>
            <Link href="https://vk.com/id753735974" className="font-bold">
              VK
            </Link>
          </Button>
          <Button variant="secondary" size="icon" asChild>
            <Link href="https://vk.com/id753735974">
              <Instagram />
            </Link>
          </Button>
          <Button variant="secondary" size="icon" asChild>
            <Link href="https://vk.com/id753735974">
              <Twitter />
            </Link>
          </Button>
          <Button variant="secondary" size="icon" asChild>
            <Link href="https://vk.com/id753735974">
              <Twitch />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ShopPage;
