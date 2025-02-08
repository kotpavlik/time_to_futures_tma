
import { Accessor, createSignal, Setter } from 'solid-js';
import { JettonType } from '../../zustand/wallet_store/WalletStore';

type PropsType = {
    id?: string
    name?: string
    label: Accessor<JettonType | undefined>
    value: Accessor<number>
    placeholder?: string
    inputMode: "text" | "none" | "tel" | "url" | "email" | "numeric" | "decimal" | "search" | undefined
    changeValue: Setter<number>
    setError: Setter<{
        donationAmount?: string;
    }>
}


const MyInput = ({ label, id, name, value, inputMode, changeValue, setError }: PropsType) => {






    const handleInput = (event: Event) => {
        const target = event.currentTarget as HTMLInputElement;
        let inputValue = target.value;
        inputValue = inputValue.replace(/,/g, '.');


        // Ограничиваем значение до 6 цифр перед точкой и 6 после
        const match = inputValue.match(/^(\d{0,10})(\.(\d{0,2})?)?/);
        inputValue = match ? match[0] : '0';

        // Если поле пустое, ставим "0"
        if (inputValue === '') {
            inputValue = '0';
        }

        target.value = inputValue; // Обновляем значение input
        changeValue(Number(inputValue)); // Передаем значение в состояние
        setError((prev) => ({ ...prev, donationAmount: undefined })); // Сбрасываем ошибки
    };

    const handleKeyDown = (event: KeyboardEvent) => {
        const target = event.currentTarget as HTMLInputElement;
        const key = event.key;

        // Запрет на ввод второго нуля, если значение начинается с "0" и нет точки
        if (target.value === '0' && key === '0') {
            event.preventDefault();
            return;
        }

        // Запрет на ввод второй точки или запятой
        if ((key === '.' || key === ',') && (target.value.includes('.') || target.value.includes(','))) {
            event.preventDefault();
            return;
        }

        // Заменяем "," на "." при вводе
        if (key === ',') {
            event.preventDefault();
            const cursorPos = target.selectionStart || 0;
            const valueWithDot =
                target.value.slice(0, cursorPos) + '.' + target.value.slice(cursorPos);

            target.value = valueWithDot; // Вставляем "."
            target.setSelectionRange(cursorPos + 1, cursorPos + 1); // Перемещаем курсор
            handleInput(new Event('input', { bubbles: true })); // Тригерим input событие
            return;
        }

        // Разрешаем только одну точку в значении
        if (key === '.' && target.value.includes('.')) {
            event.preventDefault();
            return;
        }

        // Запрещаем ввод всего, кроме цифр, точки, Backspace и Delete
        if (!/[\d.]/.test(key) && key !== 'Backspace' && key !== 'Delete') {
            event.preventDefault();
        }
    };



    return (
        <div class="relative ">
            <input
                onInput={handleInput}
                onKeyDown={handleKeyDown}
                id={id}
                name={name}
                type='text'
                value={value()}
                inputMode={inputMode}

                class={`w-full py-2 px-3 border-solid border-b-[2px] rounded-none 
                ${value().toString().length > 7 ? 'text-2xl pt-5 ' : 'text-4xl'} 
                    font-bold border-b-[#ff2b9c] text-[#ff2b9c] z-10 relative bg-transparent  focus:outline-none focus:border-[#00ff00] focus:text-[#00ff00]`}
            />
            <label class={`absolute right-1 top-[-12px] cursor-text font-bold z-0 transition-all  text-[#00ff00] text-sm `}>введите сумму в {label()?.symbol}</label>
            <label class=' absolute  right-1 bottom-2 text-4xl  font-extrabold  text-[#ff2b9c]   focus:text-[#00ff00]'>{label()?.symbol}</label>

        </div>

    );
}
export default MyInput