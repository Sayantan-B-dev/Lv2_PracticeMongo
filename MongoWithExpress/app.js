const mongoose=require("mongoose")
const {Schema}= mongoose

mongoose.connect('mongodb://127.0.0.1:27017/OneToMany');
mongoose.connection.on('error',console.error.bind(console, 'connection error:'));
mongoose.connection.once('open', () => { console.log('Database Connected'); });

const productSchema=new Schema(
    {
        name:String,
        prince:Number,
        season:{
            type:String,
            enum:['spring','winter','summer']
        }
         
    }
)
const farmSchema=new Schema({
    name:String,
    city:String,
    products:[
        {type: Schema.Types.ObjectId, ref: 'Product'}
    ]
})

const Product=mongoose.model('Product',productSchema)
const Farm=mongoose.model('Farm',farmSchema)