const express=require('express')
const router=express.Router()
const ROLES_LIST=require('../Config/Roles_List')
const verifyRoles=require('../Config/VerifyRoles')
const ProductsDB=require('../DB Data/Products')
const path=require('path')
const multer=require('multer')
const upload = multer({dest :path.join(__dirname,"ProductImage")}).single('image') 
router.route('/')
    .get(async(req,res)=>{
        const products=await ProductsDB.find()
        if(!products) return res.sendStatus(204).json({"message":"No Product Found."})
        res.json({products})
    })
    .post(upload,async(req,res)=>{
        req.body.content=JSON.parse(req.body.content)
        console.log(req.body.content)
        if(!req?.body.content?.name||!req?.body.content?.price||!req?.body.content?.category||!req?.body.content?.quantity) {
            return res.sendStatus(400).json({'message':'Name,Category and Price are required !'})
        }
        try{
            const map=new Map()
            for(let i=0;i<=req.body.content.category.length-1;i++)
            {
                map.set(req.body.content.category[i],1);
            }
            console.log(map)
            console.log(req.file.filename)
            const result=await ProductsDB.create({
                name:req.body.content.name,
                image_path:req.file.filename,
                category:map,
                quantity:req.body.content.quantity,
                price:req.body.content.price
            })
            res.status(201).json(result)
        }
        catch(err){res.status(500).json({'message':'Internal Server Error'})}
    })
    .put(async(req,res)=>{
        if(!req?.body?.id) return res.status(400).json({"message":"ID is required !"})
        try{
            const product=await ProductsDB.findOne({_id:req.body.id}).exec()
            if(!product) return res.status(204).json({"message":"No Product matches this ID"})

            if(req.body.name) product.name=req.body.name
            if(req.body.quantity) product.quantity=req.body.quantity
            if(req.body.price) product.price=req.body.price

            const result=await product.save()
            res.json(result)
        }
        catch(err){res.status(500).json({"message":"No Product matches this ID" })}
    })
    .delete(async(req,res)=>{
        if(!req?.body?.id) return res.status(400).json({"message":"ID is required !"})
        try{
            const product=await ProductsDB.findOne({_id:req.body.id}).exec()
            if(!product) return res.status(204).json({"message":"No Product matches this ID"})

            const result=await product.deleteOne({_id:req.body.id})
            res.json(result)
        }
        catch(err){res.status(500).json({"message":"No Product matches this ID" })}
    })

router.route('/FindID/:id')
    .get(async(req,res)=>{

        if(!req?.params?.id) return res.status(400).json({"message":"No ID matches !"})
        try{
            const product=await ProductsDB.findOne({_id:req.params.id}).exec()
            if(!product) return res.status(204).json({"message":"No Product matches this ID"})

            res.json(product)
        }
        catch(err){res.status(500).json({"message":"No Product matches this ID" })}
    })

router.route('/search/:value')
    .get(async(req,res)=>{
        const regex=new RegExp(`^${req.params.value}`, 'gi')
        const products=await ProductsDB.find({name:{$regex:regex}})
        if(!products) return res.sendStatus(204).json({"message":"No Product Found."})
        res.json({products})
    })
router.route('/category')
    .get(async(req,res)=>{
        if(!req?.body?.category) return res.status(400).json({"message":"Category is required !"})
        const products=await ProductsDB.find({[`category.${req.body.category}`]:1})
        if(!products) return res.sendStatus(204).json({"message":"No Product Found."})
        res.json({products})
    })
module.exports=router