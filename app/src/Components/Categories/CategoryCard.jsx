import MoreVertIcon from "@mui/icons-material/MoreVert";
import ShareIcon from "@mui/icons-material/Share";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import MuiAlert from "@mui/material/Alert";
import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import { blueGrey } from "@mui/material/colors";
import IconButton from "@mui/material/IconButton";
import Snackbar from "@mui/material/Snackbar";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { getAuth } from "firebase/auth";
import { getDatabase, push, ref } from "firebase/database";
import { forwardRef, useState } from "react";
import "./Categories.css";

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const URl = "http://localhost:3002";
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

export default function CategoryCard({
  url,
  description,
  type,
  setCategoryChoosen,
  setOpenAll,
  item,
  price,
}) {
  const [expanded, setExpanded] = useState(false);
  const [openNotifcation, setOpenNotifcation] = useState(false);
  const [notification, setNotifcation] = useState("");
  const [error, setError] = useState("");
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ 'width': 300 }} className="card__categorey" onClick={() => {
      if (item != null)
        setCategoryChoosen({ url, description, type, item })
      setOpenAll(true);
    }}>
      <Snackbar open={openNotifcation} autoHideDuration={6000}>
        <Alert severity={error} sx={{ width: "100%" }}>
          {notification}
        </Alert>
      </Snackbar>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: blueGrey[500] }} aria-label="recipe">
            new
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={type}
        subheader="Made in israel"
      />
      <CardMedia component="img" height="200" image={url} alt={type} />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {price}$ {description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton
          onClick={() => {
            const user = getAuth().currentUser;
            if (user == null || item != null)
              return;
            const db = getDatabase();
            const userId = user.uid;
            push(ref(db, 'users/' + userId + '/cart'), {
              url: url != null ? url : "",
              description: description != null ? description : "",
              type: type != null ? type : "",
              price: price != null ? price : "",
            });
          }}
          aria-label="add to favorites"
        >
          <ShoppingCartIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}
