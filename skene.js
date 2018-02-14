const fs = require('fs');
const request = require('request');
const cheerio = require('cheerio');

  let SkeneUrl = 'http://www.juvenes.fi/tabid/2584/moduleid/7083/RSS.aspx';

  request(SkeneUrl, function(error, response, html){

    if(!error){
        let $ = cheerio.load(html);

        var Skenejson = { ruoka1 : "", ruoka2 : "", ruoka3 : "", ruoka4 : "", ruoka5 : "", ruoka6 : "", ruoka7: "", ruoka8: "", ruoka9: "", ruoka10: ""};


        // Varo vaaraa
        // Et todellakaan haluu lukee tätä koodia eteenpäin

        $('channel').each(function(i, element){
            let a = $(this);

            let loki = a.children().last().prev().prev().prev().text();


            let arr = loki.split("<li>");


            for (let i = 0; i < arr.length; i++) {

                arr[i] = arr[i].replace("<strong>", '');
                arr[i] = arr[i].replace("</strong>", '');
                arr[i] = arr[i].replace("<li>", '');
                arr[i] = arr[i].replace("</li>", '');
                arr[i] = arr[i].replace("&nbsp;", ' ');
            }

            arr[arr.length-1] = arr[arr.length-1] = arr[arr.length-1].replace(/ul>.*/, '');

            for (let k = 0; k < arr.length; k++) {
                arr[k] = arr[k].replace("<ul>", '');
                arr[k] = arr[k].replace("</ul>", '');
                arr[k] = arr[k].replace("</", '');
            }

            arr.splice(0, 1);
            
            arr = arr.filter(function(n){ return n != undefined }); 


            Skenejson.ruoka1 = arr[0];
            Skenejson.ruoka2 = arr[1];
            Skenejson.ruoka3 = arr[2];
            Skenejson.ruoka4 = arr[3];
            Skenejson.ruoka5 = arr[4];
            Skenejson.ruoka6 = arr[5];
            Skenejson.ruoka7 = arr[6];
            Skenejson.ruoka8 = arr[7];
            Skenejson.ruoka9 = arr[8];
            Skenejson.ruoka10 = arr[9];
            
        });


    }

    fs.writeFile('output.json', JSON.stringify(Skenejson, null, 4), function(err){

        console.log('File successfully written! - Check your project directory for the output.json file');
    
    })

  })