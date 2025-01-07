import "./pagination.css";

const Pagination = ({pages, currentPage, setCurrentPage}) => {
    const generatedPages = [];
    for(let i = 1; i <= pages; i++) {
        generatedPages.push(i);
    }

    return ( 
        <div className="pagination">
            <button 
             className="page next"
             onClick={() => setCurrentPage(current => current + 1)}
             disabled={currentPage === pages}
            >
                التالي
            </button> 
            {generatedPages.map(page => (
                <div 
                 onClick={() => setCurrentPage(page)} 
                 key={page} 
                 className={currentPage === page ? "page active" : "page"} 
                >
                    {page}
                </div>
            ))}
           <button 
             className="page previous"
             onClick={() => setCurrentPage(current => current - 1)}
             disabled={currentPage === 1}
            >
                السابق
            </button>
        </div>
     );
}
 
export default Pagination;