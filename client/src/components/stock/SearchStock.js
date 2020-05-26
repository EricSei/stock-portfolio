import React, {useState} from 'react';
import alphavantage from '../../api/alphavantage';

const SearchStock = () => {

    const [error, setError] = useState(null);

    const [query, setQuery ] = useState({
        query: ''
    });

    const [ results, setResults ] = useState([]);

    const onChange = e => {
        setQuery({ ...query, [e.target.name]: e.target.value });
        onSearch(e.target.value);
    };

    //search ticker through Alpha Vitage API
  const onSearch = async searchTicker => {
    
    try {
      const response =  await alphavantage.get('/query', {
        params: {
          function: 'SYMBOL_SEARCH',
          keywords: searchTicker,
          apikey: 'NNQ0O9QYKCR2M9MF'
        }
      });
      const symbol = response.data['bestMatches'][0]['1. symbol'];
      const company = response.data['bestMatches'][0]['2. name'];
      setResults(Object.values(response.data.bestMatches));

    }catch(error){
      if(error){
        setError('Invalid Ticker');
        //console.log(error)
      }
    }
    
  }

  return(
      <div>
          <form>
            <input
                type='text'
                placeholder="Search company for suggestion..."
                onChange={onChange}
                name='ticker'
                />
                <p>
                    {results.map(item => {
                        return(
                            <li key={item.id}>
                                {item['1. symbol']},  {item['2. name']}
                            </li>
                        )
                    })}
                </p>
          </form>
      </div>
  )

}

export default SearchStock;