function Pagination({ paginationInfo, handlePaginationOnClick, page, setPage }) {

    let numbersOfWindows = Math.ceil(paginationInfo.count / paginationInfo.limit);
    let content = [];
    for (let i = 1; i <= numbersOfWindows; i++) {
        content.push(<li className={page != i ? "page-item" : "page-item active"} key={i}>
            <a className="page-link" href="#" onClick={() => {
                setPage(i);
                handlePaginationOnClick(i);
            }}>{i}
            </a>
        </li>);
    };

    return (
        <>
            <nav>
                <ul className="pagination shadow-sm">
                    <li className="page-item">
                        <a className="page-link" href="#" onClick={(e) => {
                            e.preventDefault();
                            if (page > 1) {
                                setPage(page - 1);
                                handlePaginationOnClick(page - 1);
                            }
                        }}>&laquo;
                        </a>
                    </li>
                    {content.map(item => (item))}
                    <li className="page-item">
                        <a className="page-link" href="#" onClick={() => {
                            if (page < numbersOfWindows) {
                                setPage(page + 1);
                                handlePaginationOnClick(page + 1);
                            }
                        }}>&raquo;
                        </a>
                    </li>
                </ul>
            </nav>
        </>
    )
}

export default Pagination;
