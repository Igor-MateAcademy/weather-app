import React, { useState } from 'react';

// components
import { Modal, Text, Input, Select } from 'components';

// utils
import { cities } from 'utils';

interface Props {
  children: React.ReactNode;
}

const CreateUserModal: React.FC<Props> = ({ children }) => {
  const [city, setCity] = useState<string>(cities[0]);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const onToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {React.cloneElement(children as React.ReactElement<any>, {
        onClick: onToggle,
      })}

      <Modal open={isOpen} onToggle={onToggle} className="p-4">
        <h2 className="mb-4 text-xl text-center">
          <Text>Add new user</Text>
        </h2>

        <Input label="First Name" required />

        <Input label="Last Name" required />

        <Input label="Birthday" required />

        <Select value={city} label="City" options={cities} onSelect={setCity} required />
      </Modal>
    </>
  );
};

export default CreateUserModal;
