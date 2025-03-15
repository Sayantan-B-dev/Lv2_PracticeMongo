const mongoose=require("mongoose")

mongoose.connect('mongodb://127.0.0.1:27017/OneToMany');
mongoose.connection.on('error',console.error.bind(console, 'connection error:'));
mongoose.connection.once('open', () => { console.log('Database Connected'); });

const userSchema=new mongoose.Schema({
    first: String,
    last:String,
    addresses:[
        {
            city:String,
            state:String,
            street:String,
            country:String
        }
    ]
})
const User=mongoose.model('User',userSchema)

const makeUser=async(id)=>{
    const user=await User.findById(id)
    user.addresses.push(
        {
            city:"asdgadsg",
            state:"westbengal",
            street:"college street",
            country:"india"
        }
    )
    const res=await user.save()
    console.log(res)
}
