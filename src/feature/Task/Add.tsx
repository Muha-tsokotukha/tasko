import { useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Input, Modal } from "src/shared/ui";
import { addNewTask } from "src/store/boardSlice";

type Props = {
  columnId: number;
};

export const AddNewTask = ({ columnId }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setTitle("");
  };

  const onSubmit = () => {
    if (title.replace(" ", "") === "") return;

    dispatch(addNewTask({ title, columnId }));
    closeModal();
  };

  return (
    <div>
      <Button
        onClick={openModal}
        styles="bg-gradient-to-r from-purple-500 to-pink-500 py-2 px-4"
      >
        +task
      </Button>

      <Modal title="Add new task" isOpen={isModalOpen} onClose={closeModal}>
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
