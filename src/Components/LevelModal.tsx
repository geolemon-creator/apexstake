import React from "react";
import { levelID } from "./Type";
import Level from "./Level";

interface ModalProps {
  isModalOpen: boolean;
  handleCloseModal: () => void;
  level: Array<levelID>;
  selectedLevel: number | null;
  handleSelect: (id: number) => void;
}

const LevelModal: React.FC<ModalProps> = ({
  isModalOpen,
  handleCloseModal,
  level,
  selectedLevel,
  handleSelect,
}) => {
  if (!isModalOpen) return null;

  return (
    <div className="modal-overlay" onClick={handleCloseModal}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="levels-list">
          <button onClick={handleCloseModal} className="level-btn-win">
            Выбор уровня <span className="level-btn-win-arrow">&gt;</span>
          </button>

          {level.map((level) => (
            <Level
              selectedLevel={selectedLevel}
              onSelect={handleSelect}
              key={level.id}
              data={level}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LevelModal;
