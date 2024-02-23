import { useEffect, useState } from "react";

import api from '../../services/api';
import styles from './styles.module.scss';

const Cards = () => {
  const [data, setData] = useState([])

  useEffect(() => {
    api
      .get("characters")
      .then((response) => setData(response.data))
      .catch((err) => {
        console.error("ops! ocorreu um erro" + err);
      });
  }, []);


  return(
    <div className={styles.cardWrapper}>
      {data.map((item:any) => {
        return(
          <div key={item.id}  className={styles.cardItem}>
            <img src={item.image} alt="" />
            <p>{item.name}</p>
          </div>
        )
      })}
    </div>
  );
};

export default Cards;
