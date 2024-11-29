import mongoose from "mongoose";

//List of vaccine needed to give a baby.

 export const predefinedVaccinations = [
    { name: 'Hepatitis B (HepB) Dose 1', administered: false, recommendedAge: '0', _id: 1, reaction: 'Mild fever, soreness at injection site', cure: 'Rest, hydration, over-the-counter pain relievers', hospital:"Null" },
    { name: 'Hepatitis B (HepB) Dose 2', administered: false, recommendedAge: '30', _id: 2, reaction: 'Mild fever, soreness at injection site', cure: 'Rest, hydration, over-the-counter pain relievers', hospital:"Null" },
    { name: 'DTaP Dose 1', administered: false, recommendedAge: '30', _id: 3, reaction: 'Soreness, swelling, fever, fussiness', cure: 'Rest, hydration, over-the-counter pain relievers', hospital:"Null" },
    { name: 'Hib Dose 1', administered: false, recommendedAge: '30', _id: 4, reaction: 'Redness, warmth, swelling at injection site, fever', cure: 'Rest, hydration, over-the-counter pain relievers', hospital:"Null" },
    { name: 'IPV Dose 1', administered: false, recommendedAge: '30', _id: 5, reaction: 'Redness, soreness at injection site, fever', cure: 'Rest, hydration, over-the-counter pain relievers', hospital:"Null" },
    { name: 'PCV13 Dose 1', administered: false, recommendedAge: '30', _id: 6, reaction: 'Pain, redness, swelling at injection site, fever', cure: 'Rest, hydration, over-the-counter pain relievers', hospital:"Null" },
    { name: 'RV Dose 1', administered: false, recommendedAge: '30', _id: 7, reaction: 'Irritability, mild diarrhea, vomiting', cure: 'Rest, hydration', hospital:"Null" },
    { name: 'DTaP Dose 2', administered: false, recommendedAge: '120', _id: 8, reaction: 'Soreness, swelling, fever, fussiness', cure: 'Rest, hydration, over-the-counter pain relievers', hospital:"Null" },
    { name: 'Hib Dose 2', administered: false, recommendedAge: '120', _id: 9, reaction: 'Redness, warmth, swelling at injection site, fever', cure: 'Rest, hydration, over-the-counter pain relievers', hospital:"Null" },
    { name: 'IPV Dose 2', administered: false, recommendedAge: '120', _id: 10, reaction: 'Redness, soreness at injection site, fever', cure: 'Rest, hydration, over-the-counter pain relievers', hospital:"Null" },
    { name: 'PCV13 Dose 2', administered: false, recommendedAge: '120', _id: 11, reaction: 'Pain, redness, swelling at injection site, fever', cure: 'Rest, hydration, over-the-counter pain relievers', hospital:"Null" },
    { name: 'RV Dose 2', administered: false, recommendedAge: '120', _id: 12, reaction: 'Irritability, mild diarrhea, vomiting', cure: 'Rest, hydration', hospital:"Null" },
    { name: 'DTaP Dose 3', administered: false, recommendedAge: '180', _id: 13, reaction: 'Soreness, swelling, fever, fussiness', cure: 'Rest, hydration, over-the-counter pain relievers', hospital:"Null" },
    { name: 'Hib Dose 3', administered: false, recommendedAge: '180', _id: 14, reaction: 'Redness, warmth, swelling at injection site, fever', cure: 'Rest, hydration, over-the-counter pain relievers', hospital:"Null" },
    { name: 'IPV Dose 3', administered: false, recommendedAge: '180', _id: 15, reaction: 'Redness, soreness at injection site, fever', cure: 'Rest, hydration, over-the-counter pain relievers', hospital:"Null" },
    { name: 'PCV13 Dose 3', administered: false, recommendedAge: '180', _id: 16, reaction: 'Pain, redness, swelling at injection site, fever', cure: 'Rest, hydration, over-the-counter pain relievers', hospital:"Null" },
    { name: 'RV Dose 3', administered: false, recommendedAge: '180', _id: 17, reaction: 'Irritability, mild diarrhea, vomiting', cure: 'Rest, hydration', hospital:"Null" },
    { name: 'Hepatitis B (HepB) Dose 3', administered: false, recommendedAge: '180-540', _id: 18, reaction: 'Mild fever, soreness at injection site', cure: 'Rest, hydration, over-the-counter pain relievers', hospital:"Null" },
    { name: 'DTaP Dose 4', administered: false, recommendedAge: '365', _id: 19, reaction: 'Soreness, swelling, fever, fussiness', cure: 'Rest, hydration, over-the-counter pain relievers', hospital:"Null" },
    { name: 'Hib Dose 4', administered: false, recommendedAge: '365', _id: 20, reaction: 'Redness, warmth, swelling at injection site, fever', cure: 'Rest, hydration, over-the-counter pain relievers', hospital:"Null" },
    { name: 'IPV Dose 4', administered: false, recommendedAge: '365', _id: 21, reaction: 'Redness, soreness at injection site, fever', cure: 'Rest, hydration, over-the-counter pain relievers', hospital:"Null" },
    { name: 'PCV13 Dose 4', administered: false, recommendedAge: '365', _id: 22, reaction: 'Pain, redness, swelling at injection site, fever', cure: 'Rest, hydration, over-the-counter pain relievers', hospital:"Null" },
    { name: 'MMR Dose 1', administered: false, recommendedAge: '365', _id: 23, reaction: 'Fever, mild rash, swelling of glands in cheeks or neck', cure: 'Rest, hydration, over-the-counter pain relievers', hospital:"Null" },
    { name: 'Varicella Dose 1', administered: false, recommendedAge: '365', _id: 24, reaction: 'Soreness, fever, mild rash', cure: 'Rest, hydration, over-the-counter pain relievers', hospital:"Null" },
    { name: 'Hepatitis A (HepA) Dose 1', administered: false, recommendedAge: '365', _id: 25, reaction: 'Soreness, headache, loss of appetite', cure: 'Rest, hydration, over-the-counter pain relievers', hospital:"Null" },
    { name: 'Hepatitis A (HepA) Dose 2', administered: false, recommendedAge: '540', _id: 26, reaction: 'Soreness, headache, loss of appetite', cure: 'Rest, hydration, over-the-counter pain relievers', hospital:"Null" }
];

  //Defined Schema.

const users = mongoose.Schema({

    username:{
        type:String,
        required: true
    },
    email:{
        type:String,
        required: true
    },
    password:{
        type:String,
        required: true
    },
    child:[
        {
            childName:{
                type:String,
                required: true
            },
            dob:{
                type:String,
                required: true
            },
            vaccinations:{
                type: [],
                default:[]
            }
        }
    ]
},
{timestamp:true})

export const Users = mongoose.model('user',users);