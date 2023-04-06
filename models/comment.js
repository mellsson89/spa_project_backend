const { DataTypes, literal } = require('sequelize');
const {db} = require('../config/db');
const moment = require('moment-timezone');
const {AvatarGenerator} = require('random-avatar-generator');
const generator = new AvatarGenerator();

const Comment = db.define('comment',

    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },


        name: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        email: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        home_page: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        url_file: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        text: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        prevText : {
            type:DataTypes.TEXT,
            allowNull:true
        },
        avatar: {
            type: DataTypes.TEXT,
            allowNull: false,
            defaultValue:function () {
                return generator.generateRandomAvatar()
            }
        },
        createdAt :{
            type: DataTypes.TEXT,
            allowNull: false,
            defaultValue: function () {
                return moment.utc().format('DD.MM.YYYY HH:mm');
            },

        }
    },
    // Опции
    {
        timestamps: false,
    }
)

Comment.isHierarchy();


// (async () => {
//     await db.sync({ alter: true});
// })();



module.exports = Comment;