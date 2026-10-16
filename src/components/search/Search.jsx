import './search.scss'

function Search() {
  return (
    <div className="search-bar">
        <form action="#" method="POST" className="search-form d-flex align-items-center">
            <input type="text" name='query' placeholder="search..."/>
            <button type="submit" title="search">
                <i className="bi bi-search"></i>
            </button>
        </form>
    </div>
  )
}

export default Search
