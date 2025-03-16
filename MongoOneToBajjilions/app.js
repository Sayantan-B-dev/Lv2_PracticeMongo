const mongoose=require('mongoose')
const {Schema}=mongoose

mongoose.connect('mongodb://127.0.0.1:27017/OneToMany');
mongoose.connection.on('error',console.error.bind(console, 'connection error:'));
mongoose.connection.once('open', () => { console.log('Database Connected'); });


const userSchema=new Schema(
    {
        username:String,
        age:Number
    }
)
const tweetSchema=new Schema(
    {
        text:String,
        likes:Number,
        user:{type:Schema.Types.ObjectId,ref:'User'}
    }
)

const User=mongoose.model('User',userSchema)
const Tweet=mongoose.model('Tweet',tweetSchema)

// const makeTweets=async()=>{
//     const u =await User({username:'AstroXVII'})
//     const tweet2=new Tweet({text:'this game good',likes:3})
//     tweet2.user=u
//     tweet2.save()
// }
// makeTweets()

const findTweet=async()=>{
    const t=await Tweet.find({}).populate('user','username')
    console.log(t)
}
findTweet()