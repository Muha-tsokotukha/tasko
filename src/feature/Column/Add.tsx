import { useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Input, Modal } from "src/shared/ui";
import { addColumn } from "src/store/boardSlice";

export const AddNewColumn = () => {
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

    dispatch(addColumn({ title }));
    closeModal();
  };

  return (
    <div>
      <Button onClick={openModal}>+column</Button>

      <Modal title="Add new column" isOpen={isModalOpen} onClose={closeModal}>
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
