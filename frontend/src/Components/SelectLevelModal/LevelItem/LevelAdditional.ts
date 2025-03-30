import primaryDiamondIcon from '../../../Img/diamonds/diamond-primary.svg';
import mediumDiamondIcon from '../../../Img/diamonds/diamond-medium.svg';
import advancedDiamondIcon from '../../../Img/diamonds/diamond-advanced.svg';
import expertDiamondIcon from '../../../Img/diamonds/diamond-expert.svg';

export const levelsAdditional: Record<
  number,
  { title: string; icon: string; color: string }
> = {
  1: { title: 'Начальный', icon: primaryDiamondIcon, color: '#DEDEDE' },
  2: { title: 'Средний', icon: mediumDiamondIcon, color: '#FFDE45' },
  3: { title: 'Продвинутый', icon: advancedDiamondIcon, color: '#0C9AFF' },
  4: { title: 'Эксперт', icon: expertDiamondIcon, color: '#AC5FFF' },
};
