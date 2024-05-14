import XMLHttpRequest from "xhr2";

async function httpGetAsync(theUrl, callback, type)
{
    return new Promise((resolve, reject) => {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4) {
            if (xmlHttp.status == 200) {
                    var data = callback(xmlHttp.responseText, type);
                    resolve(data);
                } else {
                    reject(new Error('Request failed with status ' + xmlHttp.status));
                }
        }
    }
    xmlHttp.open("GET", theUrl, true);
    xmlHttp.send(null);
    });
    }
async function tenorCallback_categories(responsetext, type)
    {
        var response_objects = JSON.parse(responsetext);
        let bruh = [];
        console.log(response_objects);
        switch(type){
            case "tags":
                response_objects["tags"].forEach(element => {
                    bruh.push(element.searchterm);
                });
                break;
            case "results":
                bruh.push(response_objects["next"]);
                response_objects["results"].forEach(element => {
                    bruh.push([element.url,[element.tags]]);
                });
                break;
            case "autofill":
                break;
        }
        return bruh;
    }
export async function grab_data(type, search_string = null,limit = null,pos = null)
    {
        var apikey = "AIzaSyBuIS-XTCTQWJe1xSdwBop5hBvU2zxmbNQ";
        var search = "";
        switch(type){
            case "tags":
                search = "categories?"
                break;
            case "results":
                search = "search?q=";
                break;
            case "autofill":
                search = "autocomplete?q=";
                break;
        }
        var search_url = "https://tenor.googleapis.com/v2/"+ search + ((search_string != null) ? search_string : "") + "&key=" +apikey+((limit != null) ? "&limit="+limit : "")+((pos != null) ? "&pos="+pos : "");
        var nem = await httpGetAsync(search_url,tenorCallback_categories, type);
        return nem;
    }
    /*
export async function GetData(){
      var asd = await grab_data("tags");
      console.log(asd+"non");
      asd = await grab_data("results","dog",50,null);
      console.log(asd);
    }
GetData();*/