import { createEffect, createSignal, type Component } from 'solid-js';
import './modal.css';


export const Modal: Component<{ onClose: () => void }> = (props) => {



    const [isVisible, setIsVisible] = createSignal(false);

    createEffect(() => {
        setIsVisible(true);
        return () => setIsVisible(false); // Убираем модалку при закрытии
    });


    return (
        <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div class={`modal-content ${isVisible() ? 'show' : ''}`}>
                <h2 class="text-2xl font-bold mb-4">Модальное окно</h2>
                <p class="mb-4">Это пример вашей кастомной модалки.</p>
                <button class="bg-blue-500 text-white px-4 py-2 rounded" onClick={props.onClose}>
                    Закрыть
                </button>
            </div>
        </div>
    );
};