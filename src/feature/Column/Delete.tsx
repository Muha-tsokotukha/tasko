import { useDispatch } from "react-redux";
import { TrashIcon } from "src/shared/icons/trash";
import { deleteColumn } from "src/store/boardSlice";

type Props = {
  id: number;
};

export const DeleteColumn = ({ id }: Props) => {
  const dispatch = useDispatch();

  return (
    <span onClick={() => dispatch(deleteColumn({ id }))}>
      <TrashIcon />
    </span>
  );
};
