import style from "./DropDownList.module.scss"

interface CustomSelectProps {
    options: Array<{ value: string}>;
    onChange: (selectedOption: { value: string ,lable:string} | null) => void;
    lable:string;
    width:number;
  }
  
  const DropDownList: React.FC<CustomSelectProps> = ({ options, onChange ,lable,width}) => {

    const selectOption =(event: React.MouseEvent<HTMLInputElement>)=>{
      event.preventDefault();
      const value=event.target.getAttribute('data-value')as string;
      const lable=event.target.getAttribute('data-lable')as string;
      onChange({value,lable});
    }

    const containerStyles = {
      ...(width && { width }), // Додаємо ширину до стилів, якщо вона є визначеною
    };

    return (<div className={style.component} style={containerStyles}>
        <ul>
          {options.map(({value})=><li key={value} onClick={selectOption} data-value={value} data-lable={lable}>{value}</li>)}
        </ul>
        </div>)
  }
  export default DropDownList;