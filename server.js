var express = require("express")
var app = express()

var months = ['January','February','March','April','May','June',
              'July','August','September','October','November','December']
              
app.get('*', function(req, res){
    var dateString = req.url.slice(1).replace(/%20/g,' ')
    if (dateString.length === 0){
        var msg = "Enter a date into the address bar as such:\n"
        msg += "https://fcc-api-projects-superking84.c9users.io/October 20, 2016\n"
        msg += "https://fcc-api-projects-superking84.c9users.io/1476921600000"
        res.end(msg)
    }
    var output = {
        unix: null,
        natural: null
    }
    
    var isValidDate
    if (isNaN(dateString)){
        var date = new Date(dateString)
        isValidDate = !isNaN(Date.parse(date))
        if (!isValidDate){
            res.end(JSON.stringify(output))
        }
        
        output['natural'] = `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`
        output['unix'] = Date.parse(dateString) / 1000
    } else {
        var date = new Date(parseInt(dateString) * 1000)
        
        output['unix'] = dateString
        output['natural'] = `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`
    }
    
    res.end(JSON.stringify(output))
})

app.listen(8080)