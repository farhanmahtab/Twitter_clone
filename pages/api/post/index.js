import connectMongo from "@/Utils/db";
import Posts from "../../../models/Post";


// //get all post
// const getAllPost = async (req, res) => {
//   await connectMongo();
//   try {
//     const post = await Posts.find({});
//     res.status(200).json(post);
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ status: "Internal Error", message: error.message });
//   }
// }
// const postTweet = async (req, res) => {
//   const { postId, userId, username, text, img } = req.body;
//   await connectMongo();
//   if(req.method === "POST"){
//     try {
//         const post = await Post.create({ batchName, session, file });
//         res.status(200).json({
//           status: "ok",
//           message: "Alumni created successfully",
//           data: alumni,
//         });
//       } catch (error) {
//         res
//           .status(500)
//           .json({ status: "Internal Server Error", message: error.message });
//       }
//   }else {
//     res.status(404).json({ success: false, message: "API endpoint not found" });
  
// };
// module.exports =  getAllPost

//post a tweet
//post alumni
export default async function handler(req,res){
    await res.status(200).json({name:'post api route'})
}
