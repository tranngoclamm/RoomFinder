const mongoose = require('mongoose');
const Payment = require('../models/paymentModel');

// API lấy danh sách thanh toán của người dùng
const getHistory = async (req, res) => {
    try {
        const { userId } = req.params; // Lấy ID người dùng từ URL
        const { 
            search = '',    // từ khóa tìm kiếm (mặc định rỗng)
            page = 1,       // trang hiện tại (mặc định trang đầu tiên)
            pageSize = 10,  // số lượng item mỗi trang (mặc định 10)
        } = req.query;
        
        // Xây dựng query lọc theo userId và từ khoá tìm kiếm
        const query = {
            $or: [
                { buyUser: new mongoose.Types.ObjectId(userId) }, // Lọc theo buyUser._id
                { itemId: { $exists: true } } // Điều kiện tồn tại itemId để populate
            ],
            $or: [
                { txnRef: { $regex: search, $options: 'i' } },   // Tìm kiếm theo mã giao dịch (txnRef)
                { status: { $regex: search, $options: 'i' } },   // Tìm kiếm theo trạng thái
            ]
        };

        // Tổng số bản ghi phù hợp với query
        const totalRecords = await Payment.countDocuments(query); 
        
        // Lấy danh sách payments thỏa mãn điều kiện
        const payments = await Payment
            .find(query)
            .populate({
                path: 'buyUser',  
                select: '-password -favorites', 
            })
            .populate({
                path: 'itemId',
                populate: [
                    { path: 'province', select: 'name' },   // Tham chiếu và lấy tên của province
                    { path: 'district', select: 'name' },   // Tham chiếu và lấy tên của district
                    { path: 'ward', select: 'name' }        // Tham chiếu và lấy tên của ward
                ]
            })
            .sort({ transactionDate: -1 }) // Sắp xếp giảm dần theo thời gian giao dịch
            .skip((page - 1) * pageSize) // Bỏ qua các item của trang trước
            .limit(parseInt(pageSize)); // Giới hạn số lượng item mỗi trang

        // Lọc ra các payments có `itemId` hợp lệ hoặc `buyUser` đúng yêu cầu
        const filteredPayments = payments.filter(payment => 
            payment.buyUser._id.equals(userId) || 
            (payment.itemId && payment.itemId.userId.equals(userId) && payment.itemId.status === 'sold')
        );
        console.log(filteredPayments)
        res.json({
            currentPage: parseInt(page),
            pageSize: parseInt(pageSize),
            totalRecords: filteredPayments.length,
            totalPages: Math.ceil(filteredPayments.length / pageSize),
            payments: filteredPayments,
        });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi server', error });
    }
};

module.exports = {
    getHistory,
};
