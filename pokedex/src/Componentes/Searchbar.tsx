import React, { FC, useState } from "react";
import RightArrow from "../img/right.png";
import LeftArrow from "../img/left.png";
import "./Searchbar.css";

interface IProps {
    page: number;
    setPage: Function;
    total: number;
    loading: boolean;
    notFound: boolean;
}

const Searchbar: FC<{ onSearch: Function; pagination: IProps }> = (props: {
    onSearch: Function;
    pagination: IProps;
}) => {
    const { page, setPage, total, notFound } = props.pagination;
    const onSearch = props.onSearch;
    const [search, setSearch] = useState("");

    const onChange = (e: any) => {
        setSearch(e.target.value);
    };

    return (
        <div className="searchbar-container">
            <div className="all-searchbar">
                <div className="searchbar">
                    <input
                        type="search"
                        value={search}
                        placeholder="Buscar Pokemon..."
                        onChange={onChange}
                    />
                </div>
                <div className="searchbar-btn">
                    <button
                        onClick={() => {
                            onSearch(search);
                        }}
                    >
                        Buscar
                    </button>
                </div>
                <div className="searchbar-btn">
                    <button
                        onClick={() => {
                            setSearch("");
                            onSearch();
                        }}
                    >
                        Reset
                    </button>
                </div>
            </div>
            <div className="header-btn">
                {!notFound && (
                    <div className="pagination">
                        {page !== 0 && total !== 1 && (
                            <input
                                type="image"
                                src={LeftArrow}
                                id="pagination-btn-L"
                                alt="pagination-btn-L"
                                onClick={() => {
                                    const nextPage = Math.max(page - 1, 0);
                                    setPage(nextPage);
                                }}
                            ></input>
                        )}
                        {total > 1 && (
                            <div>
                                {page + 1} de {total}
                            </div>
                        )}

                        {page !== total - 1 && (
                            <input
                                type="image"
                                src={RightArrow}
                                id="pagination-btn-R"
                                alt="pagination-btn-R"
                                onClick={() => {
                                    const nextPage = Math.min(
                                        page + 1,
                                        total - 1
                                    );
                                    setPage(nextPage);
                                }}
                            ></input>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Searchbar;
