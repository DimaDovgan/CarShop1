import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
export const notifyWarn = (message: string): void => {
    toast.warn(message,  {
     icon: '🙁',
     autoClose: 5000, // Тривалість в мілісекундах (5 секунд)
     position: 'top-right', // Можете змінити позицію, якщо потрібно
     hideProgressBar: true, // Чи показувати прогрес бар
     closeOnClick: true, // Закрити при кліку
     pauseOnHover: true, // Призупинити при наведенні миші
     draggable: true, // Чи можна перетягувати
   });
 }

 export const notifySuccess = (message: string): void=> {
    toast.success(message,  {
     icon: '😎',
     autoClose: 5000, // Тривалість в мілісекундах (5 секунд)
     position: 'top-right', // Можете змінити позицію, якщо потрібно
     hideProgressBar: true, // Чи показувати прогрес бар
     closeOnClick: true, // Закрити при кліку
     pauseOnHover: true, // Призупинити при наведенні миші
     draggable: true, // Чи можна перетягувати
   });
   
 };
