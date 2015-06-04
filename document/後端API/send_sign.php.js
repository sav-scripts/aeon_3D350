var send_data =
{
    "name": "John",
    "sid": "H123456789",
    "birth": "1999/3/3",
    "phone": "0955666555",
    "email": "sss@ddd.ccc",
    "q_event": "0614", // 選擇場次 可能選項: 0614 0619 0621 0628 0705 0712 0719
    "q_time": "2",   // 選擇時段 可能選項: 1, 2, 3
    "q_have_licence": "是", // 是否有大型重型機車駕照
    "q_aeon_friend": "是", // 是否為AEON車友
    "q_aeon_type": "Elite300i" // 目前騎乘機型 (這項只有在 q_aeon_friend 選"是"時會給值, 選否得話就是空值)
};

var recive_data =
{
    "res": "ok"
};