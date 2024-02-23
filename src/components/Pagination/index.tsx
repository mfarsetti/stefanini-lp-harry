import styles from './styles.module.scss';

interface Props{
  totalPosts: number;
  postsPerPage: number;
  setCurrentPage: any;
  currentPage: any;
}


const Pagination = ({totalPosts, postsPerPage, setCurrentPage, currentPage}: Props) => {
  let pages = []

  for(let i = 1; i <= Math.ceil(totalPosts/postsPerPage); i++){
    pages.push(i)
  }

  return(
    <div className={styles.paginationWrapper}>
      {pages.map((page, index) => {

        return(
          <button key={index} onClick={() => setCurrentPage(page)} className={page === currentPage ? styles.active : ''}>
            {page}
          </button>
        )
      })}
    </div>
  );
};

export default Pagination;
