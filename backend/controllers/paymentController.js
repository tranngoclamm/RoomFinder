// controllers/paymentController.js
const crypto = require('crypto');
const moment = require("moment");
const querystring = require('qs');
const Room = require('../models/roomModel'); // Sử dụng require
const House = require('../models/houseModel'); // Sử dụng require
const Apartment = require('../models/apartmentModel'); // Sử dụng require
const FindRoommate = require('../models/findRoommateModel'); // Sử dụng require
const Payment = require('../models/paymentModel'); // Sử dụng require
var itemId = '';
var amount = 0;
var buyUser = '';
var type = '';

// Hàm tạo giao dịch thanh toán và lưu pending vào database payment
const createPayment = async (req, res) => {
  // Gán giá trị từ req.body vào các biến toàn cục
  itemId = req.body.id; // Lấy itemId từ req.body
  amount = req.body.amount; // Lấy amount từ req.body
  buyUser = req.body.buyUser; // Lấy userId từ req.body

  // Kiểm tra xem các giá trị đã được truyền vào hay chưa
  if (!itemId || !amount || !buyUser) {
    return res.status(400).json({
      message: 'Thiếu thông tin cần thiết để tạo giao dịch'
    });
  }

  const dateFormat = (await import('dateformat')).default;
  var ipAddr = req.headers['x-forwarded-for'] ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    req.connection.socket.remoteAddress;

  ipAddr = '127.0.0.1';
  // var config = require('config');
  var tmnCode = process.env.vnp_TmnCode;
  var secretKey = process.env.vnp_HashSecret;
  var vnpUrl = process.env.vnp_Url;
  var returnUrl = process.env.vnp_ReturnUrl;

  var date = new Date();

  var createDate = dateFormat(date, 'yyyymmddHHmmss');
  var orderId = dateFormat(date, 'HHmmss');
  const expireDate = moment(date).add(15, 'minutes').format('YYYYMMDDHHmmss'); // Tính thời gian hết hạn

  // var orderInfo = req.body.orderDescription ;
  // var orderType = req.body.orderType;
  var locale = 'vn';
  var currCode = 'VND';
  var vnp_Params = {};
  vnp_Params['vnp_Version'] = '2.1.0';
  vnp_Params['vnp_Command'] = 'pay';
  vnp_Params['vnp_TmnCode'] = tmnCode;
  // vnp_Params['vnp_Merchant'] = ''
  vnp_Params['vnp_Locale'] = locale;
  vnp_Params['vnp_CurrCode'] = currCode;
  vnp_Params['vnp_TxnRef'] = orderId;
  vnp_Params['vnp_OrderInfo'] = 'Dat coc phong id';
  vnp_Params['vnp_OrderType'] = 250000;
  vnp_Params['vnp_Amount'] = (amount * 1000000) * 100;
  vnp_Params['vnp_ReturnUrl'] = returnUrl;
  vnp_Params['vnp_IpAddr'] = ipAddr;
  vnp_Params['vnp_CreateDate'] = createDate;
  vnp_Params['vnp_ExpireDate'] = expireDate; // Thêm ExpireDate vào

  vnp_Params = sortObject(vnp_Params);

  var querystring = require('qs');
  var signData = querystring.stringify(vnp_Params, {
    encode: false
  });
  var crypto = require("crypto");
  var hmac = crypto.createHmac("sha512", secretKey);
  var signed = hmac.update(Buffer.from(signData, 'utf-8')).digest("hex");
  vnp_Params['vnp_SecureHash'] = signed;
  vnpUrl += '?' + querystring.stringify(vnp_Params, {
    encode: false
  });

  // Khởi tạo loại bài viết (type) mà chúng ta chưa biết

  // Tìm itemId trong các collection
  // Kiểm tra Room
  item = await Room.findById(itemId);
  if (item) {
    type = 'Room';
  }

  // Nếu không tìm thấy, kiểm tra House
  if (!item) {
    item = await House.findById(itemId);
    if (item) {
      type = 'House';
    }
  }

  // Nếu không tìm thấy, kiểm tra Apartment
  if (!item) {
    item = await Apartment.findById(itemId);
    if (item) {
      type = 'Apartment';
    }
  }

  // Nếu không tìm thấy, kiểm tra FindRoommate
  if (!item) {
    item = await FindRoommate.findById(itemId);
    if (item) {
      type = 'FindRoommate';
    }
  }

  // Nếu không tìm thấy itemId trong bất kỳ collection nào
  if (!item) {
    return res.status(404).json({
      message: 'Bài viết không tìm thấy'
    });
  }

  res.set("Content-Type", "text/html");
  res.send(JSON.stringify(vnpUrl));
};

function sortObject(obj) {
  let sorted = {};
  let str = [];
  let key;
  for (key in obj) {
    if (obj.hasOwnProperty(key)) {
      str.push(encodeURIComponent(key));
    }
  }
  str.sort();
  for (key = 0; key < str.length; key++) {
    sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, "+");
  }
  return sorted;
}

// Hàm tạo hash để bảo mật thông tin gửi đến VNPAY
const generateHash = (params, secretKey) => {
  const query = Object.keys(params)
    .sort()
    .map(key => `${key}=${params[key]}`)
    .join('&');

  const hash = require('crypto')
    .createHmac('sha256', secretKey)
    .update(query)
    .digest('hex');

  return hash;
};

const vnpayReturn = async (req, res) => {
  const {
    vnp_ResponseCode,
    vnp_TxnRef,
    vnp_SecureHash
  } = req.query;

  // Kiểm tra chữ ký (secure hash) để đảm bảo tính xác thực
  // const isValid = verifyVnpaySignature(req.query, vnp_SecureHash);

  // if (!isValid) {
  //   return res.status(400).json({ message: 'Thông tin không hợp lệ' });
  // }

  // Xử lý kết quả thanh toán
  if (vnp_ResponseCode === '00') {
      // Tạo đối tượng thanh toán mới
  const payment = new Payment({
    buyUser: buyUser,
    amount: amount,
    type: type, // Lưu loại bài viết vào đây
    itemId: itemId, // Lưu id bài viết vào đây
    adminShare: (amount * 15 / 100),
    sellerShare: (amount * 85 / 100),
    status: 'success',
    txnRef: vnp_TxnRef,
    transactionDate: new Date(),
  });

  await payment.save(); // Lưu thông tin thanh toán vào database

  // Sau khi lưu thanh toán thành công, cập nhật trạng thái của bài viết
  let updateData = { status: 'sold' };

  // Cập nhật bài viết theo loại và itemId
  if (type === 'room') {
    Room.status = 'sold'
    await Room.save();  // Cập nhật phòng
  } else if (type === 'house') {
    House.status = 'sold'
    await House.save();  // Cập nhật nhà
  } else if (type === 'apartment') {
    Apartment.status = 'sold'

    await Apartment.save();  // Cập nhật căn hộ
  } else if (type === 'findRoommate') {
    findRoommate.status = 'sold'

    await FindRoommate.save();  // Cập nhật tìm bạn phòng
  }
    // Thanh toán thành công
    // const payment = await Payment.findOne({ txnRef: vnp_TxnRef });
    // payment.status = 'success';  // Cập nhật trạng thái thanh toán
    // await payment.save();

    return res.redirect('/payment-success');
  } else {
    // Thanh toán thất bại


    return res.redirect('/payment-failed');
  }
};

// Hàm kiểm tra chữ ký (secure hash)
const verifyVnpaySignature = (params, secureHash) => {
  const vnp_HashSecret = process.env.vnp_HashSecret;
  const hash = generateHash(params, vnp_HashSecret);
  return hash === secureHash;
};


module.exports = {
  createPayment,
  vnpayReturn,
  verifyVnpaySignature
};