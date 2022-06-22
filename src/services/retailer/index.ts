/* const { request } = require('../..'); */
const Retailer=require('./api/schema/index');


//create a new retailer


exports.retailer_create=function(req,res){
    if(!req.body.userID || !req.body.gst_num || !req.body.address){
        return res.status(400).send({
            success:false,
            message:"Please enter all the fields"
        });
    }
    
   // create a  retailer 
    let retailer=new Retailer({
        userID:req.body.userID,
        gst_num:req.body.gst_num,
        address:req.body.address,
    }
    );

   
//save query to database
          retailer.save()
    .then(data=>{
        res.send({
            success:true,
            message:"Retailer added successfully",
            data:data
        });
    }
    ) .catch(err=>{

        res.status(500).send({
            success:false,
            Message:"Error occured",
            message:err.Message || "Some error occurred while creating the Retailer"
        });
    });
    };

// retrieve all retailers

exports.all_retailers=(req,res) =>{
    Retailer.find()
    let userID=Retailer.findById(req.body.userID)
    .then(data=>{
        var message=""
        if(userID===undefined || userID.length== 0) message="No retailers found"
        else message="Retailers  retrieved successfully"
        res.send({
            success:true,
            message:message,
            data:data
        });
    }).catch(err=>{
        res.status(500).send({
            success:false,
            Message:"Error occured",
            message:err.Message || "Some error occurred while retrieving retailers"
        });
    })
};

//find a retailer by id
exports.retailer_details= (req,res)=>{
    Retailer.findById(req.params.userID)
    .then(data=>{
        if(!data){
            return res.status(404).send({
                success:false,
                Message:"Retailer not found with id "+req.params.userID
    })
}
        res.send({
            success:true,
            message:"Retailer not found with id "+req.params.userID,
            data:data
        })
    }).catch(err=>{
        if (err.kind='userID'){
            return res.status(404).send({
                success:false,
                message:"Retailer not found with id "+req.params.userID
    });
}
        return res.status(500).send({
            success:false,
            message:"Error retrieving retailer with id "+req.params.userID
        });
    })
};

//update a retailer by id


exports.retailer_update= (req,res)=>{
    //validate request
    if(!req.body.userID || !req.body.gst_num || !req.body.address){
        return res.status(400).send({
            success:false,
            message:"Please enter all the fields"
        });
    }

    Retailer.findByIdAndUpdate(req.params.userID,{
        $set:req.body
    }
    ,{new:true})
    .then(data=>{
        if(!data){
            return res.status(404).send({
                success:false,
                message:"Retailer not found with id "+req.params.userID
    })
}
res.send({
    success:true,
    data:data
});
    }).catch(err=>{
        if (err.kind='userID'){
            return res.status(404).send({
                success:false,
                message:"Retailer not found with id "+req.params.userID
    });
}
        return res.status(500).send({
            success:false,
            message:"Error updating retailer with id "+req.params.userID
        });
    });
        };

        //delete a retailer with the specific id

exports.retailer_delete=(req,res)=>{
    Retailer.findByIdAndRemove(req.params.id)
    .then(data=>{
        if(!data){
            return res.status(404).send({
                success:false,
                message:"Retailer not found with id "+req.params.id
            })
        }
        res.send({
            success:true,
            message:"Retailer deleted successfully"
        });
    }).catch(err=>{
        if(err.kind==='userID'||err.name==='NotFound'){
            return res.status(404).send({
                success:false,
                message:"Retailer not found with id "+req.params.id
            })
        }
        return res.status(500).send({
            success:false,
            message:"Could not delete retailer with id "+req.params.id
        });
    })
};