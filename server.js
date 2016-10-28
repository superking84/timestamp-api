var express = require("express")
var app = express()

var months = ['January','February','March','April','May','June',
              'July','August','September','October','November','December']
              
app.get('*', function(req, res){
    var dateString = req.url.slice(1).replace(/%20/g,' ')
    if (dateString.length === 0){
        var msg = "Enter a date into the address bar as such:\n\n"
        msg += "https://fcc-api-projects-superking84.c9users.io/October 20, 2016\n"
        msg += "https://fcc-api-projects-superking84.c9users.io/1476921600000"
        res.end(msg)
    }
    var output = {
        unix: null,
        natural: null
    }
    
    var date
    if (isNaN(dateString)){
        date = new Date(dateString)
        
        if (isNaN(Date.parse(date))){
            res.end(JSON.stringify(output))
        }
        
        output['unix'] = Date.parse(dateString) / 1000
    } else {
        date = new Date(parseInt(dateString) * 1000)
        
        output['unix'] = parseInt(dateString)
    }
    output['natural'] = `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`
    
    res.end(JSON.stringify(output))
})

app.listen(8080)