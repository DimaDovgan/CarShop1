 import Link from "next/link"
import styles from "./footer.module.scss"
import { Instagram,Twitter,Facebook,Linkedin } from "@/svgs";

 export const Footer:React.FC=()=>{
    return<div className={styles.footer_container}>
        <ul className={styles.footer_socialmedia_list} >
            <li>
                <Link href="https://www.instagram.com/" target="_blank">
                <Instagram className={styles.footer_socialmedia_icon}/>
                </Link>
            </li>
            <li>
                <Link href="https://www.instagram.com/" target="_blank">
                <Twitter className={styles.footer_socialmedia_icon}/>
                </Link>
            </li>
            <li>
                <Link href="https://www.instagram.com/" target="_blank">
                <Facebook className={styles.footer_socialmedia_icon}/>
                </Link>
            </li>
            <li>
                <Link href="https://www.linkedin.com/in/dima-dovhan-71b219246/" target="_blank">
                <Linkedin className={styles.footer_socialmedia_icon}/>
                </Link>
            </li>
        </ul>
    </div>
}

