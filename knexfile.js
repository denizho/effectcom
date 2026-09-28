module.exports={
    development:{
        client:"sqlite3",
        connection:{filename:"./data/site.db"},
        useNullAsDefault:true,
        migrations:{directory:"./data/migrations"},
        seeds:{directory:"./data/seedsnpm "}
    }
}