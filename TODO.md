# План продвижения — задачи

> Из документа `Olganomics_Website_AI_Search_Plan.docx` (аудит сайта от 18.09.2026).
> В скобках указан раздел плана с подробностями и готовыми текстами, например (§5).
> Вопросы и ответы для раздела ресурсов отмечаются отдельно — в `QUESTIONS.md`.

**Суть плана.** Бесплатный тест остаётся главным способом привлечь учеников, а сайт вокруг него
становится справочным центром по экзаменам по экономике. Страницы отвечают на вопросы учеников и родителей,
показывают опыт и результаты Ольги и ведут к бесплатной консультации.

**Как отмечать.** Задача сделана → `[ ]` меняем на `[x]`. Сделана частично → оставляем `[ ]` и дописываем, что осталось.
В таблицах страниц `☐` меняем на `✅`.

**Метки.** `P0` — сделать до большого выката контента, `P1` — следом. Кто делает: `Ольга`, `Елена`,
`текст` (черновики текстов, их может писать Claude), `дизайн`.
В заголовках и текстах плана у AP нет знака ®: добавляем его по принципу 4 из `CONTEXT.md`.

Состояние на 19.09 сверено с кодом: то, что уже есть на сайте, отмечено сразу.

## 0. Решения — до всего остального

- [ ] `P0` `Ольга` **Титул в подписи.** По плану «Dr.» ставится только после официального присуждения степени,
  до этого — «Olga Shalamai» и «doctoral researcher in Economics» (§6). Сейчас на сайте «Dr. Olga Shalamai»:
  `src/config/teacher.ts`, поля `name`, `shortName`, `photoAlt`. От решения зависят подписи под статьями и разметка Person.
- [ ] `P0` `Ольга` `Елена` **Основной адрес сайта.** Остаёмся на `olga-shalamai.vercel.app` или покупаем свой домен.
  Решить до robots.txt, sitemap, canonical и JSON-LD: адрес прописывается во всех них.
  Если домен появится позже — 301 со всех старых адресов на новые (§10).
- [x] `P1` `Ольга` **Пускать ли GPTBot** — робота, который собирает тексты для обучения моделей OpenAI.
  OAI-SearchBot (поиск в ChatGPT) пускаем в любом случае (§10).
  _19.09: пускаем — Ольга согласна. Записано в комментарии в `src/app/robots.ts`._
- [ ] `P1` `Ольга` **Как записываться на консультацию.** На странице `/book-a-free-consultation` оставить WhatsApp, как сейчас,
  или подключить сервис записи вроде Calendly (в `src/config/cta.ts` для этого есть режим `booking`).

## 1. Техническая основа — неделя 1

- [x] `P0` `Елена` **robots.txt** — `src/app/robots.ts`: всем роботам разрешено, OAI-SearchBot разрешён явно,
  строка `Sitemap:` с основным адресом (§10). Готово, когда `/robots.txt` отдаёт 200 и обычный текст.
  _19.09: на живом сайте, коммит `dd0ba4b`._
- [x] `P0` `Елена` **sitemap.xml** — `src/app/sitemap.ts`. Тесты и страницы экзаменов попадают в карту сами,
  из `src/config/tests.ts`; остальные страницы — одной строкой в `src/lib/site-pages.ts`, а тест не даст её забыть.
  Готово, когда `/sitemap.xml` отдаёт 200 и содержит все публичные страницы с основным адресом.
  _19.09: на живом сайте, коммит `dd0ba4b`. Все 4 адреса из карты отвечают 200._
- [ ] `P0` `Елена` **canonical** — `metadataBase` в `layout.tsx` и `alternates.canonical` на каждой странице.
  Готово, когда на каждой индексируемой странице ровно один canonical, указывающий на неё саму.
- [ ] `P0` `Елена` **Заголовок и описание главной** (§5). Сейчас title — «Free AP® Microeconomics Practice Test».
  - title: `Olganomics | AP Economics and IGCSE Business and Economics Support`
  - description: `Exam-focused AP Economics, IGCSE Economics and IGCSE Business support with Olga Shalamai. Take a free diagnostic or book a consultation.`
- [ ] `P0` `Елена` **Бренд в заголовках остальных страниц:** `title.template: '%s | Olganomics'` в `layout.tsx`,
  тогда тест станет «Free AP® Microeconomics Unit 1 Practice Test | Olganomics» (§4).
- [ ] `P0` `Елена` **Open Graph:** заголовок, описание и картинка для превью ссылки на каждой странице (§10).
- [ ] `P0` `Елена` **Search Console и Bing Webmaster Tools:** подтвердить сайт, отправить sitemap,
  проверить главную и тесты. Bing умеет импортировать сайт из Search Console. Ольгу добавить владельцем в оба.
- [ ] `P0` `Елена` **Роботов ничего не блокирует:** в настройках Vercel (Firewall, защита от ботов) не закрыты
  Googlebot, Bingbot и OAI-SearchBot (§10).
- [x] `P0` **noindex для личных результатов** — не нужен. Результат хранится в адресе после `#r=`,
  поисковики эту часть не видят, отдельной страницы нет.
- [ ] `P0` `Елена` **noindex для служебного:** проверить, что превью-сборки Vercel отдают `X-Robots-Tag: noindex`.
  Страницы «спасибо» и подобные, если появятся, — `robots: { index: false }`.
- [ ] `P0` `Елена` **Важный текст приходит в HTML с сервера** (§10): открыть страницы тестов с выключенным
  JavaScript и убедиться, что описание теста на месте.

## 2. Страницы доверия — неделя 2

| Готово | | Адрес | Title | H1 |
|:-:|---|---|---|---|
| ☐ | `P0` | `/about-olga-shalamai` | About Olga Shalamai \| Economics and Business Educator | About Olga Shalamai |
| ☐ | `P0` | `/results` | AP Economics Student Results and Success Stories \| Olganomics | Student Results and Success Stories |
| ☐ | `P0` | `/book-a-free-consultation` | Book a Free Economics Consultation \| Olganomics | Book a Free 15 Minute Consultation |
| ☐ | `P1` | `/faq` | AP and IGCSE Economics Tutoring FAQ \| Olganomics | Frequently Asked Questions |
| ☐ | `P1` | `/contact` | Contact Olga Shalamai \| Olganomics | Contact Olganomics |

- [ ] `P0` `Елена` **Меню в шапке.** Как только появляется хоть одна новая страница, меню нужно (принцип 12 в `CONTEXT.md`).
  Состав по плану: Home · AP Economics · IGCSE · Resources · Results · About Olga и кнопка «Book a Free Consultation» (§3).
  Решить, прятать ли меню, пока человек проходит тест, чтобы не уводить его оттуда.
- [ ] `P0` `Ольга` **Материалы для страницы «Об Ольге»:** образование, статус докторантуры, публикации со ссылками,
  подготовка как AP-преподавателя (без намёка на одобрение College Board), языки, работа с учениками из других стран.
  Начало текста уже есть в плане (§6).
- [ ] `P1` `Елена` **Разметка страницы «Об Ольге»:** ProfilePage + Person.
- [ ] `P0` **Материалы для `/results`** (картинки — только в дополнение к тексту):
  - [x] Отзывы текстом на главной (`Testimonials`, 19.09).
  - [ ] `Ольга` Согласие учеников на имена в отзывах — уже в `CONTEXT.md` §8.
  - [ ] `Ольга` Баллы AP учеников: с разрешения или без имён.
- [ ] `P1` `Ольга` **Для `/faq`:** вопросы 46–50 из `QUESTIONS.md` и то, чего там нет, но о чём спрашивают до записи:
  цена, длительность урока, расписание и часовые пояса, платформа, размер группы.
  Разметка FAQPage — только если вопросы и полные ответы видны на странице (§10).
- [ ] `P1` `Ольга` `Елена` **Форма на `/contact`.** Компонент `ContactForm` есть, но отправка почты выключена:
  включить или обойтись без формы.
- [ ] `P1` `Елена` **Ссылки в подвале:** Olganomics · AP Economics · IGCSE Economics · IGCSE Business · Resources · Results · About · Contact (§5).
  - [x] Дисклеймер College Board на каждой странице — уже в `layout.tsx`.

## 3. Услуги и новая главная — неделя 3

| Готово | | Адрес | Title | H1 |
|:-:|---|---|---|---|
| ☐ | `P0` | `/ap-economics-tutor` | AP Economics Tutor for Micro and Macro \| Olga Shalamai | AP Economics Tutoring for Microeconomics and Macroeconomics |
| ☐ | `P0` | `/igcse-economics-tutor` | Online IGCSE Economics Tutor \| Olga Shalamai | IGCSE Economics Tutoring and Exam Preparation |
| ☐ | `P0` | `/igcse-business-tutor` | Online IGCSE Business Tutor \| Olga Shalamai | IGCSE Business Tutoring and Exam Preparation |
| ☐ | `P1` | `/ap-microeconomics-tutor` | AP Microeconomics Tutor and Exam Preparation \| Olganomics | AP Microeconomics Tutoring and Exam Preparation |
| ☐ | `P1` | `/ap-macroeconomics-tutor` | AP Macroeconomics Tutor and Exam Preparation \| Olganomics | AP Macroeconomics Tutoring and Exam Preparation |
| ☐ | `P1` | `/individual-economics-lessons` | Individual Economics Lessons \| Olganomics | Individual Economics Lessons |
| ☐ | `P1` | `/group-economics-lessons` | Group Economics Lessons \| Olganomics | Small Group Economics Lessons |
| ☐ | `P1` | `/live-economics-sessions` | Live AP and IGCSE Economics Sessions \| Olganomics | Live Economics Exam Practice Sessions |

- [ ] `P0` `Ольга` **Описание услуг:** что входит в индивидуальные уроки, группы и живые сессии, по каким экзаменам,
  онлайн или нет, для каких стран. Без этого страницы услуг не написать: за Ольгу ничего не придумываем (принцип 2).
- [ ] `P0` `Ольга` `Елена` **Новая главная по тексту плана** (§5). Перед выкладкой:
  - все утверждения об Ольге — «10+ years», «Students achieving top AP scores», докторантура — подтверждает Ольга (принцип 2);
  - в первом экране план ставит две кнопки; по принципу 1 вторая («Book a Free 15 Minute Consultation») становится тихой ссылкой;
  - «About 25 minutes» и число вопросов берём из `src/config/tests.ts`, а не пишем руками;
  - кнопки «Explore IGCSE…» ведут на страницы услуг из таблицы выше.
- [ ] `P1` `Ольга` `Елена` **Финальный призыв в конце главной.** Сейчас страница заканчивается блоком About,
  и последнее, что видит самый заинтересованный читатель, — кнопки Instagram и Facebook, то есть выходы с сайта.
  Добавить после About короткий блок с главным действием: пройти тест или написать в WhatsApp
  (зелёная кнопка записи — принцип 1). В плане такой блок уже есть — «Final call to action» (§5);
  его текст про форматы уроков подтверждает Ольга. Можно сделать отдельно, не дожидаясь новой главной.
- [ ] `P1` `Елена` **Разметка главной:** Organization + Person в `@graph` (пример — §10), в `sameAs` — Instagram и Facebook.
- [ ] `P1` `Елена` **Разметка Course или Service** — только там, где страница действительно описывает услугу (§10).

## 4. Разделы ресурсов — неделя 4

| Готово | | Адрес | Title | H1 |
|:-:|---|---|---|---|
| ☐ | `P0` | `/resources` | Economics Exam Resource Centre \| Olganomics | Economics Exam Resource Centre |
| ☐ | `P0` | `/resources/ap-microeconomics` | AP Microeconomics Study Guides and Exam Tips \| Olganomics | AP Microeconomics Help |
| ☐ | `P0` | `/resources/ap-macroeconomics` | AP Macroeconomics Study Guides and Exam Tips \| Olganomics | AP Macroeconomics Help |
| ☐ | `P1` | `/resources/igcse-economics` | IGCSE Economics Study Guides and Exam Tips \| Olganomics | IGCSE Economics Help |
| ☐ | `P1` | `/resources/igcse-business` | IGCSE Business Study Guides and Exam Tips \| Olganomics | IGCSE Business Help |
| ☐ | `P1` | `/resources/for-parents` | Economics Exam Guidance for Parents \| Olganomics | A Parent’s Guide to Economics Exam Preparation |

- [ ] `P0` `Ольга` `Елена` **Куда идут статьи `/resources/ap-economics/…`.** В плане 5 из 15 статей лежат в этой папке,
  а раздела `/resources/ap-economics` в структуре нет. Правило плана — каждая статья связана со своим разделом.
  Либо добавить такой раздел, либо разнести эти статьи по Micro и Macro.
- [ ] `P0` `Елена` **Шаблон статьи** (§9): H1 — вопрос так, как его задают; прямой ответ в 2–4 предложения;
  почему это путают; объяснение; пример; как это выглядит на экзамене; типичная ошибка; метод Ольги;
  быстрая проверка или ссылка на тест; FAQ из 3–5 вопросов; источники; один призыв к действию;
  автор, дата публикации и дата проверки.
- [ ] `P0` `Елена` **Блок об авторе** под каждой статьёй: текст — §6, ссылки на «Об Ольге» и на запись.
- [ ] `P0` `Елена` **Хлебные крошки** на статьях и подстраницах услуг + разметка BreadcrumbList.
- [ ] `P0` `Елена` **Тесты и статьи ссылаются друг на друга:** раздел `/resources/ap-microeconomics` ведёт на тесты Unit 1 и 2,
  а на экране результатов слабая тема ведёт на статью или ответ по ней. Темы и `topicId` — в `QUESTIONS.md`, вопросы 21–30.
- [ ] `P1` `Елена` **Разметка Article** на статьях: headline, author, datePublished, dateModified, mainEntityOfPage (пример — §10).
- [ ] `P1` `Елена` **Как сообщить об ошибке:** на справочных страницах — ссылка на контакт (§10).

## Приёмка — до начала статей

План требует закрыть P0 до большого выката контента (§10). Отмечаем, когда проверено на живом сайте.

- [x] **robots.txt** отдаёт 200, обычный текст и ссылку на правильный sitemap. _Проверено 19.09._
- [x] **sitemap.xml** отдаёт 200, XML и все нужные страницы с основным адресом. _Проверено 19.09;
  перепроверить, когда появятся новые страницы или свой домен._
- [ ] **Canonical:** на каждой индексируемой странице один, и он правильный.
- [ ] **Коды ответа:** публичные страницы — 200, переехавшие — один 301, несуществующие — настоящий 404.
- [ ] **Метаданные:** у каждой страницы свои title, description и H1.
- [ ] **Разметка:** JSON-LD проходит валидатор и совпадает с тем, что видно на странице.
- [ ] **Внутренние ссылки:** каждая статья есть в своём разделе, страниц без входящих ссылок нет.
- [ ] **Телефон:** меню, кнопки, тесты и статьи работают на ширине 390px.
- [ ] **Индексация:** личное и служебное закрыто noindex, справочные страницы индексируются.
- [ ] **Аналитика:** события теста и записи видны в отладке на живом сайте.

## 5. Статьи — недели 5–12

**Как делается статья** (§11): реальный вопрос → голосовое Ольги на 5–10 минут (объяснение, типичная ошибка, её метод) →
черновик по шаблону → факты об экзамене сверяются с официальным источником → Ольга одобряет →
публикация с автором, источниками, датами, ссылками и одним призывом → Reel или карусель со ссылкой на статью →
через 4–8 недель правка по данным поиска.

**Правила** (§8): две статьи в неделю; без хотя бы одного собственного наблюдения, метода или примера Ольги не публикуем;
на каждую статью ссылается её раздел и ещё минимум две страницы.

В колонках статуса `☐` меняем на `✅`. «Вопрос» — номер из `QUESTIONS.md`: короткий ответ оттуда — основа статьи.

**Недели 5–8**

| № | Статья | Адрес | Вопрос | Голосовое | Ольга одобрила | На сайте | Соцсети |
|--:|---|---|:-:|:-:|:-:|:-:|:-:|
| 1 | Shift vs Movement Along the Demand Curve: A Simple AP Economics Guide | `/resources/ap-microeconomics/shift-vs-movement-demand-curve` | 23 | ☐ | ☐ | ☐ | ☐ |
| 2 | Scarce vs Rare: The Difference AP Economics Students Must Know | `/resources/ap-microeconomics/scarce-vs-rare` | 21 | ☐ | ☐ | ☐ | ☐ |
| 3 | How to Know Which Economics Graph to Draw | `/resources/ap-economics/how-to-choose-the-right-graph` | 25 | ☐ | ☐ | ☐ | ☐ |
| 4 | PPC Questions: Olga’s Three-Step Method | `/resources/ap-microeconomics/ppc-three-step-method` | 29 | ☐ | ☐ | ☐ | ☐ |
| 5 | The Most Common AP Economics FRQ Mistakes | `/resources/ap-economics/common-frq-mistakes` | 15 | ☐ | ☐ | ☐ | ☐ |
| 6 | AP Economics MCQ Strategy: How Strong Students Approach Questions | `/resources/ap-economics/mcq-strategy` | 13, 14 | ☐ | ☐ | ☐ | ☐ |
| 7 | Why Students Lose Marks on Economics Graph Questions | `/resources/ap-economics/graph-mistakes` | 26, 30 | ☐ | ☐ | ☐ | ☐ |
| 9 | How Hard Is AP Economics? What Students Should Expect | `/resources/ap-economics/how-hard-is-ap-economics` | 1 | ☐ | ☐ | ☐ | ☐ |

**Недели 9–10: вопросы родителей**

| № | Статья | Адрес | Вопрос | Голосовое | Ольга одобрила | На сайте | Соцсети |
|--:|---|---|:-:|:-:|:-:|:-:|:-:|
| 8 | When Should Students Start Preparing for AP Economics? | `/resources/for-parents/when-to-start-ap-economics` | 3 | ☐ | ☐ | ☐ | ☐ |
| 12 | Does My Child Need an AP Economics Tutor? | `/resources/for-parents/does-my-child-need-ap-economics-tutor` | 7 | ☐ | ☐ | ☐ | ☐ |
| 13 | When Should Students Start Preparing for IGCSE Economics? | `/resources/for-parents/when-to-start-igcse-economics` | 31 | ☐ | ☐ | ☐ | ☐ |
| 15 | Individual vs Group Economics Tutoring: Which Is Right for Your Child? | `/resources/for-parents/individual-vs-group-economics-tutoring` | 9, 50 | ☐ | ☐ | ☐ | ☐ |

**Дальше**

| № | Статья | Адрес | Вопрос | Голосовое | Ольга одобрила | На сайте | Соцсети |
|--:|---|---|:-:|:-:|:-:|:-:|:-:|
| 10 | How to Get a 5 in AP Microeconomics | `/resources/ap-microeconomics/how-to-get-a-5` | 11 | ☐ | ☐ | ☐ | ☐ |
| 11 | How to Get a 5 in AP Macroeconomics | `/resources/ap-macroeconomics/how-to-get-a-5` | 12 | ☐ | ☐ | ☐ | ☐ |
| 14 | Why Knowing the Content Is Not Enough for IGCSE Business | `/resources/igcse-business/content-is-not-enough` | 40 | ☐ | ☐ | ☐ | ☐ |

Номера — порядок публикации из плана. Недели 9–10 план отдаёт вопросам родителей (статьи 8, 12, 13, 15),
поэтому статья 9 идёт раньше статьи 8.

## 6. Доказательства и доработка — недели 11–12

- [ ] `P1` `Ольга` `текст` **Кейсы:** задача → как готовились → результат. С согласия ученика или без имён, без обещаний баллов.
- [ ] `P1` `Елена` **Больше внутренних ссылок** между статьями, тестами и страницами услуг.
- [ ] `P1` `Елена` **Страницы с показами, но без кликов:** переписать title и первый абзац по данным Search Console.
- [ ] `P1` `Елена` **Разметка VideoObject** для собственных видео на страницах (§10).

## Аналитика

- [x] Vercel Analytics стоит: просмотры и посетители (`layout.tsx`).
- [ ] `P1` `Ольга` `Елена` **Решить, чем считать события.** На бесплатном тарифе Vercel (Hobby) своих событий нет,
  а данные хранятся только месяц; события есть на Pro. Бесплатная альтернатива — Google Analytics 4:
  связывается с Search Console, но ставит cookie.
- [ ] `P1` `Елена` **События:** начал тест, закончил тест, нажал «записаться» на экране результатов,
  нажал WhatsApp, почту или запись — с пометкой, с какой страницы пришёл человек.
- [ ] `P1` `Елена` **Связать аналитику с Search Console** (если выбран GA4).
- [ ] `P1` `Ольга` `Елена` **Смотреть переходы из ChatGPT и других ИИ**; в Bing Webmaster Tools — отчёт AI Performance, когда появится.

## Скорость и доступность

- [x] У портрета заданы ширина и высота, вёрстка не прыгает при загрузке (`Portrait.tsx`).
- [ ] `P1` `Елена` **Портрет и картинки результатов:** сжать, отдавать в WebP или AVIF и под размер экрана
  (`next/image` или `srcset`). Сейчас портрет — обычный `<img>`.
- [ ] `P1` `Елена` **Core Web Vitals** — замерить после выката новых страниц.
- [ ] `P1` `Ольга` `Елена` **Контраст охры в светлой теме.** Охряной текст `#a9721e` на фоне даёт 3,94 при норме 4,5
  для мелкого текста: ссылки на почту, надзаголовки, «Start →» на карточках тестов, ссылки на 404 и в разборе —
  около 8 мест (`grep text-ochre`). Чинить одним токеном, а не по местам: отдельный цвет охры для текста,
  ближайший проходящий — `#93631a` (4,98 на фоне, 4,57 на `surface`), а фирменный оставить для крупных цифр
  и декора. Это меняет вид бренда — показать Ольге. В тёмной теме охра проходит (8,19).

**Проверять при каждом большом релизе** (здесь не отмечаем):
светлая и тёмная тема, ширина 390px и широкий экран; один H1 и заголовки по порядку H1 → H2 → H3;
alt у значимых картинок и пустой у декоративных; кнопки работают с клавиатуры; контраст считаем расчётом (принцип 6);
у полей форм есть подписи и понятные ошибки; новая страница есть в sitemap и на неё ведут ссылки.

## Каждый месяц (§12)

- [ ] `P1` `Ольга` `Елена` **Назначить, кто отвечает** за ежемесячный разбор.

| Месяц | Разбор сделан |
|---|:-:|
| Октябрь 2026 | ☐ |
| Ноябрь 2026 | ☐ |
| Декабрь 2026 | ☐ |

**Что смотрим:** находимость (сколько страниц в индексе, показы и запросы без названия бренда, цитирование в Bing AI Performance);
вовлечённость (чтение статей, начатые и законченные тесты, повторные визиты); заявки (клики в WhatsApp,
записи на консультацию, реальные обращения, записи на уроки); качество (страницы с показами, но слабым откликом,
устаревшие данные об экзаменах); авторитет (поиск по имени Ольги, ссылки и упоминания, новые кейсы).

**Вопросы для разбора:**
1. По каким запросам без названия бренда были показы или переходы?
2. Какие статьи привели к началу теста или клику на запись?
3. Какие страницы видны в поиске, но со слабым заголовком или неполным ответом?
4. Какие новые вопросы задали ученики и родители за месяц? Они идут в `QUESTIONS.md` и в список статей.
5. Какие страницы о формате экзаменов нужно обновить?
6. Какой результат или отзыв можно превратить в кейс с согласия ученика?
7. Google, Bing и ИИ находят текущие адреса, а не старые или дубли?
