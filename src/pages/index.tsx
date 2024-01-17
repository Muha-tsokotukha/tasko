import { BoardWidget } from "src/widgets";

export const TaskBoardPage = () => {
  return (
    <div>
      <div className="px-10 py-5 bg-indigo-900 text-white">Todo board</div>
      <BoardWidget />
    </div>
  );
};
