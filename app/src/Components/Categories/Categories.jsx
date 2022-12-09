import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";
import { get, getDatabase, ref } from "firebase/database";
import { useEffect, useState } from "react";
import Form from 'react-bootstrap/Form';
import "./Categories.css";
import CategoryCard from "./CategoryCard";
const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

function Categories() {
  const PRICE = "PRICE";
  const ALPHABET = "ALPHABET";
  const DESC = false;

  const [openAll, setOpenAll] = useState(false);
  const [categoryChoosen, setCategoryChoosen] = useState({});
  const [sortby, setSortby] = useState({ desc: DESC, by: PRICE })
  const [category, setCategory] = useState({});
  useEffect(() => {
    get(ref(getDatabase(), "categories")).then(snapshot => {
      if (snapshot.exists())
        setCategory(snapshot.val())
    })
  }, [])
  console.log(categoryChoosen);

  const sorter = (a, b) => {
    if (sortby.by === ALPHABET) {
      if (categoryChoosen.item[a].description > categoryChoosen.item[b].description)
        return sortby.desc ? -1 : 1;
      if (categoryChoosen.item[a].description < categoryChoosen.item[b].description)
        return sortby.desc ? 1 : -1;
      return 0;
    }
    if (sortby.by = PRICE) {
      if (parseInt(categoryChoosen.item[a].price) > parseInt(categoryChoosen.item[b].price))
        return sortby.desc ? -1 : 1;
      if (parseInt(categoryChoosen.item[a].price) < parseInt(categoryChoosen.item[b].price))
        return sortby.desc ? 1 : -1;
      return 0;
    }
  }
  return (
    <div className="categories">

      <Form.Label>Sort By Price</Form.Label>
      <Form.Select value={sortby.by} onChange={e => setSortby(v => { return { ...v, by: e.target.value } })} >
        <option value={PRICE}>Price</option>
      </Form.Select>

      {openAll && categoryChoosen.item != null
        ? Object.keys(categoryChoosen.item).sort(sorter).map((key) => {
          const elemnt = categoryChoosen.item[key]
          return (
            <CategoryCard
              setCategoryChoosen={setCategoryChoosen}
              setOpenAll={setOpenAll}
              url={elemnt.url}
              description={elemnt.description}
              type={elemnt.type}
              item={null}
              price={elemnt.price}
            />
          );
        })
        : Object.keys(category).map((key) => {
          return (
            <CategoryCard
              setCategoryChoosen={setCategoryChoosen}
              setOpenAll={setOpenAll}
              url={category[key].url}
              description={category[key].description}
              type={category[key].type}
              item={category[key].items}
            />
          );
        })
      }
    </div >
  );
}

export default Categories;
