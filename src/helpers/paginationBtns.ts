type PaginationProps = {
    onNextPageClick: () => void;
    onPrevPageClick: () => void;
    handleGoPage:(data:number)=>void;
    disable: {
      left: boolean;
      right: boolean;
    };
    nav?: {
      current: number;
      total: number;
    };
  };


const createnavList = (prop:PaginationProps) => {
    const navList = [];
  
    // Визначаємо кількість сторінок, які показуватимемо перед і після активної сторінки
    const showPages = 2;
  
    // Визначаємо діапазон сторінок, які будемо відображати
    const startPage = Math.max(1, nav.current - showPages);
    const endPage = Math.min(nav.total, nav.current + showPages);
  
    // Додаємо кнопку "Перша сторінка", якщо активна сторінка не перша
    if (nav.current > 1) {
      navList.push(
        <li key="first" onClick={() => handleGoToneedPage(1)}>
          {1}
        </li>
      );
    }
  
    // // Додаємо кнопку "Попередня сторінка", якщо активна сторінка не перша
    // if (nav.current > 1) {
    //   navList.push(
    //     <li key="prev" onClick={() => handleGoToneedPage(nav.current - 1)}>
    //       {'<'}
    //     </li>
    //   );
    // }
  
    // Додаємо сторінки
    for (let i = startPage; i <= endPage; i++) {
      navList.push(
        <li key={i} data-position={i} onClick={() => handleGoToneedPage(i)}>
          {i}
        </li>
      );
    }
  
    // Додаємо кнопку "Наступна сторінка", якщо активна сторінка не остання
    if (nav.current < nav.total) {
      navList.push(
        <li key="next" onClick={() => handleGoToneedPage(nav.current + 1)}>
          {'>'}
        </li>
      );
    }
  
    // Додаємо кнопку "Остання сторінка", якщо активна сторінка не остання
    if (nav.current < nav.total) {
      navList.push(
        <li key="last" onClick={() => handleGoToneedPage(nav.total)}>
          {nav.}
        </li>
      );
    }
  
    return navList;
  };