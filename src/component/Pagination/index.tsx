import React from 'react';

// import Styles from './index.module.scss';
import styles from './index.module.scss';

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

const Pagination = (props: PaginationProps) => {
  const { nav = null, disable, onNextPageClick, onPrevPageClick,handleGoPage } = props;

  const handleNextPageClick = () => {
    onNextPageClick();
  };
  const handlePrevPageClick = () => {
    onPrevPageClick();
  };
  const handleGoToneedPage=(num:number)=>{
    // const data=event.target.value;
        // const atribute=event.target.getAttribute('data-position')as string;

        handleGoPage(num);
  }
  const createnavList=()=>{
    const navList=[];
    navList.push(<li className={`${styles.pagin_page} ${nav.current === 1 ? styles.active : ''}`} key={1} data-position={1} onClick={()=>handleGoToneedPage(1)} >{1}</li>)
    console.log(nav.total,"---nav.total")
    if(nav.total>=5){
      if(nav.current>3 && nav.current!=nav.total-1){
        navList.push(<li className={styles.pointin_pagination}>...</li>)
        navList.push(<li className={`${styles.pagin_page} ${nav.current === nav.current-1 ? styles.active : ''}`} key={nav.current-1} data-position={nav.current-1} onClick={()=>handleGoToneedPage(nav.current-1)} >{nav.current-1}</li>);
        navList.push(<li className={`${styles.pagin_page} ${nav.current === nav.current ? styles.active : ''}`} data-position={nav.current} onClick={()=>handleGoToneedPage(nav.current)} >{nav.current}</li>);
        navList.push(<li className={`${styles.pagin_page} ${nav.current === nav.current+1 ? styles.active : ''}`} key={nav.current+1} data-position={nav.current+1} onClick={()=>handleGoToneedPage(nav.current+1)} >{nav.current+1}</li>);
        navList.push(<li className={styles.pointin_pagination}> . . . </li>)
      }
      else if(nav.current>3 && nav.current==nav.total-1){
        navList.push(<li className={styles.pointin_pagination}>. . .</li>)
        navList.push(<li className={`${styles.pagin_page} ${nav.current === nav.current-1 ? styles.active : ''}`} key={nav.current-1} data-position={nav.current-1} onClick={()=>handleGoToneedPage(nav.current-1)} >{nav.current-1}</li>);
        navList.push(<li className={`${styles.pagin_page} ${nav.current === nav.current ? styles.active : ''}`} key={nav.current} data-position={nav.current} onClick={()=>handleGoToneedPage(nav.current)} >{nav.current}</li>);
      }else if(nav.current<3){
        
        navList.push(<li  className={`${styles.pagin_page} ${nav.current === 2 ? styles.active : ''}`} key={2} data-position={2} onClick={()=>handleGoToneedPage(2)} >{2}</li>);
        navList.push(<li className={`${styles.pagin_page} ${nav.current === 3 ? styles.active : ''}`} key={3} data-position={3} onClick={()=>handleGoToneedPage(3)} >{3}</li>);
        navList.push(<li className={styles.pointin_pagination}> . . . </li>)
      }
      else if(nav.current==3){
        
        navList.push(<li className={`${styles.pagin_page} ${nav.current === 2 ? styles.active : ''}`} key={2} data-position={2} onClick={()=>handleGoToneedPage(2)} >{2}</li>);
        navList.push(<li className={`${styles.pagin_page} ${nav.current === 3 ? styles.active : ''}`} key={3} data-position={3} onClick={()=>handleGoToneedPage(3)} >{3}</li>);
        navList.push(<li className={`${styles.pagin_page} ${nav.current === 4 ? styles.active : ''}`} key={4} data-position={4} onClick={()=>handleGoToneedPage(4)} >{4}</li>);
        navList.push(<li className={styles.pointin_pagination}> . . . </li>)
      }
      
    }
    else{
      for (let i = 1; i < nav.total-1; i++) {
        navList.push(<li className={`${styles.pagin_page} ${nav.current === i+1 ? styles.active : ''}`} key={i+1} data-position={i+1} onClick={()=>handleGoToneedPage(i+1)} >{i+1}</li>);
      }
    }
   
    if(nav.total>1){
      navList.push(<li className={`${styles.pagin_page} ${nav.current === nav.total ? styles.active : ''}`} key={nav.total} data-position={nav.total} onClick={()=>handleGoToneedPage(nav.total)} >{nav.total}</li>)
    }
    
    return navList;
   
    
  }
  
  

  return (<div className={styles.pag_div}>
    {nav.total>1 && <div className={styles.paginator}>
      {nav.total>1

      }
      <p
        className={styles.arrow}
        onClick={handlePrevPageClick}
      >
         &lt; 
      </p>
      {nav && <ul className={styles.page_num_list}>{createnavList()}</ul>}
      <p
        className={styles.arrow}
        
        onClick={handleNextPageClick}
      >
        &gt;
      </p>
    </div>}

  </div>
    
  );
};

export default React.memo(Pagination);