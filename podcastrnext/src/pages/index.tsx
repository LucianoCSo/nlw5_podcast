import { useEffect } from "react";

export default function Home(props) {
  //Chamada SPA
  /* useEffect(() => {
    fetch("http://localhost:3333/episodes")
      .then(response => response.json())
      .then(data => console.log(data))
  },[]) */
  console.log(props.epsodes)
  return (
      <h1>Index</h1>
  );
}
//Chamada SSR
/* export async function getServerSideProps(){
  const response = await fetch("http://localhost:3333/episodes");
  const data = await response.json();

  return{
    props: {
      epsodes: data,
    }
  }
} */

//Chamada SSG
export async function getStaticProps(){
  const response = await fetch("http://localhost:3333/episodes");
  const data = await response.json();

  return{
    props: {
      epsodes: data,
    },
    revalidate: 60 * 60 * 8,
  }
}