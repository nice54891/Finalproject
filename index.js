const BASE_URL=" https://6799f879747b09cdcccd2f82.mockapi.io"
let mode = "CREATE";
let selectedId = -1;

const validateData = (productData) => {
  let errors = [];
  if (!productData.pro_name) {
    errors.push("กรุณาใส่ pro_name");
  }
  if (!productData.pro_des) {
    errors.push("กรุณาใส่ pro_des");
  }
  if (!productData.pro_inch) {
    errors.push("กรุณาใส่ pro_inch");
  }
  if (!productData.pro_price) {
    errors.push("กรุณาใส่ pro_price");
  }
  if (!productData.pro_qty) {
    errors.push("กรุณาใส่ pro_qty");
  }
  if (!productData.pro_gift) {
    errors.push("กรุณาเลือกหนึ่งอย่างของ pro_gift");
  }
  return errors;
};

const submitData = async () => {
  let pro_nameDOM = document.querySelector("input[name=pro_name]");
  let pro_desDOM = document.querySelector("input[name=pro_des]");
  let pro_inchDOM =
    document.querySelector("input[name=pro_inch]:checked") || {};
  let pro_priceDOM = document.querySelector("input[name=pro_price]");
  let pro_qtyDOM = document.querySelector("input[name=pro_qty]");

  // ✅ แก้ไขตรงนี้: ใช้ querySelectorAll เพื่อดึงค่าของ checkbox หลายตัว
  let pro_giftDOMs = document.querySelectorAll("input[name=pro_gift]:checked");

  let responseMessageDOM = document.getElementById("response-message");

  // ✅ สร้าง pro_gift โดยรวมค่าทั้งหมดของ checkbox ที่ถูกเลือก
  let pro_gift = Array.from(pro_giftDOMs)
    .map((input) => input.value)
    .join(", ");

  let productData = {
    pro_name: pro_nameDOM.value,
    pro_des: pro_desDOM.value,
    pro_inch: pro_inchDOM.value,
    pro_price: pro_priceDOM.value,
    pro_qty: pro_qtyDOM.value,
    pro_gift: pro_gift,
  };

  // Validate the data
  let errors = validateData(productData);
  if (errors.length > 0) {
    responseMessageDOM.innerText = errors.join("\n");
    responseMessageDOM.className = "message danger";
    return;
  }

  try {
    let response;
    let successText = "เพิ่มข้อมูลเรียบร้อย !";

    if (mode === "EDIT") {
      response = await axios.put(
        `${BASE_URL}/product/${selectedId}`,
        productData
      );
      successText = "แก้ไขข้อมูลเรียบร้อย !";
    } else {
      response = await axios.post(`${BASE_URL}/product`, productData);
    }

    responseMessageDOM.innerText = successText;
    responseMessageDOM.className = "message success";
  } catch (error) {
    responseMessageDOM.innerText = "มีปัญหาเกิดขึ้น";
    responseMessageDOM.className = "message danger";
  }
};
