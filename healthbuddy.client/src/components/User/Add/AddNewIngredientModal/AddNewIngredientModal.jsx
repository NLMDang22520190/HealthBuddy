import React, { useState, useEffect } from "react";
import { Modal } from "antd";
import { Label, TextInput } from "flowbite-react";

const AddNewIngredientModal = ({ open, onCancel, onUpdate }) => {
  const [ingredientName, setIngredientName] = useState("");
  const [unit, setUnit] = useState("");

  const handleAddClick = () => {
    if (!ingredientName || !unit) return;

    onUpdate({ id: Date.now(), name: ingredientName, unit, isNew: true });
    onCancel();
  };

  useEffect(() => {
    return () => {
      setIngredientName("");
      setUnit("");
    };
  }, [open]);

  return (
    <Modal
      open={open}
      onCancel={onCancel}
      title="Add new ingredient"
      centered
      footer={[
        <button
          onClick={onCancel}
          className="mr-2 items-center h-10 px-4 rounded-lg border-2 border-compleprimary-dark bg-white text-black 
              hover:bg-gradient-to-br hover:from-compleprimary-dark hover:to-complesecond-dark hover:text-white"
        >
          Cancel
        </button>,
        <button
          onClick={handleAddClick}
          className="items-center h-10 px-4 rounded-lg bg-gradient-to-br from-primary-dark to-secondary-dark text-white 
             hover:bg-gradient-to-br hover:from-secondary-dark hover:to-primary-dark"
        >
          Add
        </button>,
      ]}
    >
      <div className="grid grid-cols-2 gap-4">
        <TextInput
          className="bg-gray-200 flex-1 rounded-lg"
          placeholder="Ingredient's Name"
          type="text"
          value={ingredientName}
          onChange={(e) => setIngredientName(e.target.value)}
        />
        <TextInput
          className="bg-gray-200 flex-1 rounded-lg"
          placeholder="Unit"
          type="text"
          value={unit}
          onChange={(e) => setUnit(e.target.value)}
        />
      </div>
    </Modal>
  );
};

export default AddNewIngredientModal;
