const Distributor=require('../distributor/api/schema');

//create a new distributor

exports.distributor_create=function(req,res){
    if(!req.body.userID || !req.body.gst_num ){
        return res.status(400).send({
            success:false,
            message:"Please enter all the fields"
        });
        
    }
    // create a  distributor
    let distributor=new Distributor({
        userID:req.body.userID,
        gst_num:req.body.gst_num,   
    });
     //save distributor to database
     distributor.save()
     .then(
         data=>{
             res.send({
                 success:true,
                 message:"Distributor added successfully",
                 data:data

             });
         }).catch(err=>{
             res.status(500).send({
                 success:false,
                 message:err.message || "Some error occurred while creating the Distributor",
                 /* data:data */
             });
         });
};
     
  
    
        
            

       
// retrieve and return all dkitributors from the database

exports.all_distributors=(req,res)=>{
    Distributor.find()
    let userID=Distributor.findById(req.body.userID) //not sure if this is correct
    .then(data=>{
        var message="";
        if(userID===undefined || userID.length===0)
        message="No distributors found";
        else message="Distributors saved successfully";

        res.send({
            success:true,
            message:message,

        });
    }).catch(err=>{
        res.status(500).send({
            success:false,
            /* message:"Error occured", */
            message:err.message || "Some error occurred while retrieving distributors"
        });
    });
}
        //find a single distributor by Id

      exports.distributor_update=(req,res)=>{
        Distributor.findByIdAndUpdate(req.body.userID)
            .then(data=>{
                if(!data){
                    return res.status(404).send({
                        success:false,
                        message:"Distributor not found"+req.body.userID
            });
        }
        res.send({
            success:true,
            message:"Distributor updated successfully",
            data:data
        });
    }) .catch(err=>{
        if(err.kind==='userID'){
            return res.status(404).send({
                success:false,
                message:"Distributor not found with id"+req.body.userID
    });
}
   return res.status(500).send({
        success:false,
        message:"Error updating Distributor with id "+req.body.userID
    });
});
 };
//update a distributor by id
exports.distributor_update=(req,res)=>{
    if(!req.body.userID || !req.body.gst_num ){
        return res.status(400).send({
            success:false,
            message:"Please enter all the fields"
        });
    }
    //find and update distributor with the request body
    Distributor.findByIdAndUpdate(req.body.userID)
    .then(data=>{
        if(!data){
            return res.status(404).send({
                success:false,
                message:"Distributor not found"+req.body.userID
    });
}    res.send({
        success:true,
        message:"Distributor updated successfully",
        data:data
})
        }).catch(err=>{
            if(err.kind==='userID'){
                return res.status(404).send({
                    success:false,
                    message:"Distributor not found with id"+req.body.userID
        });
    }
   return res.status(500).send({
        success:false,
        message:"Error updating Distributor with id "+req.body.userID   
        })
    }
    );
}

    //delete a distributor by id
    exports.distributor_delete=(req,res)=>{
        Distributor.findByIdAndRemove(req.body.userID)
        .then(data=>{
            if(!data){
                return res.status(404).send({
                    success:false,
                    message:"Distributor not found"+req.body.userID
    });
}  res.send({
        success:true,
        message:"Distributor deleted successfully",
        data:data
})
        }).catch(err=>{
            if(err.kind==='userID'){
                return res.status(404).send({
                    success:false,
                    message:"Distributor not found with id"+req.body.userID
        });
    }
   return res.status(500).send({
        success:false,  
        message:"Error deleting Distributor with id "+req.body.userID

   });
        });
    }


      
      
        