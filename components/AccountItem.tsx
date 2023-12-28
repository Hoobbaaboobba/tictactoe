import { UserButton, auth, clerkClient, currentUser } from "@clerk/nextjs";
const AccountItem = async () => {
  return (
    <>
      <UserButton afterSignOutUrl="/" />
      {/* <DropdownMenu>
        <DropdownMenuTrigger>
          <div className="flex gap-4 justify-center items-center">
            <div className="flex flex-col justify-start items-start">
              <h1 className="text-lg font-bold dots">Alex</h1>
              <p className="opacity-50 text-sm">
                Рейтинг: <span>1</span>
              </p>
            </div>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-[150px]">
          <DropdownMenuItem className="text-lg">
            <Button className="w-full">Играть</Button>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="text-md">Профиль</DropdownMenuItem>
          <DropdownMenuItem className="text-md">Пригласить</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="text-md"></DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu> */}
    </>
  );
};

export default AccountItem;
