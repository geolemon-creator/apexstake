import {
  FrendID,
  levelID,
  MediaID,
  TansactionsID,
  TermsID,
  TransactionData,
} from './Type';
import { LeaderID } from './Type';
import leadava from './../Img/avatarlead.png';
import primaryDiamond from './../Img/diamonds/diamond-primary.svg';
import mediumDiamond from './../Img/diamonds/diamond-medium.svg';
import advancedDiamond from './../Img/diamonds/diamond-advanced.svg';
import expertDiamond from './../Img/diamonds/diamond-expert.svg';
import inSchedule from './../Img/inSchedule.svg';
import midlSchedule from './../Img/midSchedule.svg';
import advSchedule from './../Img/advSchedule.svg';
import expSchedule from './../Img/expSchedule.svg';
import transWallet from './../Img/transWallet.svg';
import ava from './../Img/avatar.svg';
import telegram from './../Img/telegram.svg';
import x from './../Img/X.svg';
import youtube from './../Img/youtube.svg';

export const Frend: FrendID[] = [
  {
    id: 1,
    img: ava,
    title: 'Alexy',
    coins: 599740,
    bonus: +1500,
    ton: 124,
  },
];

export const leader: LeaderID[] = [
  {
    id: 1,
    img: leadava,
    title: 'Shun',
    coins: 99740,
    bonus: +2500,
    ton: 134,
  },

  {
    id: 2,
    img: leadava,
    title: 'Shun',
    coins: 99740,
    bonus: +2500,
    ton: 134,
  },

  {
    id: 3,
    img: leadava,
    title: 'Shun',
    coins: 299740,
    bonus: +2500,
    ton: 134,
  },

  {
    id: 4,
    img: leadava,
    title: 'Shun1',
    coins: 299740,
    bonus: +2500,
    ton: 134,
  },

  {
    id: 5,
    img: leadava,
    title: 'Shun',
    coins: 99740,
    bonus: +2500,
    ton: 134,
  },

  {
    id: 6,
    img: leadava,
    title: 'Shun',
    coins: 99740,
    bonus: +2500,
    ton: 134,
  },

  {
    id: 7,
    img: leadava,
    title: 'Shun',
    coins: 99740,
    bonus: +2500,
    ton: 134,
  },

  {
    id: 8,
    img: leadava,
    title: 'Shun',
    coins: 99740,
    bonus: +2500,
    ton: 134,
  },

  {
    id: 9,
    img: leadava,
    title: 'Shun',
    coins: 99740,
    bonus: +2500,
    ton: 134,
  },

  {
    id: 10,
    img: leadava,
    title: 'Shun',
    coins: 99740,
    bonus: +2500,
    ton: 134,
  },

  {
    id: 11,
    img: leadava,
    title: 'Shun',
    coins: 99740,
    bonus: +2500,
    ton: 134,
  },

  {
    id: 12,
    img: leadava,
    title: 'Shun',
    coins: 99740,
    bonus: +2500,
    ton: 134,
  },

  {
    id: 13,
    img: leadava,
    title: 'Shun',
    coins: 99740,
    bonus: +2500,
    ton: 134,
  },

  {
    id: 14,
    img: leadava,
    title: 'Shun',
    coins: 99740,
    bonus: +2500,
    ton: 134,
  },

  {
    id: 15,
    img: leadava,
    title: 'Shun',
    coins: 99740,
    bonus: +2500,
    ton: 134,
  },

  {
    id: 16,
    img: leadava,
    title: 'Shun',
    coins: 99740,
    bonus: +2500,
    ton: 134,
  },

  {
    id: 17,
    img: leadava,
    title: 'Shun',
    coins: 99740,
    bonus: +2500,
    ton: 134,
  },
];

export const level: levelID[] = [
  {
    id: 1,
    title: 'Начальный',
    percent: 5,
    img: primaryDiamond,
    schedule: inSchedule,
    ton: 50,
  },

  {
    id: 2,
    title: 'Средний',
    percent: 44,
    img: mediumDiamond,
    schedule: midlSchedule,
    ton: 100,
  },

  {
    id: 3,
    title: 'Продвинутый',
    percent: 10,
    img: advancedDiamond,
    schedule: advSchedule,
    ton: 150,
  },

  {
    id: 4,
    title: 'Эксперт',
    percent: 140,
    img: expertDiamond,
    schedule: expSchedule,
    ton: 250,
  },
];

export const Terms: TermsID[] = [
  {
    id: 1,
    date: 15_03_2025,
    period: '1 день',
    ending: 15_03_2025,
    repayment: 15_03_2025,
    dateRepayment: '1 день',
    bid: 140,
    ton: '1,49959500 TON',
  },
];

export const media: MediaID[] = [
  {
    id: 1,
    title: 'Подпишитесь на канал в Telegram',
    coin: 10,
    img: telegram,
  },

  {
    id: 2,
    title: 'Подпишитесь на канал в X',
    coin: 10,
    img: x,
  },

  {
    id: 3,
    title: 'Поделитесь кампанией в своей истории в X',
    coin: 10,
    img: x,
  },

  {
    id: 4,
    title: 'Подпишитесь на канал в  You Tube',
    coin: 10,
    img: youtube,
  },
];
