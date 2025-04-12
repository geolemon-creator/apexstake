import diamondPrimary from '../../Img/diamonds/diamond-primary.svg';
import diamondMedium from '../../Img/diamonds/diamond-medium.svg';
import diamondAdvanced from '../../Img/diamonds/diamond-advanced.svg';
import diamondExpert from '../../Img/diamonds/diamond-expert.svg';
import arrowRight from '../../Img/arrow-right.svg';

import styles from './AboutModal.module.css';

type AboutModalProps = {
  onClose: () => void;
};

const AboutModal = ({ onClose }: AboutModalProps) => {
  return (
    <div className={styles.AboutModalOverlay}>
      <div className={styles.AboutModalContainer}>
        <img
          src={arrowRight}
          alt="back-arrow"
          className={styles.CloseIcon}
          onClick={onClose}
        />
        <div className={styles.AboutContent}>
          <h1
            style={{
              textAlign: 'center',
              color: '#dedede',
              marginTop: '-1px',
              marginBottom: '0px',
            }}
          >
            ApexStake
          </h1>
          <p
            style={{ fontSize: '10px', marginTop: '-1px', textAlign: 'center' }}
          >
            Платформа для мультичейн-стейкинга
          </p>
          <div>
            <h1>1. Введение в проект</h1>
            <p>
              ApexStake - это инновационная экосистема стейкинга, которая
              стартует на блокчейне TON и со временем охватит Solana, XRP, LTC и
              другие сети. <br /> Платформа предлагает{' '}
              <span>уровневую систему</span> с высокой доходностью на старте и
              постепенным снижением ставок через механизм <span>халвингов</span>
              . <br /> Так создается долгосрочная и честная модель, <br /> где
              зарабатывают как пользователи, так и команда.
            </p>
          </div>
          <div>
            <h1>1.1 Наша миссия</h1>
            <ul>
              <li>
                Дать каждому простой и безопасный способ получать пассивный
                доход в криптовалюте.
              </li>
              <li>
                Стать <span>мировым лидером</span> в области
                мультичейн-стейкинга, совмещая удобство, геймификацию,
                реферальные программы, NFT-бонусы и собственный токен{' '}
                <span>Apexst</span>.
              </li>
            </ul>
          </div>
          <div>
            <h1>1.2 Почему именно стейкинг?</h1>
            <ul>
              <li>
                <span>Самый стабильный инструмент</span> в крипте: прибыль идёт
                ежедневно и не зависит от курсовых скачков, как при трейдинге.
              </li>
              <li>
                Механика похожа на <span>банковский вклад</span>, но без
                посредников и с более высоким процентом.
              </li>
              <li>
                <span>Глобальный тренд:</span> многие страны (включая США) уже
                обсуждают стейкинг на государственном уровне.
              </li>
            </ul>
          </div>
          <hr />
          <div>
            <h1>2. Уровневая система</h1>
            <p>
              Мы предлагаем 4 уровня, которые различаются{' '}
              <span>минимальным депозитом</span>, <span>дневной ставкой </span>{' '}
              и <span>премиальными бонусами</span>.
            </p>
          </div>
          <div>
            <h1>2.1 Стартовые условия (без учета халвингов)</h1>
            <div className={styles.AboutTableWrapper}>
              <table className={styles.AboutTableDiamonds}>
                <tr>
                  <th>
                    <p>Уровень</p>
                  </th>
                  <th>
                    <p>Сумма (TON)</p>
                  </th>
                  <th>
                    <p>% в день</p>
                  </th>
                  <th>
                    <p>
                      Прибыль за 120 дней
                      <br />
                      (примерно)
                    </p>
                  </th>
                </tr>
                <tr>
                  <td>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      <span style={{ color: '#dedede', marginRight: '5px' }}>
                        1
                      </span>
                      <img
                        src={diamondPrimary}
                        alt="diamond-primary"
                        width={20}
                        height={20}
                        style={{ marginRight: '5px' }}
                      />
                    </div>
                  </td>
                  <td style={{ color: '#dedede' }}>
                    <p>100–300</p>
                  </td>
                  <td style={{ color: '#dedede' }}>
                    <p>1,2%</p>
                  </td>
                  <td style={{ color: '#dedede' }}>
                    <p>+44%</p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      <span style={{ marginRight: '5px' }}>2</span>
                      <img
                        src={diamondMedium}
                        alt="diamond-medium"
                        width={20}
                        height={20}
                        style={{ marginRight: '5px' }}
                      />
                    </div>
                  </td>
                  <td style={{ color: '#ffde45' }}>
                    <p>301–700</p>
                  </td>
                  <td style={{ color: '#ffde45' }}>
                    <p>1,4%</p>
                  </td>
                  <td style={{ color: '#ffde45' }}>
                    <p>+68%</p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      <span style={{ color: '#0C9AFF', marginRight: '5px' }}>
                        3
                      </span>
                      <img
                        src={diamondAdvanced}
                        alt="diamond-advanced"
                        width={20}
                        height={20}
                        style={{ marginRight: '5px' }}
                      />
                    </div>
                  </td>
                  <td style={{ color: '#0C9AFF' }}>
                    <p>701–2500</p>
                  </td>
                  <td style={{ color: '#0C9AFF' }}>
                    <p>1,7%</p>
                  </td>
                  <td style={{ color: '#0C9AFF' }}>
                    <p>+104%</p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      <span style={{ color: '#AC5FFF', marginRight: '5px' }}>
                        4
                      </span>
                      <img
                        src={diamondExpert}
                        alt="diamond-"
                        width={20}
                        height={20}
                        style={{ marginRight: '5px' }}
                      />
                    </div>
                  </td>
                  <td style={{ color: '#AC5FFF' }}>
                    <p>2501+</p>
                  </td>
                  <td style={{ color: '#AC5FFF' }}>
                    <p>~1.166%*</p>
                  </td>
                  <td style={{ color: '#AC5FFF' }}>
                    <p>+140%</p>
                  </td>
                </tr>
              </table>
            </div>
            <p>
              * Уровень 4 рассчитан так, чтобы суммарная прибыль за 120 дней
              была около +140%.
            </p>
          </div>
          <div>
            <h1>2.2 Модель «невозврат депозита»</h1>
            <ul>
              <li>
                После окончания периода (например, 120 дней){' '}
                <span>тело депозита не возвращается</span>.
              </li>
              <li>
                Зато <span>каждый день</span> вы получаете прибыль, которая в
                сумме превышает исходный вклад.
              </li>
              <li>
                Накопленные проценты можно <span>выводить ежедневно</span> или
                реинвестировать по своему усмотрению.
              </li>
            </ul>
          </div>
          <div>
            <h1>2.3 Повышение уровня</h1>
            <ul>
              <li>
                Через <span>45 дней</span> без вывода средств можно перейти на
                следующий уровень,
                <span>полностью оплатив</span> его минимальную сумму.
              </li>
              <li>
                Ваш прошлый депозит <span>прибавляется</span> к новой сумме, и
                доходность повышается.
              </li>
            </ul>
            <p>
              <span>Пример:</span> <br /> Было 350 TON на 2 уровне. Вы захотели
              перейти на 3 уровень (минимум 701 TON). Вносите 701 TON. Теперь на
              стейкинге 1051 TON по ставке 3 уровня.
            </p>
          </div>
          <hr />
          <div>
            <h1>3. Механика халвингов</h1>
            <p>
              <span>Халвинг</span> - это регулярное снижение процентов и
              увеличение срока стейкинга. Он нужен, чтобы:
            </p>
            <ul>
              <li>Защитить проект от гиперинфляции.</li>
              <li>
                Стимулировать ранних участников заходить в проект{' '}
                <span>как можно раньше</span>.
              </li>
              <li>
                Вывести систему к <span>конечным APR</span> (годовым процентам),
                которые более устойчивы:
              </li>
            </ul>
            <div>
              <div style={{ display: 'flex' }}>
                <img
                  src={diamondPrimary}
                  alt="diamond-primary"
                  style={{ marginRight: '5px' }}
                />
                <p>
                  <span style={{ color: '#dedede' }}>1 уровень</span> → 13%
                  годовых
                </p>
              </div>
              <div style={{ display: 'flex', marginTop: '-10px' }}>
                <img
                  src={diamondMedium}
                  alt="diamond-mediaum"
                  style={{ marginRight: '5px' }}
                />
                <p>
                  <span>2 уровень</span> → 16% годовых
                </p>
              </div>
              <div style={{ display: 'flex', marginTop: '-10px' }}>
                <img
                  src={diamondAdvanced}
                  alt="diamond-mediaum"
                  style={{ marginRight: '5px' }}
                />
                <p>
                  <span style={{ color: '#0C9AFF' }}>3 уровень</span> → 20%
                  годовых
                </p>
              </div>
              <div style={{ display: 'flex', marginTop: '-10px' }}>
                <img
                  src={diamondExpert}
                  alt="diamond-mediaum"
                  style={{ marginRight: '5px' }}
                />
                <p>
                  <span style={{ color: '#AC5FFF' }}>4 уровень</span> → 26%
                  годовых
                </p>
              </div>
            </div>
            <p>
              <span>Для 4 уровня</span> путь условно выглядит так:
            </p>
            <div>
              <p>
                <span>120 дней</span> → около +140%
              </p>
              <p>
                <span>150 дней</span> → около +110%
              </p>
              <p>
                <span>210 дней</span> → около около +85%
              </p>
              <p>
                <span>270 дней</span> → около +60%
              </p>
              <p>
                <span>330 дней</span> → около +40%
              </p>
              <p>
                <span>365 дней</span> → около +26% (и становится фиксированным)
              </p>

              <p>
                Аналогичные пропорции снижения действуют и на остальные уровни.
                На каждом этапе пользователь{' '}
                <span>заново покупает уровень</span> , если хочет продолжить
                стейкинг на новых условиях.
              </p>
            </div>
          </div>
          <hr />
          <div>
            <h1>4. Реферальная и бонусная системы</h1>
            <div>
              <h1>4.1 Реферальная программа</h1>
              <ul>
                <li>
                  <span>150 токенов</span> за первого активного реферала
                  (реферал внёс депозит).
                </li>
                <li>
                  <span>350 токенов</span> за каждого 10-го активного реферала.
                </li>
                <li>
                  Таблица лидеров по реферальной активности, крупные призы
                  каждые 120-150 дней.
                </li>
              </ul>
            </div>
            <div>
              <h1>4.2 Фарминг (задания и реклама)</h1>
              <ul>
                <li>
                  Просмотр рекламных роликов, прохождение обучающих тестов,
                  мини-квесты.
                </li>
                <li>
                  Вознаграждение в нативном токене <span>ApexSt</span>.
                </li>
                <li>Ежедневные лимиты для исключения накруток.</li>
              </ul>
            </div>
            <div>
              <h1>4.3 Премиальные бонусы</h1>
              <ul>
                <li>
                  <span>VIP-призы:</span> (элитный алкоголь, поездки в Дубай)
                  для крупных вкладчиков 4 уровня.
                </li>
                <li>
                  Вечеринка в Дубае, встреча с командой, розыгрыш дополнительных
                  2 000 000 токенов для гостей.
                </li>
              </ul>
            </div>
          </div>
          <hr />
          <div>
            <h1>5. На чём зарабатывает команда</h1>
            <ol>
              <li>
                <span>Официальные стейкинги</span> (TON и другие сети).
              </li>
              <li>
                <span>Участие в ICO/IDO</span>, ранних токенсейлах и
                долгосрочных проектах.
              </li>
              <li>
                <span>Маркетмейкинг</span> на биржах.
              </li>
              <li>
                Часть прибыли идёт на покрытие высоких процентов и поддержание
                системы, часть — заработок команды.
              </li>
            </ol>

            <p>
              Это прозрачная модель: <span>не пирамида</span>, а реальная
              инвестиционная деятельность. Без "золотых гор" и обмана
              пользователей.
            </p>
          </div>
          <hr />
          <div>
            <h1>7. Почему стейкинг — это умно и безопасно</h1>
            <ol>
              <li>
                <span>Понятная механика</span>: нет сложных торговых стратегий.
              </li>
              <li>
                <span>Нет риска волатильности</span>: вы получаете проценты
                стабильно, рынок не влияет.
              </li>
              <li>
                <span>Пассивный доход 24/7</span>: не нужно быть
                экспертом-трейдером.
              </li>
              <li>
                <span>Похоже на банковский вклад</span>, только выгоднее и
                прозрачнее.
              </li>
              <li>
                <span>Глобальное признание</span>: США уже думает о стейкинге на
                госуровне.
              </li>
            </ol>
          </div>
          <hr />
          <div>
            <h1>8. Банк vs Стейкинг: кто выигрывает?</h1>
            <div className={styles.AboutTableWrapper}>
              <table className={styles.AboutTable}>
                <tr>
                  <th>
                    <p></p>
                  </th>
                  <th>
                    <p>Банк</p>
                  </th>
                  <th>
                    <p>ApexStake</p>
                  </th>
                </tr>
                <tr>
                  <td>
                    <p>Ставка</p>
                  </td>
                  <td>
                    <p>3-5% в год</p>
                  </td>
                  <td>
                    <p>До 140% на старте, стабилизация ~ 26%</p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>Гибкость</p>
                  </td>
                  <td>
                    <p>
                      Жесткие условия, <br /> штрафы за досрочный вывод
                    </p>
                  </td>
                  <td>
                    <p>Можно выводить прибыль ежедневно</p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>Прозрачность</p>
                  </td>
                  <td>
                    <p>Закрытая система</p>
                  </td>
                  <td>
                    <p>Смарт-контракт, видна каждая транзакция</p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>Контроль</p>
                  </td>
                  <td>
                    <p>Деньги под управлением банка</p>
                  </td>
                  <td>
                    <p>Токены всегда в вашем кошельке</p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>Доступность</p>
                  </td>
                  <td>
                    <p>Нужны документы, KYC, время</p>
                  </td>
                  <td>
                    <p>Глобальная платформа, мультичейн, быстрое развитие</p>
                  </td>
                </tr>
              </table>
            </div>
            <p>
              Банки устарели: низкие проценты, бюрократия, нет реального
              контроля над своими деньгами.
            </p>
          </div>
          <div>
            <h1>9. Roadmap (план развития)</h1>
            <ul>
              <li>
                <span>Старт</span>: Стейкинг TON, уровни, реферальная программа,
                фарминг-задания.нет сложных торговых стратегий.
              </li>
              <li>
                <span>Первый халвинг</span> (около 120 дней) и запуск токена{' '}
                <span>ApexSt</span>.
              </li>
              <li>
                <span>Интеграция</span> Solana, XRP, LTC, NFT-бонусы, мобильное
                приложение (АррStore, Google Play).
              </li>
              <li>
                <span>Листинг ApexSt</span> на CEX/DEX, партнерства с фондами и
                крупными игроками. Solana, XRP, LTC, NFT-бонусы, мобильное
                приложение (АррStore, Google Play).
              </li>
              <li>
                <span>Второй халвинг</span>, постепенное снижение процентов,
                выход на <span>стабильную APR.</span>
              </li>
              <li>
                <span>DAO-модуль</span>, самоуправление проектом, глобальная
                экспансия.
              </li>
            </ul>
          </div>
          <hr />
          <div>
            <h1>10. Токен ApexSt</h1>
            <div>
              <h1>10.1 Полезность (Utility)</h1>
              <ul>
                <li>
                  <span>Оплата комиссий</span> со <span>скидкой</span> (см. блок
                  о комиссиях).
                </li>
                <li>
                  Внутренняя валюта для <span>фарминга</span>, NFT, реферальных
                  бонусов.
                </li>
                <li>
                  <span>DAO-голосования</span>: держатели ApexSt решают, как
                  развивать платформу.
                </li>
                <li>
                  Участие в <span>пресейлах</span> и закрытых токенсейлах.
                </li>
                <li>
                  <span>Листинг</span> на биржах (CEX/DEX), потенциальный рост
                  цены.
                </li>
              </ul>
            </div>
            <div>
              <h1>10.2 Токеномика</h1>
              <p>
                <span>Общая эмиссия</span>: 2 000 000 000 (2 млрд), без
                дополнительной эмиссии.
              </p>
              <p>
                <span>Примерное распределение</span>:
              </p>
              <ul>
                <li>Пресейл: 12%</li>
                <li>Публичное ICO/IDO: 8%</li>
                <li>Фарминг/задания: 20%</li>
                <li>Команда и разработка: 12%</li>
                <li>Ликвидность и биржи: 10%</li>
                <li>Партнёрства/листинги: 8%</li>
                <li>Реферальные бонусы: 10%</li>
                <li>Развитие и маркетинг: 12%</li>
                <li>Резерв (DAO): 8%</li>
              </ul>
            </div>
            <div>
              <h1>10.3 Механики вестинга и сжигания</h1>
              <ul>
                <li>
                  Часть токенов сжигается при оплате комиссий, покупке NFT-услуг
                  и т.д.
                </li>
                <li>
                  Команда и крупные инвесторы имеют <span>вестинг</span>, чтобы
                  не было мгновенного «дампа»
                </li>
              </ul>
            </div>
          </div>
          <hr />
          <div>
            <h1>11. Комиссии за вывод (обновлённые условия)</h1>
            <div>
              <h1>11.1 До первого халвинга</h1>
              <ul>
                <li>
                  Комиссия за вывод: <span>10%</span>.
                </li>
                <li>
                  На этом этапе <span>ApexSt</span> ещё не используется для
                  оплаты комиссий (токен не запущен или тестируется).
                </li>
              </ul>
            </div>
            <div>
              <h1>11.2 После первого халвинга</h1>
              <ul>
                <li>
                  Стандартная комиссия снижается до <span>5%</span>.
                </li>
                <li>
                  Однако одновременно <span>запускается токен Apexst</span>, и
                  теперь можно платить комиссию в ApexSt.
                </li>
                <li>
                  <span>Если комиссия оплачивается токеном Apexst</span> → она{' '}
                  <span>составит всего 1%</span>
                  от суммы вывода.
                </li>
              </ul>
              <p>
                <span>Пример:</span> <br /> Вы выводите 1000 TON после первого
                халвинга:
              </p>
              <ul>
                <li>Если платите комиссию в TON — 5%, то есть 50 TON.</li>
                <li>
                  Если платите комиссию в ApexSt — 1%, то есть 10 TON (в
                  эквиваленте ApexSt).
                </li>
              </ul>
              <p>
                Таким образом, держатели ApexSt получают{' '}
                <span>значимую выгоду</span> и платят гораздо меньше при выводе
                средств.
              </p>
            </div>
          </div>
          <hr />
          <div>
            <h1>12. Мультичейн-развитие</h1>
            <p>ApexStake не ограничится одной сетью TON:</p>
            <ul>
              <li>
                <span>Solana, XRP, LTC</span> - на очереди для интеграции.
              </li>
              <li>
                Общий кошелёк и кабинет для управления стейкингами в разных
                сетях.
              </li>
              <li>
                Система фарминга, NFT и реферальных бонусов расширится на все
                эти экосистемы.
              </li>
              <li>
                <span>ApexSt</span> останется ключом ко всем привилегиям:
                скидки, VIP-доступ, внутренняя экономика.
              </li>
            </ul>
          </div>
          <hr />
          <div>
            <h1>13. Заключение</h1>
            <p>
              <span>ApexStake</span> - это проект, который стремится объединить
              лучших из двух миров:
            </p>
            <ul>
              <li>
                <span>Высокодоходный старт</span> (до 140%), мотивирующий ранних
                участников, но с плавным уменьшением процентов через{' '}
                <span>халвинги</span>.
              </li>
              <li>
                <span>Устойчивая финальная APR</span>, при которой платформа
                способна работать бесконечно долго, не превращаясь в «мыльный
                пузырь».
              </li>
              <li>
                Собственный токен <span>ApexSt</span> с реальной утилитой
                (комиссии, ДАО, фарминг, NFT).
              </li>
              <li>Мультичейн-подход и открытость к новым криптовалютам.</li>
            </ul>
            <p>
              Мы <span>зарабатываем</span> (как команда) на реальных
              инструментах: стейкинг сети TON, ICO, маркетмейкинг. Платим
              проценты из <span>части этой прибыли</span>, не создавая денег из
              воздуха. Это и есть наш <span>честный подход</span>.
            </p>
            <p>
              <span>Добро пожаловать в ApexStake</span> - станьте частью{' '}
              <span>будущего стейкинга</span>, пока доход ещё максимально высок!
            </p>
          </div>
          <hr />
          <div>
            <h1>Контакты</h1>
            <ul>
              <li>
                Сайт: <a href="apexstake.io">apexstake.io</a>
              </li>
              <li>
                Telegram-бот: <a href="@ApexStakeBot">@ApexStakeBot</a>
              </li>
              <li>
                Twitter:{' '}
                <a href="twitter.com/ApexStake">twitter.com/ApexStake</a>
              </li>
              <li>
                Discord: <a href="discord.gg/ApexStake">discord.gg/ApexStake</a>
              </li>
              <li>
                Email: <a href="contact@apexstake.io">contact@apexstake.io</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutModal;
