import mongoose from "mongoose";
import {ObjectId} from "mongodb";
import {USERS} from "../../config/common.mjs";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Họ tên không được để trống'],
        maxLength: [50, 'Họ tên không được lớn hơn {MAXLENGTH} ký tự'],
    },
    email: {
        type: String,
        required: [true, 'Email không được để trống'],
        unique: [true, 'Email đã tồn tại'],
        maxLength: [50, 'Email không được lớn hơn {MAXLENGTH} ký tự'],
    },
    phone: {
        type: String,
        required: [true, 'Số điện thoại không được để trống'],
        unique: [true, 'Số điện thoại đã tồn tại'],
        maxLength: [11, 'Số điện thoại không được lớn hơn {MAXLENGTH} ký tự'],
        minLength: [10, 'Số điện thoại không được ít hơn {MINLENGTH} ký tự'],
    },
    avatar: {
        type: String,
        required: [true, 'Ảnh đại diện không được để trống'],
        unique: [true, 'Ảnh đại diện đã tồn tại'],
    },
    password: {
        type: String,
        required: [true, 'Mật khẩu không được để trống'],
        maxLength: [255, 'Mật khẩu không được lớn hơn {MAXLENGTH} ký tự'],
        minLength: [6, 'Mật khẩu không được ít hơn {MINLENGTH} ký tự'],
    },
    level: {
        type: Number,
        required: true,
        enum: {
            values: Object.values(USERS.level),
            message: 'Giá trị đã chọn trong trường phân quyền không hợp lệ.'
        },
        default: USERS.level.user
    },
    is_confirm_account: {
        type: Number,
        required: true,
        enum: {
            values: Object.values(USERS.is_confirm_account),
        },
        default: USERS.is_confirm_account.false
    },
    created_by: {
        type: ObjectId,
        required: false
    },
    updated_by: {
        type: ObjectId,
        required: false
    },
    created_at: {
        type: Date,
        required: false
    },
    updated_at: {
        type: Date,
        required: false
    },
    deleted_at: {
        type: Date,
        required: false
    },
})
export default mongoose.model('users', userSchema);