const Joi = require('joi');

const commentSchema = Joi.object({
    name:Joi.string().min(4).pattern(new RegExp('^[A-Za-z0-9]+$')).required(),
    email:Joi.string().email().required(),
    home_page:Joi.string().allow(null).pattern(new RegExp('(http(s)?:\\/\\/.)?(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{2,256}\\.[a-z]{2,6}\\b([-a-zA-Z0-9@:%_\\+.~#?&//=]*)')),
    url_file:Joi.string().allow(null),
    parentId:Joi.number().allow(null),
    text:Joi.string().required(),
    prevText:Joi.string().allow(null)
})


module.exports={commentSchema}