import "./_search-box.scss";

import Input from "../input/Input";

function SearchBox() {
  return (
    <Input customClassName={"search-box"}
           placeholder={"Search Team Members"}
           type={"text"}
           iconClassName={"search-box-icon"}
    />
  );
}

export default SearchBox;
