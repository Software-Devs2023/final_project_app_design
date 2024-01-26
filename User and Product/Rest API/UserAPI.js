const UserDB=require('../DB Data/Users')
const express=require('express')
const router=express.Router()
router.route('/')
    .get(async(req,res)=>{
        const users=await UserDB.find()
        if(!users) return res.sendStatus(204).json({"message":"No Product Found."})
        res.json({users})
    })
    .delete(async(req,res)=>{
        if(!req?.body?.id) return res.status(400).json({"message":"ID is required !"})
        try{
            const user=await UserDB.findOne({_id:req.body.id}).exec()
            if(!user) return res.status(204).json({"message":"No User matches this ID"})

            const result=await user.deleteOne({_id:req.body.id})
            res.json(result)
        }
        catch(err){res.status(500).json({"message":"No User matches this ID" })}
    })

router.route('/:value')
    .get(async(req,res)=>{
        const regex=new RegExp(`^${req.params.value}`, 'gi')
        const users=await UserDB.find({username:{$regex:regex}})
        if(!users) return res.sendStatus(204).json({"message":"No User Found."})
        res.json({users})
    })

module.exports=router