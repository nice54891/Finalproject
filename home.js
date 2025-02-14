const name = localStorage.getItem("name");
const email = localStorage.getItem("email");
console.log(`Name: ${name}, Email: ${email}`);

// ฟังก์ชันตรวจสอบ JWT
function verifyJWT(token, secret) {
    const [header, body, signature] = token.split(".");
    const validSignature = btoa(`${header}.${body}.${secret}`);
    if (signature !== validSignature) {
        return { valid: false, reason: "Invalid signature" };
    }
    const payload = JSON.parse(atob(body));
    if (Date.now() > payload.exp) {
        return { valid: false, reason: "Token expired" }; // หมดอายุ
    }
    return { valid: true, payload };
}

// ตรวจสอบ JWT เมื่อคลิก Check JWT
document.getElementById("checkJwtBtn").addEventListener("click", function () {
    const token = localStorage.getItem("token");

    if (!token) {
        alert("No token found. Please login.");
        window.location.href = "index.html"; // กลับไปหน้าล็อกอิน
        return;
    }

    const result = verifyJWT(token, "mysecret");
    if (!result.valid) {
        if (result.reason === "Token expired") {
            alert("Token หมดอายุโปรดเข้าสู่ระบบใหม่");
            localStorage.removeItem("token"); // ลบโทเค็นที่หมดอายุ
        } else {
            alert("Invalid token. Please login again.");
        }
        window.location.href = "index.html"; // กลับไปหน้าล็อกอิน
    } else {
        alert("ยืนยันขอมูลถูกต้อง ยินดีต้อนรับ" + result.payload.username);
    }
});

// ล็อกเอาต์
document.getElementById("logoutBtn").addEventListener("click", function () {
    localStorage.removeItem("token"); // ลบโทเค็น
    alert("ออกจากระบบสำเสร็จ ขอบคุณใช้บริการของเรา");
    window.location.href = "index.html"; // กลับไปหน้าล็อกอิน
});
















