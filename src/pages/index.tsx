import { BoardWidget } from "src/widgets";

export const TaskBoardPage = () => {
  return (
    <div className="font-sans">
      <header className="bg-gradient-to-r from-teal-500 to-blue-500 text-white py-4 px-8">
        <h1 className="text-2xl font-bold">Todo Board</h1>
      </header>

      <BoardWidget />
    </div>
  );
};
