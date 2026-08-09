const userSchema = new mongoose.Schema(
    {
        username:{
            type:string,
            required: true,
            unique: true,
            trim: true,
            lowercase: true
        },
        password:{
            type: string,
            required: true,
            minlength: 6
        }
    },
    {timestamps:true},
);

userSchema.pre('save', async function (next) {
    const user = this;
    if (!user.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

userSchema.methods.comparePassword = async function (plain){
    return await bcrypt.compare(plain, this.password);
};

export default mongoose.model('User', userSchema);

user.comparePassword(loginPassword)