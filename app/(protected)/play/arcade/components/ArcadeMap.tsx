import { Button } from "@/components/ui/button";

const levels = [
  {
    id: 1,
  },
  {
    id: 2,
  },
  {
    id: 3,
  },
  {
    id: 4,
  },
  {
    id: 5,
  },
  {
    id: 6,
  },
  {
    id: 7,
  },
  {
    id: 8,
  },
  {
    id: 9,
  },
  {
    id: 10,
  },
];

const ArcadeMap = () => {
  return (
    <div className="mt-6 w-[400px] grid grid-cols-4 gap-4">
      {levels.map((level) => (
        <Button
          className={`h-20 w-full text-lg font-semibold`}
          variant={`${level.id === 1 ? "gold" : "secondary"}`}
        >
          {level.id}
        </Button>
      ))}
    </div>
  );
};

export default ArcadeMap;
