import {v2 as cloudinary} from "cloudinary";
import productModel from "../models/productModel.js";

// function for add product
const addProduct=async(req,res)=>{
    try{
        const {name,description,price,category,subcategory,sizes,bestseller}=req.body
        // we will get images
        // Check if images are availabe in req.files then it`ll store image in image variable
        const image1 = req.files.image1 && req.files.image1[0];
        const image2 = req.files.image2 && req.files.image2[0];
        const image3 = req.files.image3 && req.files.image3[0];
        const image4 = req.files.image4 && req.files.image4[0];

        const images=[image1,image2,image3,image4].filter((item)=>item!==undefined) // select only those images that are undefined

        let imagesUrl=await Promise.all(
            images.map(async(item)=>{
                let result=await cloudinary.uploader.upload(item.path,{resource_type:"image"})
                return result.secure_url
            })
        )

        const productData={
            name,
            description,
            category,
            price:Number(price),
            subcategory,
            bestseller:bestseller==="true"?true:false,
            sizes:JSON.parse(sizes),
            image:imagesUrl,
            date:Date.now(),
        }

        console.log(productData)

        const product=new productModel(productData);
        await product.save()

        res.json({success:true,message:"product added"})

    }catch(err){
        console.log(err)
        res.json({success:false,message:err.message});
    }
}
// function for list product
const listProducts=async(req,res)=>{
    try{
        const products=await productModel.find({})
        res.json({success:true,message:"products listed",
            products
        })
    }catch(err){
        console.log(err)
        res.json({success:false,message:err.message});
    }
}
// function for removing product
const removeProduct=async(req,res)=>{
    try{
        await productModel.findByIdAndDelete(req.body.id)
        res.json({success:true,message:"product removed"})
    }catch(error){
        console.log(err)
        res.json({success:false,message:err.message});
    }
}
// function for single product info
const singleProduct=async(req,res)=>{
    try{
        const {productId}=req.body
        const product=await productModel.findById(productId)
        res.json({success:true,message:"product info",product})
    }
    catch(err){
        console.log(err)
        res.json({success:false,message:err.message});
    }
}

export {addProduct,listProducts,removeProduct,singleProduct}