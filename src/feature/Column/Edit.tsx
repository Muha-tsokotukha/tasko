import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { EditPenIcon } from "src/shared/icons/pen";
import { Button, Input, Modal } from "src/shared/ui";
import { editColumnTitle } from "src/store/boardSlice";

type Props = {
  title: string;
  columnId: number;
};

export const EditColumn = ({ title: defaultTitle = "", columnId }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState(defaultTitle);
  const dispatch = useDispatch();

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setTitle(defaultTitle);
  };

  const onSubmit = () => {
    if (title.replace(" ", "") === "") return;

    dispatch(editColumnTitle({ title, id: columnId }));
    closeModal();
  };

  useEffect(() => {
    setTitle(defaultTitle);
  }, [defaultTitle]);

  return (
    <div>
      <span onClick={openModal}>
        <EditPenIcon />
      </span>

      <Modal title="Edit column" isOpen={isModalOpen} onClose={closeModal}>
        <div className="grid gap-5">
          <Input
            onChange={(e) => setTitle(e.currentTarget.value)}
            value={title}
          />

          <div className="flex">
            <Button styles="flex-1 mr-5 bg-red-400" onClick={closeModal}>
              Cancel
            </Button>

            <Button styles="flex-1" onClick={onSubmit}>
              Save
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
