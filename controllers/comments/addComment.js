const Comment = require('../../models/comment')

const addComment = async (req, res, next) => {

    try {
        const {parentId} = req.body;
        console.log(req.body)

        if(parentId) {
            const nestedComment = await Comment.create({...req.body})
            return res.status(201).json({data: nestedComment});
        }

        const newComment = await Comment.create({...req.body})
        console.log(newComment)
        res.status(201).json({data: newComment});
    } catch (error) {
        next(error)
    }
}

module.exports=addComment;