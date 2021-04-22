import format from 'date-fns/format';
import ptBR from 'date-fns/locale/pt-BR';

import style from "./styles.module.scss";
export default function Header(){
  const curentdate = format(new Date(),  'EEEEEE, d MMMM', {
    locale: ptBR
  })
  return(
    <header className={style.headerContainer}>
      <img src="/logo.svg" alt="Podcast"/>
      <p>O melhor para você ouvir, sempre</p>
      <span>{curentdate}</span>
    </header>
  )
}