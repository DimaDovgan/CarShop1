import style from "./styles.module.scss";
import Link from 'next/link';
interface EmblemProps {
    width: number;
}
export const Emblem:React.FC<EmblemProps>=({width})=>{
    return <Link href="/"><div className={style.emblema } style={{width:`${width}px`}}>
        <p className={style.carText}>Car</p>
        <div className={style.div2}>
            <p className={style.textShop}>shop</p>
        </div>
    </div>
    </Link>
}