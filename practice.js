var mongoose = require('mongoose');
module.exports = function(){
console.log('In Practice');    
mongoose.connect("mongodb://localhost:27017/shopbase");
var Schema = mongoose.Schema;
var personSchema = Schema({
    _id: Number,
    name: String,
    age: Number,
    stories: [{type: Schema.Types.ObjectId, ref: 'Story'}]
});
var storySchema = Schema({
    creator:{type: Number, ref: 'Person'},
    title: String,
    fans: [{type: Number, ref: 'Person'}] 
});

var Story = mongoose.model('Story',storySchema);
var Person = mongoose.model('Person',personSchema);
Story.remove({},function(err){
    
});
Person.remove({},function(err){
    
});    
var aaron = new Person({_id:0,name:'Aaron',age:25});
Person.create({_id:1,name:'Alex',age:23},function(err,p){
    if(err){
        //console.log("Error in Alex",err);
    }
});
aaron.save(function(err){
    if(err){
        console.log(err);
         console.log("Error in Aaron",err);
        return;
    }
    var story1 = new Story({title: 'Once upon a time',
                            creator: aaron._id
                           });
    story1.save(function(err){
        if(err){
            console.log(err);
            return;
        }
    });
});
Story.findOne({title:'Once upon a time'})
    .populate('creator')
    .exec(function(err,story){
        if(err){
            console.log(err);
            return;
        }
        if(story){
            console.log('The creator is %s ',story.creator.name);
        }
});
}