import classNames from "classnames/bind";
import { memo, useState, useEffect } from "react";
import useDebounce from "../../../../hooks/useDebounce";
import style from "./Search.module.scss";
import SearchResult from "./SearchResult";
const cx = classNames.bind(style);
const Search = ({ userData }) => {
    const [searchValue, setSearchValue] = useState("");
    const [results, setResults] = useState([]);
    const datas = userData.friends;
    const debounce = useDebounce(searchValue, 500);
    useEffect(() => {
        if (searchValue !== "") {
            const results = datas.filter((data) => {
                return data.userName
                    .toLowerCase()
                    .includes(searchValue.toLowerCase());
            });
            setResults(results);
        } else {
            setResults([]);
        }
    }, [debounce]);

    return (
        <div className={cx("wrapper")}>
            <div className={cx("title")}>Search</div>
            <div className={cx("search")}>
                <label htmlFor='input'>
                    <ion-icon name='search'></ion-icon>
                </label>
                <input
                    className={cx("input")}
                    id='input'
                    placeholder='Search...'
                    value={searchValue}
                    onChange={(e) => {
                        setSearchValue(e.target.value);
                    }}
                />
            </div>

            {searchValue !== "" && (
                <SearchResult results={results} searchValue={searchValue} />
            )}
        </div>
    );
};

export default memo(Search);
