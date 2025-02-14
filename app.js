// ตัวอย่างของข้อมูลผู้ใช้
const mockUser = {
    username: "Nice",
    password: "555880",
    name: "doungkmon",
    email: "nnicggkkm@gmail.com",
};

// ฟังก์ชันสำหรับสร้าง JWT
function createJWT(payload, secret, expiresInSeconds = 20) {
    const header = btoa(JSON.stringify({ alg: "HS256", typ: "JWT" }));
    const body = btoa(
        JSON.stringify({
            ...payload,
            exp: Date.now() + expiresInSeconds * 1000, // แปลงวินาทีเป็นมิลลิวินาที
        })
    );
    const signature = btoa(`${header}.${body}.${secret}`);
    return `${header}.${body}.${signature}`;
}

// การจัดการเมื่อคลิกล็อกอิน
document.getElementById("loginForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // ตรวจสอบ username และ password
    if (username === mockUser.username && password === mockUser.password) {
        // สร้าง JWT
        const token = createJWT({ username: mockUser.username }, "mysecret", 30); // อายุ 

        // เก็บ JWT ลงใน localStorage
        localStorage.setItem("token", token);

        // เก็บข้อมูลชื่อและอีเมลของผู้ใช้ใน localStorage
        localStorage.setItem("name", mockUser.name);
        localStorage.setItem("email", mockUser.email);

        alert("เข้าสู่ระบบสำเสร็จ");
        window.location.href = "home.html"; // ไปยังหน้า home
    } else {
        alert("กรุณาใส่ชื่อหรือใส่รหัสผ่านใหม่");
    }
});
