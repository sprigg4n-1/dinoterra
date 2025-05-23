import LinkToSourceComponent from "@/components/history/LinkToSourceComponent";
import ParaghraphsComponent from "@/components/history/ParaghraphsComponent";
import TitleComponent from "@/components/TitleComponent";

const EvolutionaryPeriods = ({
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
            text="Тріасовий період"
            size="sm"
            textColor="fieryRed"
            additionalClasses="text-center"
          />
          <div className="text-center md:text-left flex flex-col gap-2">
            <div>
              <ParaghraphsComponent
                values={[
                  "Початок тріасового періоду (та мезозойської ери) був похмурим часом в історії Землі. Щось—серія потужних вулканічних вивержень, зміна клімату або, можливо, зіткнення з кометою чи астероїдом—спричинило вимирання понад 90 відсотків видів живих організмів.",
                  "Однак це також був період величезних змін і відродження. Життя, що пережило так звану ''Велику загибель'', знову поширилося по планеті, пристосувалося до нових екологічних ніш і дало початок новим істотам, зокрема гризуноподібним ссавцям і першим динозаврам.",
                  "На початку тріасу всі материки Землі злилися в єдиний суперконтинент Пангею—величезну ''C''-подібну масу суші, що простягалася через екватор і до полюсів. Проте майже одразу після утворення Пангея почала розколюватися. До кінця періоду, близько 199 мільйонів років тому, тектонічні сили поступово почали ділити суперконтинент на дві частини: Лавразію на півночі та Гондвану на півдні.",
                  "Величезний океан Панталасса оточував Пангею. Прибережні райони зазнавали сезонних мусонів, але циркуляція океанських течій підтримувала теплий і посушливий клімат у глибоких внутрішніх районах. Полярні льоди були відсутні. Тетісове море, що заповнювало ''C''-подібний вигин Пангеї, стало лінією, вздовж якої розпочався розпад суперконтиненту. Раніше невдалі спроби розлому утворили рифтові долини у Північній Америці та Африці, заповнені червоними осадами, що сьогодні містять одні з найкраще збережених скам'янілостей тріасового періоду.",
                  "Моря були наповнені амонітами, молюсками та морськими їжаками, що пережили пермське вимирання і швидко розвивалися. Перші корали з’явилися, хоча рифоутворюючі організми вже існували.",
                  "Гігантські рептилії, такі як іхтіозаври (з дельфіноподібними тілами) та довгошиї плезіозаври з ластоподібними кінцівками, полювали на рибу та стародавніх головоногих молюсків. Основу харчового ланцюга складали мікроскопічні рослини—фітопланктон; дві основні групи, що з’явилися тоді, існують і сьогодні.",
                  "Жаби, саламандри, крокодили, черепахи та змії повзали берегами тріасових морів, озер і річок. У повітря піднялися птерозаври—літаючі рептилії. На суходолі мохи, печіночники й папороті вкривали ліси хвойних дерев, гінкго та саговників. У той же час розквітали павуки, скорпіони, багатоніжки та коники.",
                  "Проте, можливо, найбільші зміни відбулися з появою динозаврів і перших ссавців наприкінці тріасу, близько 230 мільйонів років тому.",
                  "Одним із перших справжніх ссавців був триметровий (1-метровий) Eozostrodon. Ця істота нагадувала землерийку, відкладала яйця, але вигодовувала дитинчат молоком.",
                  "Серед перших динозаврів був двоногий хижак Coelophysis, який виростав до 2,7 метра у висоту, важив до 45 кілограмів і, ймовірно, харчувався дрібними рептиліями та земноводними. Він з’явився близько 225 мільйонів років тому. А через кілька мільйонів років з’явився травоїдний Plateosaurus, що сягав 8 метрів завдовжки.",
                  "Тріас закінчився так само, як і почався. Щось—можливо, вулканічна активність або зіткнення з астероїдом—спричинило чергове масове вимирання. Однак динозаври пережили цю катастрофу й продовжили своє домінування в юрському періоді.",
                ]}
              />
              <LinkToSourceComponent
                link="https://www.nationalgeographic.com/science/article/triassic"
                text="Взято з National Geographic"
              />
            </div>
          </div>
        </div>
        <div>
          <TitleComponent
            text="Юрський період"
            size="sm"
            textColor="fieryRed"
            additionalClasses="text-center"
          />
          <div className="text-center md:text-left flex flex-col gap-2">
            <div>
              <ParaghraphsComponent
                values={[
                  "Динозаври, птахи та гризуни. Розпад материків і внутрішні моря. Морські чудовиська, акули та криваво-червоний планктон. Ліси з папоротей, саговників і хвойних дерев. Теплі, вологі, тропічні бризи. Це була юрська епоха, яка тривала від 199 до 145 мільйонів років тому.",
                  "На початку юрського періоду розпад суперконтиненту Пангеї продовжився і прискорився. Лавразія, північна частина, розпалася на Північну Америку та Євразію. Гондвана, південна частина, почала розколюватися в середині юри. Східна частина—Антарктида, Мадагаскар, Індія та Австралія—відокремилася від західної, яка включала Африку та Південну Америку. Нові океани затопили простори між ними. На дні океану піднімалися гори, підштовхуючи рівень моря вгору та затоплюючи континенти.",
                  "Вся ця вода надала раніше спекотному та сухому клімату вологий, субтропічний характер. Засушливі пустелі поступово позеленіли. Саговники, схожі на пальми, були повсюдно поширені, як і хвойні, такі як араукарія та сосни. Гінкго вкривали середні та високі широти північної півкулі, а подокарпи, різновид хвойних, особливо успішно розвивалися на південь від екватора. Лісові папороті також були поширені.",
                  "Океани, особливо новостворені мілководні внутрішні моря, рясніли різноманітним і численним життям. На вершині харчового ланцюга стояли довгошиї та ластоногі плезіозаври, гігантські морські крокодили, акули та скати. Рибоподібні іхтіозаври, головоногі молюски, схожі на кальмарів, та спірально-черепашкові амоніти були численні. У теплих водах виростали коралові рифи, а губки, равлики та молюски процвітали. Мікроскопічний планктон, що вільно плавав у воді, міг забарвлювати деякі частини океану в червоний колір.",
                  "На суходолі динозаври завойовували світ у буквальному сенсі. Травоїдний завропод Brachiosaurus сягав 16 метрів у висоту, мав довжину приблизно 26 метрів і важив понад 80 тонн. Інший завропод, Diplodocus, досягав 27 метрів у довжину. Їхні гігантські розміри могли відлякувати хижаків, таких як Allosaurus—крупного м’ясоїдного динозавра, що пересувався на двох потужних ногах. Але Allosaurus та інші швидконогі хижаки, наприклад целурозаври, ймовірно, час від часу досягали успіху в полюванні. Серед інших жертв були важкоозброєні стегозаври.",
                  "Найдавніший відомий птах, Archaeopteryx, піднявся в небо наприкінці юрського періоду, найімовірніше, еволюціонувавши від ранніх целурозаврових динозаврів. Archaeopteryx доводилося ділити повітряний простір із птерозаврами—літаючими рептиліями, які панували в небі ще з пізнього тріасу. Тим часом у лісах роїлися комахи, такі як цикадки та жуки, а перші ссавці метушилися під ногами динозаврів, не підозрюючи, що після зникнення динозаврів у кінці крейдового періоду саме вони стануть домінуючими істотами на Землі.",
                ]}
              />
              <LinkToSourceComponent
                link="https://www.nationalgeographic.com/science/article/jurassic"
                text="Взято з National Geographic"
              />
            </div>
          </div>
        </div>
        <div>
          <TitleComponent
            text="Крейдяний період"
            size="sm"
            textColor="fieryRed"
            additionalClasses="text-center"
          />
          <div className="text-center md:text-left flex flex-col gap-2">
            <div>
              <ParaghraphsComponent
                values={[
                  "У цей період океани сформувалися, коли материки зміщувалися та розколювалися з одного великого суперконтиненту на менші.",
                  "Під час крейдового періоду континенти активно змінювали форму Землі та життя на ній. На початку періоду динозаври панували на уламках розпадаючоїся Пангеї, тоді як гризуни метушилися в них під ногами серед лісів із папоротей, саговників і хвойних дерев. Наприкінці періоду, приблизно 80 мільйонів років потому, океани заповнили широкі розломи між ізольованими континентами, які набули сучасних обрисів. Квіткові рослини поширювалися ландшафтом, а ссавці готувалися зайняти місце, що скоро звільниться після вимирання динозаврів. У цей час на місці майбутнього півострова Юкатан тлів гігантський кратер.",
                  "Чи був саме астероїд або комета, що створили кратер Чиксулуб, причиною вимирання понад половини видів на планеті в кінці крейдового періоду, досі є предметом наукових суперечок. Однак зміщення континентів, розширення узбережжя та розширення океанів охолодили та зволожили клімат, запустивши масштабні зміни у фауні та флорі. Ймовірно, удар з космосу або період інтенсивного вулканізму став фатальним для багатьох видів Землі.",
                  "Задовго до цього крейдовий період розпочався з тих самих умов, що і юрський: гігантські завроподи бродили лісами, рівнинами та узбережжями, а довгошиї морські рептилії полювали на рибу, амонітів і молюсків. У небі ширяли птерозаври та пір'ясті птахи. Але зі зміщенням континентів океанічні течії ставали дедалі потужнішими. Після піку температур у середині періоду клімат почав охолоджуватися, що змінило хід розвитку життя.",
                  "Хоча динозаври панували протягом усього крейдового періоду, домінуючі групи змінювалися, і з’являлися нові види. Завроподи залишалися головними на південних континентах, але майже зникли на півночі. Всеїдні орнітіські динозаври, такі як Iguanodon, поширилися повсюди, окрім Антарктиди. Наприкінці крейдового періоду на північних континентах паслися величезні стада рогатих динозаврів, таких як Triceratops, які живилися саговниками та іншими низькорослими рослинами.",
                  "У цей же час серед хижаків на півночі домінував Tyrannosaurus rex, тоді як на півдні величезний Spinosaurus із вітрилоподібним гребенем на спині полював у річках. Дрібніші хижаки, ймовірно, змагалися між собою за залишки їжі.",
                  "На узбережжях і в річках процвітали жаби, саламандри, черепахи, крокодили та змії. Лісами бігали дрібні, схожі на землерийок ссавці. В небі парив найбільший відомий птерозавр, хоча вся група поступово витіснялася різноманітними птахами. Саме в цей період з’явилися предки сучасних гагар, бакланів, пеліканів і куликів.",
                  "У теплих мілководних морях, що розлилися по континентах, довгошиї плезіозаври поступилися місцем величезним змієподібним мозазаврам. Серед риб стали звичними скати та сучасні акули. Морські їжаки та зірки (морські зірки) процвітали, коралові рифи розросталися. Одноклітинні планктонні водорості—діатомові—вперше широко поширилися в океанах.",
                  "Проте справжньою подією стала швидка експансія квіткових рослин, які поширювалися за допомогою комах-запилювачів—бджіл, ос, мурах і жуків. Такі рослини, як магнолія, фікус і сассафрас, почали переважати над хвойними, гінкго та саговниками.",
                  "Але велика частина цього різноманітного життя, включаючи всіх динозаврів, птерозаврів, плезіозаврів і амонітів, зникла внаслідок катастрофічного вимирання 65 мільйонів років тому. Після цієї події ні суша, ні океани, ні небо вже ніколи не будуть такими, як раніше. Настала нова ера—кайнозойська, в якій панування перейшло до ссавців.",
                ]}
              />
              <LinkToSourceComponent
                link="https://www.nationalgeographic.com/science/article/cretaceous"
                text="Взято з National Geographic"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EvolutionaryPeriods;
