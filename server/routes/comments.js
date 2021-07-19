const express = require('express');
const router = express.Router();
const { Comment } = require("../models/Comment");

const { auth } = require("../middleware/auth");

//=================================
//             Subscribe
//=================================


router.post("/saveComment", (req, res) => {

    const comment = new Comment(req.body)

    comment.save((err, comment) => {
        if (err) return res.json({ success: false, err })

        Comment.find({ '_id': comment._id })
            .populate('writer')
            .exec((err, result) => {
                if (err) return res.json({ success: false, err })
                return res.status(200).json({ success: true, result })
            })
    })

})

router.post("/getComments", (req, res) => {

    Comment.find({ "postId": req.body.postId })
        .populate('writer')
        .exec((err, comments) => {
            if (err) return res.status(400).send(err)
            res.status(200).json({ success: true, comments })
        })

});

router.delete("/delete", (req, res) => {
    console.log('comment_delete')
    console.log(req.body);
    let commentId = req.body.commentId
    console.log(commentId)
    Comment.findOneAndDelete({"_id": commentId}, (err, post) => {
        console.log(post)
        if (err) return res.status(400).send(err)
        return res.status(200).json({ success: true, post })
    })
})

module.exports = router;