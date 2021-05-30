import React, {FC, useState} from "react";
import './Searchbar.css'



interface IProps {
  page: number,
  setPage: Function,
  total: number,
  loading: boolean
}

const Searchbar:FC<{onSearch:Function, pagination:IProps}> = (props: {onSearch:Function, pagination:IProps}) => {
  const {page, setPage, total}  = props.pagination;
  const  onSearch  = props.onSearch;
  const [search, setSearch] = useState("");

  const onChange = (e:any) => {
    setSearch(e.target.value);
    console.log(search);
  };


  return (
    <div className="searchbar-container">
        <div className="all-searchbar">
            <div className="searchbar">
                <input placeholder="Buscar pokemon..." onChange={onChange} />
            </div>
            <div className="searchbar-btn">
                <button onClick={() => {onSearch(search)}}>Buscar</button>
            </div>
            <div className="searchbar-btn">
                <button onClick={() => {onSearch()}}>X</button>
            </div>
        </div>
        <div className="header-btn">
            <div className="pagination">
                <button className="pagination-btn" onClick={() => {
                    const nextPage = Math.max(page - 1, 0);
                    setPage(nextPage);
                }}>
                    <div className="icon">
                      {'<'}
                    </div>
                </button>
                <div>
                    {page+1} de {total}
                </div>
                <button className="pagination-btn" onClick={() => {
                    const nextPage = Math.min(page + 1, total - 1);
                    setPage(nextPage);
                }}>
                    <div className="icon">
                      {'>'}
                    </div>
                </button>
            </div>
        </div>
    </div>
  );
};

export default Searchbar;
