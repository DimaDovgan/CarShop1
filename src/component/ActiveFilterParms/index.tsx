import style from "./index.module.scss"
interface FilterInterProps {
    filter?: object;
  }
  
  export const ActiveFilterParams: React.FC<FilterInterProps> = ({ filter })=>{
    return <div className={style.filter_params_container}>
        {filter && <ul className={style.ul}>
            {Object.keys(filter).map(filterId =>{
                if(filter[filterId]!==""){
                    return <li key={filterId} className={style.li}>
                      {filter[filterId]}
                    </li>
                }
                return;
                
            }
            
              )}
            </ul>
           }
           {!filter && <p className={style.text}>Фільтри не обрані</p>}

    </div>

  }