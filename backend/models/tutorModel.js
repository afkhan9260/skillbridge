import mongoose from "mongoose";

const tutorSchema = new mongoose.Schema({
    name: {
        type: String, required: true},
    email: {
        type: String, required: true, unique: true},
    password: {
        type: String, required: true},
    image: {
        type: String, required: false},
    specialty: {
        type: String, required: true},
    about: {
        type: String, default: true},
    available: {
        type: Boolean, required: true},
    feePerHour: {
        type: Number, required: true},
    address:{
        type: String, required: true},
    date: {
        type: Number, required: true},
    slots_booked: {
        type: Object, default: {}},
},{minimize:false});

const tutorModel = mongoose.models.tutor || mongoose.model('tutor', tutorSchema);

export default tutorModel;