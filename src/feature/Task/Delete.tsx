import { useDispatch } from "react-redux";
import { TrashIcon } from "src/shared/icons/trash";
import { deleteTask } from "src/store/boardSlice";

type Props = {
  id: number;
  columnId: number;
};

export const DeleteTask = ({ id, columnId }: Props) => {
  const dispatch = useDispatch();

  return (
    <span onClick={() => dispatch(deleteTask({ id, columnId }))}>
      <TrashIcon />
    </span>
  );
};
