// components/TransactionFilters.tsx
import React, { RefObject } from 'react';
import Select from 'antd/es/select';
import calendar from '../assets/calendar.svg';

interface Props {
  openDateBtn: boolean;
  dropdownRef: RefObject<HTMLDivElement>;
  onDateToggle: () => void;
}

const TransactionFilters: React.FC<Props> = ({
  openDateBtn,
  dropdownRef,
  onDateToggle,
}) => (
  <div className="hist-btn-main-div">
    <div className="hist-btn-div">
      <Select
        defaultValue="Все"
        popupClassName="custom-dropdown"
        className="custom-select"
        options={[
          { value: 'Все', label: <span>Все</span> },
          { value: 'Пополнения', label: <span>Пополнения</span> },
          { value: 'Начисления', label: <span>Начисления</span> },
          { value: 'Прибыли', label: <span>Прибыли</span> },
          { value: 'Выводы', label: <span>Выводы</span> },
        ]}
      />

      <div className="his-date-btn-div" ref={dropdownRef}>
        <button className="his-date-btn">
          <img
            onClick={onDateToggle}
            className="his-date-btn-img"
            src={calendar}
            alt="calendar"
          />
        </button>

        {openDateBtn && (
          <div className="dropdown-menu">
            <div className="hist-btn-day-div">
              <div className="hist-btn-day-flex-div">
                <button className="hist-btn-day">1 день</button>
                <button className="hist-btn-day">1 неделя</button>
                <button className="hist-btn-day">1 месяц</button>
              </div>
            </div>

            <div className="hist-btn-date-div">
              <div className="hist-btn-day-flex-div">
                <button className="hist-btn-day">15-01-2025</button>
                <p className="hist-btn-p">По</p>
                <button className="hist-btn-day">15-01-2025</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  </div>
);

export default TransactionFilters;
