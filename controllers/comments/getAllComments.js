const Comment = require('../../models/comment')
const getAllComments = async (req, res, next) => {
    try {
        const {page = 1, limit = 25, key = 'createdAt', sort='DESC'} = req.query;


        const offset = (page - 1) * limit;


        const allComments = await Comment.findAll({
            where: {
                parentId: null
            },
            }
        );


        const comments = await Comment.findAll({

            where: {
                parentId: null
            },
            order: [
                [key, sort]
            ],
            limit:Number(limit),
            offset,
            include: [{ model: Comment, as: 'descendents', hierarchy: true }]

        })




        const nbComments = allComments.length;

        const nbPages = nbComments > limit ? Math.ceil(nbComments / limit) : 1;
        //
        res.status(200).json({comments, page, nbComments, nbPages});
    } catch (error) {
        next(error)
    }
}

module.exports=getAllComments;