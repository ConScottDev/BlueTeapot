import React from 'react';
import Select from 'react-select';
import { components } from 'react-select';

interface Participant {
  id: string;
  name: string;
  type: 'actor' | 'group';
}

interface GroupToggleProps {
  participants: Participant[];
  selectedParticipants: string[];
  onParticipantsChange: (selected: string[]) => void;
}

const GroupToggle: React.FC<GroupToggleProps> = ({ participants, selectedParticipants, onParticipantsChange }) => {
  const options = participants.map(participant => ({
    value: participant.id,
    label: `${participant.name} (${participant.type})`,
  }));

  const handleChange = (selectedOptions: any) => {
    const selectedValues = selectedOptions ? selectedOptions.map((option: any) => option.value) : [];
    onParticipantsChange(selectedValues);
  };

  const customStyles = {
    control: (provided: any) => ({
      ...provided,
      width: 300,
    }),
  };

  return (
    <div>
      <Select
        options={options}
        isMulti
        value={options.filter(option => selectedParticipants.includes(option.value))}
        onChange={handleChange}
        closeMenuOnSelect={false}
        hideSelectedOptions={false}
        styles={customStyles}
        components={{
          Option: props => (
            <div>
              <components.Option {...props}>
                <input
                  type="checkbox"
                  checked={props.isSelected}
                  onChange={() => null}
                />{' '}
                <label>{props.label}</label>
              </components.Option>
            </div>
          ),
        }}
      />
    </div>
  );
};

export default GroupToggle;
