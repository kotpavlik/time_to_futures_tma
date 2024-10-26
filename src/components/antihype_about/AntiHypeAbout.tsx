import { Component, createSignal } from 'solid-js';
import { CoinsDataType, useUserStore } from '../../zustand/user_store/UserStore';
import './AntiHypeAboutButton.css';
import { useQuestionsStore } from '../../zustand/questions_store/QuestionsStore';


export const AntiHypeAbout = (onClose: () => void) => {

    const uppdateCoins = useUserStore(state => state.updateCoins)
    const user_id = useUserStore(state => state.user.userId)
    const questions_data = useQuestionsStore(state => state.Questions)
    const setVerified = useQuestionsStore(state => state.setVerified)





    const uppdateCoinsForAboutAntihype = () => {
        if (user_id !== null) {
            const earn_coins: CoinsDataType = {
                coins: 250,
                userId: user_id()!
            }
            // const AboutAntiHype = questions_data().filter(question => question.question === 'AntiHypeAboutbout')
            // console.log(AboutAntiHype)

            onClose()
            uppdateCoins(earn_coins)
            // setVerified({ id: AboutAntiHype[0]._id, verified: true })

        }
    }




    const openExternalLink = (url: string) => {
        window.open(url, '_blank', 'noopener,noreferrer');
    };

    return (
        <div class="text-start flex flex-col items-center">
            <h1 class="text-sm font-extrabold pt-4">
                Презентация инвестиционного продукта канала - фьючерсного сигнального советника <span class="text-[#ff2b9c]">Antihyip Advisor v2.0</span>
            </h1>
            <p class="text-xs font-light pt-4 italic">
                Привет, уважаемый читатель и, надеюсь, подписчик моего канала!
                Как долго вы торгуете на фьючерсах? Я уверен, что каждый из вас сталкивался с "телеграм-трейдерами": ребята, которые гарантируют вам прибыль, разгоняют счета, уверяют, что плечи <span class="font-bold text-[#00ff00]">X50-X100</span>  - это нормально, и плечо <span class=" font-bold">НИКАК</span> не повлияет на торговлю - всё лишь бы вы заплатили <span class="font-bold text-[#00ff00]">$100-$200</span>. Знакомо? Много заработали? И вот после встречи с такими "трейдерами" у вас и формируется мнение о рынке фьючерсов - "казино". Стоит сказать, что риски на фьючерсах высокие, однако если их уметь контролировать, то  можно стабильно торговать в профит, а сам по себе фьючерс - инструмент сохранения капитала! <span class=" font-bold">Удивлены?</span>
            </p>


            <p class="text-xs font-bold pt-4 ">
                Познакомимся ?
            </p>

            <p class="text-xs font-bold pt-1 ">
                <img src="https://kotpavlik.github.io/time_to_futures_tma/assets/gifs/rzF.gif" alt="hello gif" />
            </p>

            <p class="text-xs font-light pt-1 lowercase text-[#b7b7b7]">
                Я знакомлюсь с каждым новым подписчиком при открытии канала
            </p>

            <p class="text-xs font-bold pt-4 ">
                Кто я такой?
            </p>

            <p class="text-xs font-light pt-1 italic">
                Меня зовут <span class='text-[#00ff00] font-bold'>Сергей</span>, и уже <span class='text-[#00ff00] font-bold'>9-й год я живу рынком</span>, а <span class="text-[#00ff00] font-bold">70%</span> моего дохода  - это <span class="uppercase text-[#00ff00] font-bold">трейдинг</span>.
                В 2014 году я пришел работать менеджером в финансовый отдел банковского брокера - обрабатывать заявки от клиентов на открытие счетов. На самом деле это та еще скукота, я чуть не уволился. Однако меня очень интересовал рынок еще с начала 2008 года и кризиса, когда мой школьный учитель смог заработать более 140% за год на падении рынков! Как? <span class="text-[#00ff00] font-bold">Вот и я захотел разобраться</span> 🤓
            </p>
            <p class="text-xs w-full font-bold pt-4 ">
                <img src="https://kotpavlik.github.io/time_to_futures_tma/assets/gifs/4BON.gif" alt="hello gif" width={'100%'} />
            </p>
            <p class="text-xs font-light pt-1 lowercase text-[#b7b7b7]">
                Как я видел трейдеров в 2014 году
            </p>
            <div class="text-xs font-light pt-4 italic">
                <p class="text-[#ff2b9c] font-bold not-italic">Я перевелся в отдел аналитики. Тут и было самое интересное время: ночи без сна и торговля!</p>
                <ul class="pt-1">
                    <li><span class="text-xs font-bold not-italic">2015 год</span> -  ведущий на региональном ТВ и автор рубрики "Экономика и финансы";</li>
                    <li><span class="text-xs font-bold not-italic">2016 год</span> - руководитель департамента аналитики;</li>
                    <li><span class="text-xs font-bold not-italic">2017 год</span> - повышение и переезд в "миллионник", новая команда;</li>
                    <li><span class="text-xs font-bold not-italic">2018 год</span> - привлечение в $1.200.000 за год и объем торговли в $550.млн;</li>
                    <li><span class="text-xs font-bold not-italic">январь 2020 года</span> - увольнение и уход в торговлю, ведение своего блога по торговле и инвестициям;</li>
                    <li><span class="text-xs font-bold not-italic">апрель 2020 года</span> - потеря 80% капитала из-за жадности, понимание, что нужно подключать техническое образование;</li>
                    <li><span class="text-xs font-bold not-italic">май 2020</span>- начало разработки алгоритма для торговли на фьючерсах на крипту;</li>
                    <li> <span class="text-xs font-bold not-italic">декабрь 2020</span> - тест торгового алгоритма;</li>
                    <li><span class="text-xs font-bold not-italic">июнь 2021</span> - запуск проекта.</li>

                </ul>
            </div>
            <p class="text-xs font-bold pt-4 ">
                <img src="https://kotpavlik.github.io/time_to_futures_tma/assets/gifs/NHlv.gif" alt="hello gif" width={'100%'} />
            </p>
            <p class="text-xs font-light pt-1 lowercase text-[#b7b7b7]">
                вспомнил свой 2016
            </p>
            <p class="text-xs font-bold pt-4 text-[#ff2b9c]">
                Что такое Antihyip Advisor?
            </p>
            <p class="text-xs font-light pt-1 italic">
                Это сигнальный торговый индикатор, который является моей личной торговой стратегией. Она "зашита в код", т.е. по определенным вводным индикатор самостоятельно анализирует фьючерсы и спот, предоставляет торговые сигналы как на вход в сделку, так и на выход.
            </p>
            <p class="text-xs font-bold pt-4 text-[#ff2b9c]">
                Что конкретно он анализирует?
            </p>
            <div class="text-xs font-light pt-1 italic">
                <ul >
                    <li>- Торговый объем на конкретных локальных уровнях;</li>
                    <li>- "Стакан цен" и количество заявок на покупку и продажу;</li>
                    <li>- Приток стейлбкойнов или отток в конкретном блокчейне;</li>
                    <li>- Самостоятельно делает аналитику согласно базовому ТА (тренды, фигуры, уровни);</li>
                    <li>- Сигналы фильтруются через 3 компьютерных индикатора.</li>
                </ul>
            </div>
            <p class="text-xs font-bold pt-4 text-[#ff2b9c]">
                Какие риски?
            </p>
            <p class="text-xs font-light pt-1 italic">
                Сейчас существует несколько стратегий, я распишу по стандартной модели торговли:

                С точки зрения риск-менеджмента на <span class='text-[#00ff00] font-bold'>1 фьючерс берется 0.2%-0.5% депозита</span>, <span class="text-[#ff2b9c] font-bold">Stop Loss - 15% по графику</span>, а средний <span class="text-[#00ff00] font-bold">Take Profit - 20%.</span>
                При соблюдении правил управления капиталом и учитывая частоту торговли риск составляет порядка 50% капитала, при условии что процент прибыльных сделок будет крайне низок.
            </p>
            <p class="text-xs font-bold pt-4 text-[#ff2b9c]">
                Какая доходность?
            </p>
            <p class="text-xs font-light pt-1 italic">
                С сентября 2022 доходность составляет <span class="text-[#00ff00] font-bold">+700%</span>
                <br />Проверить можно

                <span onClick={() => openExternalLink("https://www.myfxbook.com/members/SergM/%D1%80%D0%BE%D0%B1%D0%BE%D1%82-btcusdt--4-%D0%B0%D0%BB%D1%8C%D1%82%D0%BA%D0%BE%D0%B9%D0%BD%D0%B0/10220168 ")}
                    class='text-[#00ff00] font-bold bg-[#ff2b9c] mx-[2px] px-[2px] active:bg-[#00ff00] active:text-[#ff2b9c]
                         transition-all rounded-sm not-italic'>ТУТ</span>

                -  я включил бота на брокере и подключил сторонний мониторинг, чтобы вы смогли проверить сделки в режиме онлайн, реальность торговли и статистики!
                <br />Данный счет подписчика, в феврале 2024 года он закрыл часть сделок, вывел прибыль и перевел всё на биржу
                <br />Стартовый депозит- <span class="text-[#00ff00] font-bold">5.000USDT</span>
                <br />Баланс на 12.02.2024 <span class="text-[#00ff00] font-bold">50.200USDT</span>
                <br />Есть так же постоянные мониторинги результатов фьючерсного бота и спотового бота
            </p>
            <p class="text-xs font-light pt-4 italic">
                статистика фьючерсной торговли по сигналам бота
                <span onClick={() => openExternalLink("https://tradermake.money/ru/trader/ANTIHYIP1TRADE/ ")}
                    class='text-[#00ff00] font-bold bg-[#ff2b9c] mx-[2px] px-[2px] active:bg-[#00ff00] active:text-[#ff2b9c]
                             transition-all rounded-sm not-italic'>ТУТ</span>
                <br />статистика спотовой торговли по сигналам бота
                <span onClick={() => openExternalLink("https://tradermake.money/ru/trader/AHTIHYIPSPOT/")}
                    class='text-[#00ff00] font-bold bg-[#ff2b9c] mx-[2px] px-[2px] active:bg-[#00ff00] active:text-[#ff2b9c]
                             transition-all rounded-sm not-italic'>ТУТ</span>
            </p>

            <p class="text-xs font-bold w-full pt-4 ">
                <img src="https://kotpavlik.github.io/time_to_futures_tma/assets/gifs/59KW.gif" alt="hello gif" width={'100%'} />
            </p>

            <p class="text-xs font-bold pt-4 text-[#ff2b9c]">
                Как я могу зарабатывать вместе с твоим советником?
            </p>

            <p class="text-xs font-light pt-1 italic">
                -Торговля самостоятельно по сигналам
                <br />-Использование копитрейдинга
                <br />Я оказываю полную поддержку в виде 2-х созвонов в неделю и разбором открытия и закрытия сделок, а также стратегий торговли.
                <br /> Реализован автоматический копитрейдинг на брокере Finandy (Binance),MEXC
            </p>
            <p class="text-xs font-bold pt-4 text-[#ff2b9c] uppercase">
                хочешь получить доступ?
            </p>
            <button onClick={uppdateCoinsForAboutAntihype}
                class="go_next_button text-white select-none w-auto mt-4 text-2xl bg-[#ff2b9c]
             transition-all rounded-sm p-2 uppercase
            "><span class='bg-gray-900/60 p-1  rounded-sm active:bg-gray-900/80  transition'>погнали дальше</span></button>
        </div>
    )
}