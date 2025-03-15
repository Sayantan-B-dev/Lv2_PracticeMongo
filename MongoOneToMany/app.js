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

const Product=mongoose.model('product',productSchema)
const Farm=mongoose.model('farm',farmSchema)

Product.insertMany([
    {name:'mango',price:2.99,season:'summer'},
    {name:'jackfruit',price:9.99,season:'winter'},
    {name:'jolpai',price:1.99,season:'summer'},
])

const makeFarm=async ()=>{
    const farm=new Farm({name:'afk farms',city:'maldah'})
    const mango=await Product.findOne({name:"mango"})
    farm.products.push(mango)
    await farm.save()
    console.log(Farm)
}
makeFarm()
// const addFarm=async ()=>{
//     const farm=new Farm({name:'noob farms',city:'bombay'})
//     const mango=await Product.findOne({name:"lol"})
//     farm.products.push(mango)
//     await farm.save()
//     console.log(Farm)
// }
// addFarm()


