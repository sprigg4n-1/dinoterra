import LinkToSourceComponent from "@/components/history/LinkToSourceComponent";
import ParaghraphsComponent from "@/components/history/ParaghraphsComponent";
import TitleComponent from "@/components/TitleComponent";
import React from "react";

const DinosaursDiscovery = ({
  tabId,
  label,
}: {
  tabId: string;
  label: string;
}) => {
  return (
    <div id={tabId}>
      <TitleComponent
        text={label}
        size="md"
        textColor="black"
        additionalClasses="font-bold text-center"
      />
      <div className="flex flex-col gap-10">
        <div>
          <TitleComponent
            text="Перші знахідки"
            size="sm"
            textColor="fieryRed"
            additionalClasses="text-center"
          />
          <div className="text-center md:text-left flex flex-col gap-2">
            <div>
              <ParaghraphsComponent
                values={[
                  "Великі окам'янілі кістки, які з'явилися з плиткових кар'єрів в Оксфордширі (Англія) наприкінці 1600-х років, одразу викликали подив",
                  "У світі, де еволюція та вимирання були невідомими концепціями, вчені того часу шукали пояснення. Можливо, думали вони, ці кістки належали римському бойовому слону чи гігантській людині.",
                  "Тільки в 1824 році Вільям Бакленд, перший професор геології Оксфордського університету, описав та дав назву першому відомому динозавру, базуючись на нижній щелепі, хребцях та кістках кінцівок, знайдених у цих місцевих кар'єрах. Найбільша кістка стегна мала 2 фути 9 дюймів завдовжки та майже 10 дюймів в обхваті.",
                  "Бакленд назвав створіння, до якого належали ці кістки, Мегалозавр, або великий ящір, у науковій статті, яку він презентував Лондонському геологічному товариству 20 лютого 1824 року. За формою зубів він вважав, що це був хижак завдовжки більше 40 футів (12 метрів) з ''об’ємом слона''. Бакленд думав, що він, ймовірно, був амфібією, живучи частково на суші, частково у воді.",
                  "''У певному сенсі він багато чого правильно зрозумів. Це була група вимерлих гігантських рептильних створінь. Це була радикальна ідея'', — сказав Стів Брюсатте, палеонтолог Единбурзького університету та автор книги ''Підйом і падіння динозаврів: нова історія їх втраченого світу''.",
                  "''Ми всі виросли, дивлячись на мультфільми про динозаврів та фільм ''Парки Юрського періоду'', з динозаврами на наших обідніх коробках та іграшках. Але уявіть собі світ, де слово ''динозавр'' не існує, де концепція динозавра не існує, і ви були першими людьми, які усвідомили це лише за допомогою кількох великих кісток з землі''.",
                ]}
              />
              <LinkToSourceComponent
                link="https://edition.cnn.com/2024/01/01/europe/megalosaurus-first-dinosaur-discovery-scn/index.html"
                text="Взято з CNN"
              />
            </div>
          </div>
        </div>
        <div>
          <TitleComponent
            text="Річард Оуен"
            size="sm"
            textColor="fieryRed"
            additionalClasses="text-center"
          />
          <div className="text-center md:text-left flex flex-col gap-2">
            <div>
              <ParaghraphsComponent
                values={[
                  "Сер Річард Оуен був провідним порівняльним анатомом та палеонтологом свого часу. Спірна особа, він, мабуть, найбільше відомий за те, що ввів слово ''динозавр''. Колекція Оуена датується періодом з 1681 по 1892 рік і охоплює його кар'єрний розвиток, наукові дослідження, професійні комунікації, кампанії за музей природної історії та інші досягнення.",
                  "Перша професійна посада Оуена була помічником Вільяма Кліфта, якого він пізніше замінив на посаді консерватора в Музеї Хантера при Королівському коледжі хірургів у Лондоні. Він вів кампанію за створення музею природної історії і був першим керівником Британського музею (Природної історії), який пізніше став Природничим музеєм Лондона.",
                  "Протягом кар'єри, що тривала більше 60 років, Оуен відіграв важливу роль у багатьох значущих відкриттях у своїй галузі. Оуен був сучасником Чарльза Дарвіна і відомий своєю рішучою опозицією до теорії природного відбору Дарвіна.",
                  "Колекція Оуена також містить матеріали, пов'язані з Кліфтом через тривалу зв'язок Оуена з родиною Кліфтів, зокрема його професійну асоціацію з Кліфтом і шлюб з його дочкою Кароліною. В результаті, в колекції є кілька предметів, пов'язаних з родиною Кліфтів.",
                  "Більшість манускриптів в колекції були передані в Музейну бібліотеку Чарльзом Девісом Шерборном (1861–1942) у 1908 році, а анотовані книги — онукою Оуена Емілі Оуен у 1915 році. Також в останні роки до колекції були додані предмети, зібрані та пов'язані з Оуеном. У грудні 2002 року на аукціоні була куплена ще одна колекція, що належала Рональду А. Коену, яка складається з 19 листів від Оуена, семи листів від Томаса Белла (включаючи чотири до Оуена), двох томів ''Життя Річарда Оуена'' (1894) та одного альбому на Оуена.",
                  "Колекція включає ордени та медалі, нагороджені Оуену протягом його життя з усього світу, зокрема Орден Бани та нагороди від Королівського товариства (Лондон), Геологічного товариства (Лондон) та Ліннеївського товариства Лондона. Також є зошити, щоденники, альбоми, анотовані книги та документи, а також виправлені чернетки. Багато з цих матеріалів стосуються лекцій, які Оуен читав науковій спільноті між 1828 і 1862 роками, а також лекцій, прочитаних сером Еверардом Гоумом (1756–1832). Повний опис колекції можна знайти в посібнику Грубера та Такрея ''Richard Owen Commemoration: Three studies'' (1992).",
                  "Основні моменти колекції включають 27 томів професійної кореспонденції, яку Оуен отримав від друзів, прихильників та знайомих. Ці томи були вибрані та організовані Шерборном після смерті Оуена. Бібліотека також зберігає значну колекцію з 3500 малюнків, 110 з яких зображують типові зразки і використовувались для наукових публікацій Оуена. Багато з цих малюнків були зроблені самим Оуеном, але також є роботи інших художників, таких як Джозеф Дінкель (1806–1891), Джордж Шарф (1788–1860) та Франц Бауер (1758–1840). Повний список малюнків був складений Жанною Інглс і Фредеріком Соєром у ''Каталозі колекції малюнків Річарда Оуена з палеонтології та зоології в Британському музеї (Природної історії)''.",
                ]}
              />
              <LinkToSourceComponent
                link="https://www.nhm.ac.uk/our-science/services/library/collections/owen.html"
                text="Взято з Natural History Museum"
              />
            </div>
          </div>
        </div>
        <div>
          <TitleComponent
            text="Кістяні війни"
            size="sm"
            textColor="fieryRed"
            additionalClasses="text-center"
          />
          <div className="text-center md:text-left flex flex-col gap-2">
            <div>
              <ParaghraphsComponent
                values={[
                  "В останній третині XIX століття два відомих палеонтолога — Едвард Коуп з Академії природничих наук у Філадельфії і Отніел Марш з Єльського університету — спеціалізувалися на вивченні останків динозаврів.",
                  "Спочатку вчені були друзями, — підкреслює Лассі Лапінтіе в тижневику Suomen Kuvalehti. Коуп навіть назвав виявлену в 1867 році тварину на честь свого колеги (Ptyonius marshii).",
                  "Вважається, що відносини вчених розладналися через історію зі скелетом плезіозавра: Едвард Коуп неправильно зібрав його хребці і розташував череп на кінці короткого хвоста, а не на довгій шиї. Ілюстрація з цією помилкою була опублікована в одному науковому виданні. Марш вказав колезі на помилку, і Коуп спробував знищити всі екземпляри журналу. Однак Марш не погодився віддати йому свій екземпляр. ''Відтоді він став моїм заклятим ворогом'', — запевняв пізніше Отніел Марш.",
                  "Втім, і він не уникнув серйозних помилок. Найсерйозніший прокол Маршу — ''відкриття'' вигаданого виду динозаврів. Спочатку вчений приєднав до хребта апатозавра череп динозавра іншого виду. Потім він виявив повноцінний скелет апатозавра з черепом і проголосив відкриття ''нового'' виду динозаврів — бронтозаврів. Сучасна наука не визнає бронтозаврів, однак міф про них дожив до наших днів: ця назва потрапила в багато підручників.",
                  "З роками суперництво палеонтологів набирало обертів. У боротьбі за виявлення якомога більшої кількості видів вони шпигували один за одним, крали скам'янілості, переманювали фахівців, давали хабарі і поливали один одного брудом на сторінках газет.",
                  "Стати переможцем у цій гонці було нелегко. Честь дати назву новому вимерлому виду тварин належала тому, хто першим зробив наукову публікацію. Однак в XIX столітті відстежити, хто заявив про відкриття першим, було вельми складно. Тому Коуп і Марш встигли запропонувати власний варіант назви для ряду одних і тих же тварин",
                  "Піком ''війни палеонтологів'' став 1877 рік, коли в штатах Колорадо і Вайомінг були виявлені останки динозаврів. І Коуп, і Марш відправляли своїх помічників для перешкоди суперникові. Відомо, що одного разу Марш привіз на місце розкопок Коупа кістки, що не мали відношення до цього місця, щоб збити противника з пантелику.",
                  "Боротьба палеонтологів навіть привела до знищення скам'янілостей. Кажуть, що конкуренти закопували місця незавершених розкопок і навіть підривали їх, щоб перешкодити суперникові отримати важливі останки.",
                  "Безжальні Кістяні війни гальмували розвиток палеонтології, але високу ціну довелося заплатити і самим дослідникам. Едвард Коуп і Отніел Марш витратили на суперництво всі свої накопичення, позбулися власності і померли бідними озлобленими старими",
                  "Разом з тим, за час суперництва було відкрито понад 130 видів нових динозаврів, що мешкали на території Північної Америки. За кількістю вперед вирвався Марш, який відкрив в цілому 80 нових видів динозаврів і дав назву двом з найбільш відомих видів — алозавру і стегозавру. Едвард Коуп встиг описати всього 56 видів.",
                ]}
              />
              <LinkToSourceComponent
                link="https://lenta.ua/kistyani-viyni-abo-chim-zakinchilasya-velika-gonka-za-dinozavrami-47445/"
                text="Взято з Lenta"
              />
            </div>
          </div>
        </div>
        <div>
          <TitleComponent
            text="Сучасні методи пошуку"
            size="sm"
            textColor="fieryRed"
            additionalClasses="text-center"
          />
          <div className="text-center md:text-left flex flex-col gap-2">
            <div>
              <ParaghraphsComponent
                values={[
                  "Вчені витратили десятки років на розкопки кісток динозаврів і вивчення доісторичних рептилій. За ці роки технологічний прогрес допоміг зробити цей процес більш ефективним. Спеціфічні технології, такі як комп'ютерна томографія, 3D-моделювання та штучний інтелект, суттєво трансформували палеонтологію. Продовжуйте читати, щоб дізнатися, як сучасні інструменти оживляють стародавні світи динозаврів.",
                  "Хоча скам'янілі кістки дають нам уявлення про основну структуру динозаврів, вони не дають повної картини. Скелетні залишки показують нам розмір і форму тварини; однак цифрові інструменти дозволяють нам йти далі.",
                  "Використовуючи спеціальні техніки на скам'янілих рештках, такі як комп'ютерна томографія (КТ), дослідники можуть створювати 3D-моделі динозаврів. Завдяки 3D-моделюванню та реконструкції вчені також можуть проводити віртуальні тести, щоб визначити, як конкретні види могли рухатися, спираючись на їхню скелетну структуру.",
                  "Інший спосіб, яким сучасні інструменти оживляють стародавні світи динозаврів, — це цифрова реставрація скам'янілостей. Вчені можуть відновити пошкоджені чи неповні рештки, оцінюючи скам'янілості та використовуючи технології для створення віртуальних моделей. Це допомагає проводити більш глибокі дослідження видів, віртуально відновлюючи вигляд тварини так, як вона, ймовірно, виглядала в житті.",
                  "Наприклад, група палеонтологів може виявити фрагменти черепа динозавра. Завдяки технології вони можуть обійти пошкодження, знайти симетричні частини та відтворити вигляд того, як істота могла виглядати при житті.",
                  "Завдяки розвитку штучного інтелекту (ШІ) вчені можуть ще більше революціонізувати свої дослідження. Це пов'язано з тим, що ШІ набагато легше відслідковує закономірності в формі та структурі решток, ніж людське око природно здатне.",
                  "Залежність від фізичних файлів несе значні ризики — пошкодження або втрата даних означає початок досліджень з самого початку. Завдяки комп'ютерам і таким варіантам, як збереження файлів у хмарному сховищі, зменшується занепокоєння через втрату роками зібраної роботи палеонтологів.",
                  "Технологічні досягнення також полегшують співпрацю між дослідниками, оскільки обмін і доступ до даних з будь-якої точки світу стає простішим. Підтримка зв'язку між експертами робить обмін теоріями про динозаврів зручнішим і збільшує шанси на нові відкриття.",
                ]}
              />
              <LinkToSourceComponent
                link="https://creative-beast.com/how-modern-tools-are-reviving-ancient-dinosaur-worlds/"
                text="Взято з Creative Beast"
              />
            </div>
          </div>
        </div>
        <div>
          <TitleComponent
            text="Найвідоміші знахідки"
            size="sm"
            textColor="fieryRed"
            additionalClasses="text-center"
          />
          <div className="text-center md:text-left flex flex-col gap-2">
            <div>
              <ParaghraphsComponent
                values={[
                  "Хоча деякі скам'янілості легко впізнаються та ідентифікуються, багато з них належать видам, які вже вимерли. Хоч динозаври й вимерли, їхні скам'янілості надають захоплюючу інформацію про доісторичне життя на Землі, включаючи те, як і де жили динозаври. За роки було знайдено кілька неймовірних скам'янілостей динозаврів.",
                  "Битва динозаврів (2006) У червні 2006 року фермер з Монтани Клейтон Фіпс і його команда знайшли два скелети, які збереглися в бойовій позі. Ці скам'янілості належать двом з найбільш відомих динозаврів світу — Тиранозавру рексу та Трицератопсу. Обидва динозаври добре збереглися, з шкірними покривами та, схоже, муміфікованими внутрішніми органами. Вони, ймовірно, загинули разом і були в бою один з одним через зуби, що знаходяться в хребті та тазі Трицератопса, а також латеральну тріщину в черепі Тиранозавра рекса.",
                  "Майазавра / 'Добра мати-ящірка' (1978) Вперше виявлений наприкінці 1970-х років, скам'янілість Майазаври є однією з найважливіших скам'янілостей динозаврів, надаючи неймовірно детальну інформацію про те, як динозаври колись жили — від швидкості зростання до фізичної зрілості. Вони також розкривають доказ того, як динозаври жили сім'ями і піклувались про своїх малят після того, як ті вилуплювались.",
                  "Плезіозавр (1994) У 1994 році в Альберті, Північна Америка, була знайдена ціла скам'янілість плезіозавра виду Nichollsia borealis. Зберігся весь скелет динозавра, і ця скам'янілість є однією з найстаріших повних скам'янілостей, що коли-небудь були знайдені, представляючи багатий морський доісторичний світ.",
                  "Монстр (2006) У 2006 році на арктичному острові архіпелагу Шпіцберген (Норвегія) була знайдена скам'янілість пліозавра довжиною 33 фути, що отримала назву ''Монстр''. Ця скам'янілість була не тільки найбільшою, але й найкраще збереженою скам'янілістю пліозавра.",
                  "Динозавр, що народжував (2011) У 2011 році в південному Мадзяшані, Китай, була знайдена скам'янілість самки іхтіозавра, що народжувала трьох нащадків. Ця 248 мільйонів років стара скам'янілість дає захоплюючий внесок у наукові дослідження, пов'язані з живонародженням у рептилій",
                  "Гніздо дитинчат динозаврів (2011) У 2011 році в Монголії було знайдено гніздо, яке містило рештки п'ятнадцяти дитинчат динозавра Protoceratops andrewsi. Ця знаменита скам'янілість стала першим доказом того, що молоді динозаври залишалися в гніздових середовищах на тривалий час.",
                  "Мозазавр (2015) Попередні скам'янілості мозазаврів були знайдені на прибережних територіях Європи, Північної Америки та Північної Африки, але ця скам'янілість, знайдена в Японії в 2015 році, стала першим зв'язком між Східним Тихим океаном і Близьким Сходом. Добре збережена скам'янілість також виявила, що цей динозавр мав бінокулярний зір, що надавало йому хороше глибоке сприйняття.",
                  "Диплодок (1878) Одна з найкращих знайдених скам'янілостей — Diplodocus hallorum довжиною 33 метри. Перший скелет диплодока був знайдений у 1878 році вченими з Вайомінгу Бенджаміном Маджем і Семюелем Уендлом Вілістоном.",
                  "Ігуанодон (1822) Колекція зубів ігуанодона, знайдена в Сассексі в 1822 році, стала першим доказом існування величезного доісторичного травоїдного рептилії.",
                  "Фемур мегалозавра (1676) Фемур мегалозавра був знайдений у 1676 році професором Оксфордського університету, але генетична назва була присвоєна тільки через 150 років вченим Вільямом Баклендом.",
                  "Усі ці знамениті скам'янілості динозаврів дають змогу заглянути в те, яким був наш світ мільйони років тому, і як життя на Землі змінилося з того часу. Хоча скам'янілості розкривають багато про ці стародавні живі істоти, нам ще є багато чого вивчити.",
                ]}
              />
              <LinkToSourceComponent
                link="https://www.finestfossils.co.uk/blog/10-of-the-best-dinosaur-fossils-ever-found/"
                text="Взято з Finest Fossils"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DinosaursDiscovery;
