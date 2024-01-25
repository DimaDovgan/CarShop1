import { Inter ,Noto_Sans_Osmanya,Roboto_Slab,Oswald,Edu_TAS_Beginner} from 'next/font/google'
 
export const Roboto = Roboto_Slab({
  subsets: ['latin'],
  display: 'swap',
  variable:'--var-Roboto',
})
export const Osw=Oswald({
    subsets: ['latin'],
  display: 'swap',
  variable:'--var-Oswald',
})
export const Edu=Edu_TAS_Beginner({
  subsets: ['latin'],
  display: 'swap',
  variable:'--var-Edu',
})
export const inter = Inter({ subsets: ['latin'],variable:'--var-Inter' })