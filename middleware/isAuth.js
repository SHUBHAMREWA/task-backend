

//  This is isAuth middleware for check Current user through Token  

import jwt from "jsonwebtoken"  ;


const isAuth = async(req , res , next)=>{    

            // Check for token in Cookies OR Authorization Header
            let token = req.cookies.Logintoken;
            
            // If no cookie, check header
            if (!token && req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
                token = req.headers.authorization.split(' ')[1];
            }
      
            if(!token) return res.status(401).json({
                message : "No token Found please Login first",  
                success : false
            }) 


                 try{

                      const decode = jwt.verify(token , process.env.JWT_SECRET) ; 

                      req.userId = decode.userId  
                      next() ;
                 }
                 catch(error){
                      return res.status(500).json({
                         message : `is auth Error ${error}` , 
                         success : false
                      })
                 }




}


export default isAuth ;