import RoundGraph from '../RoundGraph/RoundGraph';
import { levelsAdditional } from '../SelectLevelModal/LevelItem/LevelAdditional';
import { LevelData } from '../Type';
import closeIcon from '../../Img/close.svg';
import { useTranslation } from 'react-i18next';

interface LevelDetailInfoProps {
  level: LevelData; // Ваш тип данных для уровня
  onClose: () => void;
}

const LevelDetailInfo = ({ level, onClose }: LevelDetailInfoProps) => {
  const { t } = useTranslation();

  return (
    <div className="basic-lvl-div">
      <div className="close-btn-wrapper">
        <img
          src={closeIcon}
          alt="close"
          onClick={onClose}
          className="close-icon"
        />
      </div>
      <div className="bas-nor-block">
        <div className="title-lvl-div">
          <p className="basic-lvl-p">{t('level_info_title')}</p>
          <div className="title-lvl-ab-div">
            <img
              className="lvl-img"
              src={levelsAdditional[level.level]?.icon}
              alt="diamond"
            />
            <p className="lvl-p">{t(levelsAdditional[level.level]?.title)}</p>
          </div>
        </div>
        <RoundGraph progress={Math.min(level.full_rate, 100)}>
          <text
            x="50%"
            y="50%"
            textAnchor="middle"
            fontWeight="600"
            dominantBaseline="middle"
            fontSize="18"
            fill="white"
            style={{ letterSpacing: '1px' }}
          >
            +{level.full_rate}%
          </text>
        </RoundGraph>
      </div>
      <div className="data-lvl-div">
        <div className="data-lvl-text">
          <p className="data-lvl-first-p">{t('date_of_bet')}</p>
          <p className="data-lvl-second-p">
            {new Date(level.start_date)
              .toLocaleDateString('ru-RU')
              .replace(/\./g, '-')}
          </p>
        </div>

        <div className="data-lvl-text">
          <p className="data-lvl-first-p">{t('interest_period')}</p>
          <p className="data-lvl-second-p">
            {/* TODO: Указать значения */}
            {level.stage.staking_time}{' '}
            {level.stage.staking_time === 1 ? t('day') : t('days')}
          </p>
        </div>

        <div className="data-lvl-text big-p">
          <p className="data-lvl-first-p">
            <span
              dangerouslySetInnerHTML={{ __html: t('end_date_of_interest') }}
            />
          </p>
          <p className="data-lvl-second-p">
            {new Date(level.end_date)
              .toLocaleDateString('ru-RU')
              .replace(/\./g, '-')}
          </p>
        </div>

        <div className="data-lvl-text">
          <p className="data-lvl-first-p">{t('repayment_term')}</p>
          <p className="data-lvl-second-p">
            {level.stage.staking_time}{' '}
            {level.stage.staking_time === 1 ? t('day') : t('days')}
          </p>
        </div>

        <div className="data-lvl-text">
          <p className="data-lvl-first-p">{t('repayment_date')}</p>
          <p className="data-lvl-second-p">
            {new Date(level.end_date)
              .toLocaleDateString('ru-RU')
              .replace(/\./g, '-')}
          </p>
        </div>

        <div className="data-lvl-text">
          <p className="data-lvl-first-p">{t('interest_rate')}</p>
          <p className="data-lvl-second-p">{Math.round(level.percentage)}%</p>
        </div>
      </div>
    </div>
  );
};

export default LevelDetailInfo;
