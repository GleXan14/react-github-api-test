import { useState } from "react";
import SearchIcon from '@mui/icons-material/Search';

interface Props{
    onSearch: (text:string) => void
}

function CustomSearch(props:Props){

    const[inputText, setInputText] = useState<string>("");
    const {onSearch} = props;


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputText(e.target.value);
    }

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        onSearch(inputText);
    }

    return (
        <div className="custom-search">
            <input className="custom-search-input" type="text" 
            value={inputText} placeholder="Buscar..." onChange={handleInputChange}></input>
            <button className="custom-search-button" onClick={handleClick}>
                <SearchIcon fontSize="small" />
                <span>BUSCAR</span>
            </button>
        </div>
    )
}

export default CustomSearch;