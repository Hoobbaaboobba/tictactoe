import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import Image from "next/image";
import ArcadeMap from "./ArcadeMap";

const ArcadeDrawer = () => {
  return (
    <Drawer>
      <DrawerTrigger>
        <Card className="w-[400px] group h-[200px] relative hover:border-yellow-400 transition">
          <CardContent className="flex justify-center items-center">
            <Image
              src={require("../../../../../public/arcade-image.png")}
              alt="rick and morty background"
              fill
              placeholder="blur"
              style={{ objectFit: "cover" }}
              className="rounded-md z-0 grayscale group-hover:grayscale-0 transition"
            />
          </CardContent>
          <CardFooter className="absolute rounded-b-md p-2 w-full flex justify-center items-center bottom-0 left-0 bg-white">
            <h1 className="z-20 text-black text-2xl font-semibold group-hover:text-black transition">
              Аркада
            </h1>
          </CardFooter>
        </Card>
      </DrawerTrigger>
      <DrawerContent className="w-full h-[95%] flex justify-start items-center">
        <ArcadeMap />
      </DrawerContent>
    </Drawer>
  );
};

export default ArcadeDrawer;
