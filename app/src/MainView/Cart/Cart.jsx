import MuiAlert from "@mui/material/Alert";
import Dialog from "@mui/material/Dialog";
import Snackbar from "@mui/material/Snackbar";
import { getAuth } from "firebase/auth";
import { getDatabase, onValue, ref, remove } from "firebase/database";
import PropTypes from "prop-types";
import React, { forwardRef, useEffect, useRef, useState } from "react";
import BootButton from 'react-bootstrap/Button';
import Col from "react-bootstrap/esm/Col";
import BootForm from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import { VisaCreditCard as VisaCard } from "react-fancy-visa-card";
import { useNavigate } from "react-router-dom";
import Card from "./Card";
const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const emails = ["username@gmail.com", "user02@gmail.com"];
const URl = "http://localhost:3002";

function SimpleDialog(props) {
  const { onClose, selectedValue, payShow, total, setData } = props;
  const [openNotifcation, setOpenNotifcation] = useState(false);
  const [notification, setNotifcation] = useState("");
  const [error, setError] = useState("");
  const handleClose = () => {
    onClose(selectedValue);
  };

  const pay = (e, data) => {
    console.log(e);
    console.log(data);
    if (
      !data.creditCardCvv ||
      !data.creditCardExpMonth ||
      !data.creditCardExpYear ||
      !data.creditCardHolderName ||
      !data.creditCardNumber
    ) {
      setOpenNotifcation(true);
      const timer = setTimeout(() => {
        setOpenNotifcation(false);
        clearTimeout(timer);
      }, 2000);
    } else {
      handleClose();
      setNotifcation(true);
      fetch(URl + "/user/removeCart", {
        method: "POST", // or 'PUT',
        cache: "no-cache",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: localStorage.getItem("user"),
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.ok) {
            setData([]);
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };

  return (
    <Dialog onClose={handleClose} payShow={payShow}>
      <VisaCard
        onSubmit={pay}
        submitBtnTxt={`total ${total}$`}
        frontCardColor="linear-gradient(50deg, #f3c680, hsla(179,54%,76%,1))"
      />
      <Snackbar payShow={openNotifcation} autoHideDuration={6000}>
        <Alert severity={"error"} sx={{ width: "100%" }}>
          please fill all the inputs{" "}
        </Alert>
      </Snackbar>
    </Dialog>
  );
}
//removeCart
SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  payShow: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};
function Cart() {
  const [payShow, setPayShow] = useState(false);
  const [checkoutDisabled, setCheckoutDisabled] = useState(true);
  const [selectedValue, setSelectedValue] = useState(emails[1]);
  const [cardNumber, setCardNumber] = useState("");
  const [yearNumber, setYearNumber] = useState("");
  const [monthNumber, setMonthNumber] = useState("");
  const [cvv, setCvv] = useState("");
  const [holderName, setHolderName] = useState("");
  const [data, setData] = useState([]);
  const [openNotifcation, setOpenNotifcation] = useState(false);
  const [notification, setNotifcation] = useState("");
  const [confirmShow, setConfirmShow] = useState(false);
  const closeConfirm = () => setConfirmShow(false);
  const closePayment = () => setPayShow(false);
  const total = useRef(0);

  const navigate = useNavigate();
  const db = getDatabase()
  const user = getAuth().currentUser;
  let cartRef;
  if (user != null)
    cartRef = ref(db, "users/" + user.uid + "/cart");
  else
    navigate("/")
  useEffect(() => {
    if (user != null)
      onValue(cartRef, snapshot => {
        if (snapshot.exists())
          setData(snapshot.val())
        else
          setData([])
      })
  }, []);
  return (
    <div className="cat">
      <button disabled={data.length === 0} onClick={() => setPayShow(true)} className="buy__now">
        Buy now
      </button>
      <label htmlFor="">{total.current}$</label>
      <div className="cart__container">
        {Object.keys(data).map((key, index) => {
          const item = data[key];
          total.current += parseInt(item.price);
          return (
            <Card
              url={item.url}
              description={item.description}
              price={item.price}
              index={index}
              keyl={key}
              total={total}
            />
          );
        })}
      </div>
      <Modal show={payShow} onHide={closePayment}>
        <Modal.Header closeButton>
          <Modal.Title>
            Checkout
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <BootForm.Label>
            Card Number
          </BootForm.Label>
          <BootForm.Control value={cardNumber} onChange={e => {
            const val = e.target.value
            const spaceLess = val.replace(/ /g, '')
            if (!isNaN(spaceLess) && spaceLess.length <= 16)
              setCardNumber(val)
          }} />
          <BootForm.Label>
            CVV
          </BootForm.Label>
          <BootForm.Control value={cvv} onChange={e => {
            const val = e.target.value
            if (!isNaN(val) && val.length <= 3)
              setCvv(val)
          }} />
          <BootForm.Label>
            Card Holder Name
          </BootForm.Label>
          <BootForm.Control value={holderName} onChange={e => {
            const val = e.target.value
            setHolderName(val.replace(/\d/g, ''))
          }} />
          <BootForm.Label>
            Expiry Date
          </BootForm.Label>
          <Row>
            <Col>
              <BootForm.Label>
                Year
              </BootForm.Label>
              <BootForm.Control value={yearNumber} onChange={e => {
                const val = e.target.value
                if (!isNaN(val) && val.length <= 4)
                  setYearNumber(val)
              }} />
            </Col>
            <Col>
              <BootForm.Label>
                Month
              </BootForm.Label>
              <BootForm.Control value={monthNumber} onChange={e => {
                const val = e.target.value
                if (!isNaN(val) && val.length <= 2)
                  setMonthNumber(val)
              }} />
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <BootButton variant="danger" onClick={closePayment}>
            Cancel
          </BootButton>
          <BootButton disabled={!(
            cardNumber.replace(/ /g, '').length === 16 &&
            holderName.length > 0 &&
            yearNumber.length === 4 &&
            monthNumber.length > 0 &&
            cvv.length === 3 &&
            parseInt(yearNumber) >= new Date().getFullYear() &&
            parseInt(yearNumber) <= 3000 &&
            parseInt(monthNumber) <= 12 &&
            parseInt(monthNumber) > 0
          )} variant="success" onClick={() => {
            closePayment();
            setConfirmShow(true);
            remove(cartRef);
          }}>
            Confirm
          </BootButton>
        </Modal.Footer>
      </Modal>
      <Modal show={confirmShow} onHide={closeConfirm}>
        <Modal.Header closeButton>
          <Modal.Title>Order Sent</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Your order was sent and should arrive shortly. Thanks for buying!
        </Modal.Body>
        <Modal.Footer>
          <BootButton variant="primary" onClick={closeConfirm}>
            Exit
          </BootButton>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Cart;
