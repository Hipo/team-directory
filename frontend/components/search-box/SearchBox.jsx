import "./_search-box.scss";

import Input from "../input/Input";

function SearchBox() {
    return (
        <Input customClassName={"search-box"} 
            placeholder={"Search ${66} Team Members"} 
            type={"string"}
            iconClassName={"search-box-icon"}
        />
    );
}

export default SearchBox;