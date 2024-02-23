import { useEffect, useState } from "react";

import api from '../../services/api';
import styles from './styles.module.scss';

import Gryffindor from '../../assets/gryffindor.jpeg';
import Hufflepuff from '../../assets/hufflepuff.jpeg';
import Ravenclaw from '../../assets/ravenclaw.jpeg';
import Sonserina from '../../assets/sonserina.jpeg';
import Pagination from "../Pagination";

const Cards = () => {
  const [data, setData] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [postPerPage, setPostPerPage] = useState(20)

  console.log(setPostPerPage)


  useEffect(() => {
    api
      .get("characters")
      .then((response) => setData(response.data))
      .catch((err) => {
        console.error("ops! ocorreu um erro" + err);
      });
  }, []);

  const lastPostIndex = currentPage * postPerPage;
  const firstPostndex = lastPostIndex - postPerPage;
  const currentCards = data.slice(firstPostndex, lastPostIndex)

  return(
    <div className={styles.cardWrapper}>
      {currentCards.map((item:any) => {
        const name = item.name.split('')
        return(
          <div key={item.id}  className={styles.cardItem}>
            <div className={styles.imageCharacter}>
              {item.image === '' ? (
                <p className={styles.nameImage}>{name[0]}</p>
              ) : (
              <img src={item.image} className={styles.cardImage} alt={item.name} />
              )}
            </div>
            <p>{item.name}</p>
            <p className={styles.date}>{item.dateOfBirth}</p>
            <p>{item.patronus}</p>
            <p>{item.actor}</p>
            {item.house === "Gryffindor" ? (
              <img src={Gryffindor} className={styles.cardHouse} alt="Gryffindor"/>
            ) : item.house === "Slytherin" ? (
              <img src={Sonserina} className={styles.cardHouse} alt="Slytherin"/>
            ) : item.house === "Ravenclaw" ? (
              <img src={Ravenclaw} className={styles.cardHouse} alt="Ravenclaw"/>
            ) : <img src={Hufflepuff} className={styles.cardHouse} alt="Hufflepuff"/>}
            {item.alive ? (
              <p className={styles.alive}>está vivo</p>
            ) : (
              <p className={styles.alive}>não está vivo</p>

            )}
          </div>
        )
      })}
      <Pagination totalPosts={data.length} postsPerPage={postPerPage} setCurrentPage={setCurrentPage} currentPage={currentPage}/>
    </div>
  );
};

export default Cards;
